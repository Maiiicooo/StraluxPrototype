<?php
// Gebruik PHPMailer om de e-mail te versturen
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings – pas deze aan naar jouw SMTP-gegevens
    $mail->isSMTP();
    $mail->Host       = 'outlook.office365.com';        // Jouw SMTP-server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@stralux.eu'; // Jouw SMTP-gebruikersnaam
    $mail->Password   = '';             // Jouw SMTP-wachtwoord
    $mail->SMTPSecure = 'tls';                       // Beveiliging (tls of ssl)
    $mail->Port       = 993;                         // SMTP-poort

    // Afzender en ontvanger
    $mail->setFrom('your_email@example.com', 'Stralux Offerte');
    $mail->addAddress('info@stralux.eu');     // Ontvanger

    // Bijlagen toevoegen als er foto's zijn geüpload
    if (isset($_FILES['foto']) && $_FILES['foto']['error'][0] != UPLOAD_ERR_NO_FILE) {
        foreach ($_FILES['foto']['tmp_name'] as $key => $tmpName) {
            $mail->addAttachment($tmpName, $_FILES['foto']['name'][$key]);
        }
    }

    // E-mail content
    $mail->isHTML(true);
    $subject = 'Offerte aanvraag van ' . $_POST['voornaam'] . ' ' . $_POST['achternaam'];
    $mail->Subject = $subject;

    $body  = '<h2>Offerte aanvraag</h2>';
    $body .= '<p><strong>Voornaam:</strong> ' . htmlspecialchars($_POST['voornaam']) . '</p>';
    $body .= '<p><strong>Achternaam:</strong> ' . htmlspecialchars($_POST['achternaam']) . '</p>';
    $body .= '<p><strong>Telefoonnummer:</strong> ' . htmlspecialchars($_POST['telefoon']) . '</p>';
    $body .= '<p><strong>E-mailadres:</strong> ' . htmlspecialchars($_POST['email']) . '</p>';
    $body .= '<p><strong>Adres:</strong> ' . htmlspecialchars($_POST['adres']) . ', ' . htmlspecialchars($_POST['postcode']) . ' ' . htmlspecialchars($_POST['plaats']) . '</p>';
    if(isset($_POST['opties']) && is_array($_POST['opties'])) {
      $body .= '<p><strong>Behandeling:</strong> ' . implode(', ', array_map('htmlspecialchars', $_POST['opties'])) . '</p>';
    }
    $body .= '<p><strong>Boodschap:</strong><br>' . nl2br(htmlspecialchars($_POST['boodschap'])) . '</p>';

    $mail->Body = $body;

    $mail->send();
    echo 'Uw aanvraag is succesvol verzonden.';
} catch (Exception $e) {
    echo "Uw aanvraag kon niet worden verzonden. Mailer Error: {$mail->ErrorInfo}";
}
?>
