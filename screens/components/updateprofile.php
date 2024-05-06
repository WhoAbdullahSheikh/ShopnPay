<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Shopnpay";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $conn->autocommit(FALSE); // Turn off auto-commit

    try {
        $new_fullname = $conn->real_escape_string($_POST['fullname']);
        $new_email = $conn->real_escape_string($_POST['email']);
        $old_email = $_SESSION['email'];

        // Update the users table
        $stmt = $conn->prepare("UPDATE users SET fullname=?, email=? WHERE email=?");
        if ($stmt) {
            $stmt->bind_param("sss", $new_fullname, $new_email, $old_email);
            if (!$stmt->execute()) {
                throw new Exception('Failed to update user record.');
            }
            $stmt->close();
        } else {
            throw new Exception('Failed to prepare the user update statement.');
        }

        // Update the products table
        $stmt = $conn->prepare("UPDATE products SET email=? WHERE email=?");
        if ($stmt) {
            $stmt->bind_param("ss", $new_email, $old_email);
            if (!$stmt->execute()) {
                throw new Exception('Failed to update products record.');
            }
            $stmt->close();
        } else {
            throw new Exception('Failed to prepare the products update statement.');
        }

        $conn->commit(); // Commit the transaction
        $conn->autocommit(TRUE); // Turn on auto-commit

        $_SESSION['email'] = $new_email; // Update the session email.
        $_SESSION['message'] = "Profile updated successfully.";
       
    } catch (Exception $e) {
        $conn->rollback(); // Rollback the transaction on error
        $conn->autocommit(TRUE); // Turn on auto-commit
        $alert_message = '<div class="alert warning"><strong>Error!</strong> ' . $e->getMessage() . '</div>';
    }

    $conn->close();
}




?>

<!DOCTYPE html>
<html>

<head>
    <title>Profile Update</title>
    <!-- Add your CSS styles here -->
    <style>
        .alert {
            padding: 15px;
            background-color: #f44336;
            color: white;
            opacity: 1;
            transition: opacity 0.6s;
            margin-bottom: 15px;
        }

        .alert.success {
            background-color: #04AA6D;
        }

        .alert.info {
            background-color: #2196F3;
        }

        .alert.warning {
            background-color: #ff9800;
        }
    </style>
</head>

<body>
    <!-- Your HTML content here -->

    <?php
    // Display the alert message if it's set
    if (isset($alert_message)) {
        echo $alert_message;
    }
    ?>

    <!-- Rest of your HTML content -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var alerts = document.querySelectorAll(".alert");

            alerts.forEach(function(alert) {
                setTimeout(function() {
                    alert.style.opacity = "0";
                    setTimeout(function() {
                        alert.style.display = "none";
                    }, 600);
                }, 3000); // Fade out after 3 seconds
            });
        });
    </script>
</body>

</html>