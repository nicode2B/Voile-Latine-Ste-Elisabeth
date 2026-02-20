<?php
// 1. Configuration de la connexion
$host = 'localhost';
$dbname = 'voile_latine_ste_elisabeth';
$user = 'root';
$pass = '';

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO("mysql:host=$host;port=3307;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // 2. Récupération et nettoyage des données
        $nom = htmlspecialchars($_POST['nom']);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $sujet = htmlspecialchars($_POST['sujet']);
        $message = htmlspecialchars($_POST['message']);

        // 3. Préparation de la requête SQL
        $sql = "INSERT INTO messages (nom, email, sujet, message) VALUES (:nom, :email, :sujet, :message)";
        $stmt = $pdo->prepare($sql);

        // 4. Exécution de la requête
        $stmt->execute([
            ':nom' => $nom,
            ':email' => $email,
            ':sujet' => $sujet,
            ':message' => $message
        ]);

        echo "Votre message a bien été envoyé !";
    }
} catch (PDOException $e) {
    http_response_code(500);
    die("Erreur de connexion : " . $e->getMessage());
}
?>