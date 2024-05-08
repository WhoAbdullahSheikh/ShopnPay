<?php
session_start();

if (!isset($_SESSION['email'])) {
    header('Location: loginscreen.php');
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Shopnpay";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id']) && isset($_GET['status'])) {
    $productId = $_GET['id'];
    $newStatus = $_GET['status'];

    if (!in_array($newStatus, ['Approved', 'Rejected'])) {
        die('Invalid status provided.');
    }

    $stmt = $conn->prepare("UPDATE products SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $newStatus, $productId);
    $success = $stmt->execute();

    if ($success) {
        $_SESSION['message'] = "Product status updated successfully!";
    } else {
        $_SESSION['message'] = "Error updating product status.";
    }

    header('Location: adminprofile.php');
    exit();
}

else {
    header('Location: error_page.php');
    exit();
}
?>
