<?php

// CORS. Bewusst eine Allowlist statt "*": das Formular liegt auf derselben
// Domain und braucht CORS gar nicht. "*" laedt nur dazu ein, das Postfach von
// fremden Seiten aus vollzuschreiben.
$allowedOrigins = [
    "https://n-boussaada.de",
    "https://www.n-boussaada.de",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
}
header("Vary: Origin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// ------------------------------------------------------------
// Spam-Schutz
// ------------------------------------------------------------

// Mindestzeit zwischen Formularaufbau und Absenden. Menschen tippen Name,
// E-Mail und eine Nachricht mit >= 10 Zeichen nicht in unter drei Sekunden.
define("MIN_FILL_MS", 3000);

// Pro IP und Stunde. Grosszuegig genug fuer einen Tippfehler und einen
// zweiten Anlauf, eng genug gegen Fluten.
define("MAX_PER_HOUR", 5);

/**
 * Zaehlt die Absendeversuche einer IP im laufenden Zeitfenster.
 *
 * Die IP wird nur gehasht abgelegt, nie im Klartext: fuer die Zaehlung
 * reicht ein wiedererkennbarer Schluessel, und so liegt auf der Platte
 * kein personenbezogenes Datum herum.
 */
function rateLimitExceeded($ip)
{
    $window = 3600;
    $now = time();
    $file = sys_get_temp_dir() . "/contact-rate-" . hash("sha256", $ip) . ".json";

    $hits = [];
    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            foreach ($decoded as $timestamp) {
                if (is_int($timestamp) && $timestamp > $now - $window) {
                    $hits[] = $timestamp;
                }
            }
        }
    }

    if (count($hits) >= MAX_PER_HOUR) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

// ------------------------------------------------------------
// WICHTIG:
// Eigene Adresse unten bei $siteEmail setzen!
// ------------------------------------------------------------

// >>> DEINE EMAIL HIER EINTRAGEN <<<
// Muss auf der eigenen Domain liegen, damit SPF beim Empfaenger passt.
// Die Weiterleitung dieser Adresse sorgt dafuer, dass die Nachricht
// trotzdem im gewohnten Postfach landet.
$siteEmail = "kontakt@n-boussaada.de";

// Empfaenger. Bewusst getrennt vom Absender: der Absender muss auf der
// eigenen Domain liegen (SPF), der Empfaenger dagegen direkt das echte
// Postfach sein. Ueber die Weiterleitung zuzustellen waere ein Hop mehr,
// der die Mail verlieren kann.
$recipientEmail = "n.boussaada92@gmail.com";

switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        // Preflight request
        http_response_code(200);
        exit;

    case 'POST':
        // Read raw JSON payload
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        // Saubere JSON-Fehlerprüfung
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
            exit;
        }

        $email = trim($params->email ?? '');
        $name = trim($params->name ?? '');
        $userMessage = trim($params->message ?? '');

        // Honeypot. Absichtlich mit success=true beantwortet: eine ehrliche
        // Fehlermeldung wuerde dem Bot verraten, welches Feld ihn verraten hat.
        if (trim($params->contact_reference ?? '') !== '') {
            echo json_encode(['success' => true]);
            exit;
        }

        // Zu schnell abgeschickt. Hier bewusst ein sichtbarer Fehler statt
        // eines stillen Schluckens: trifft es doch mal einen echten Menschen,
        // sieht er es und der zweite Versuch geht durch.
        $elapsedMs = $params->elapsedMs ?? 0;
        if (!is_numeric($elapsedMs) || $elapsedMs < MIN_FILL_MS) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Submitted too quickly']);
            exit;
        }

        // REMOTE_ADDR statt X-Forwarded-For: letzteres kann der Absender frei
        // setzen und damit das Limit pro Anfrage umgehen.
        if (rateLimitExceeded($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
            http_response_code(429);
            echo json_encode(['success' => false, 'error' => 'Too many requests']);
            exit;
        }

        // Mirrors the client side rules, so a direct POST cannot bypass them.
        $emailValid = filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($email) <= 254;
        $nameValid = preg_match('/^\p{L}[\p{L}\p{M}\s\'’.-]{1,59}$/u', $name) === 1
            && preg_match_all('/\p{L}/u', $name) >= 2;
        $messageValid = preg_match('/^.{10,}$/su', $userMessage) === 1;

        if (!$emailValid || !$nameValid || !$messageValid) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid input data']);
            exit;
        }

        // Sanitize content
        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        // Empfängeradresse (nutzt die oben definierte Mail)
        $recipient = $recipientEmail;
        $subject = 'Website Contact Form';

        $mailBody = "
            <strong>Name:</strong> {$safeName}<br>
            <strong>Email:</strong> {$safeEmail}<br><br>
            <strong>Message:</strong><br>
            {$safeMessage}
        ";

        // Mail headers
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: Website Kontakt <' . $siteEmail . '>'; 
        $headers[] = 'Reply-To: ' . $email;
        $headers[] = 'Return-Path: ' . $siteEmail; 

        // Send mail
        $success = mail(
            $recipient,
            $subject,
            $mailBody,
            implode("\r\n", $headers),
            '-f ' . $siteEmail 
        );

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Mail delivery failed']);
        }

        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}