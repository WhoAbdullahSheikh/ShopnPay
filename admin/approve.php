<?php
session_start();

// Only proceed if the user is logged in
if (!isset($_SESSION['email'])) {
    header('Location: loginscreen.php');
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Shopnpay";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id']) && isset($_GET['status'])) {
    $productId = $_GET['id'];
    $newStatus = $_GET['status'];

    // Validate the status
    if (!in_array($newStatus, ['Approved', 'Rejected'])) {
        die('Invalid status provided.');
    }

    // Create database query to update the status
    $stmt = $conn->prepare("UPDATE products SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $newStatus, $productId);
    $success = $stmt->execute();

    // Check if the query was successful
    if ($success) {
        $_SESSION['message'] = "Product status updated successfully!";
    } else {
        $_SESSION['message'] = "Error updating product status.";
    }

    // Redirect back to the product listing or approval page
    header('Location: adminprofile.php'); // Adjust the redirect location as necessary
    exit();
}

// If the necessary GET parameters are not set, redirect or handle the error as needed
else {
    header('Location: error_page.php'); // Create an error page or handle differently
    exit();
}
?>
