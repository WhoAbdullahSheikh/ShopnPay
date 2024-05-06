<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the user is logged in and is an admin.
if (!isset($_SESSION['email']) || $_SESSION['email'] !== 'admin@wonderland.com') {
  header('Location: loginscreen.php'); // Redirect to login page if not admin
  exit();
}
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wonderland";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sqlApproved = "SELECT COUNT(*) AS count_approved FROM products WHERE status = 'approved'";
$resultApproved = $conn->query($sqlApproved);
$approvedCount = $resultApproved->fetch_assoc()['count_approved'];  // Get the count


$sqlRejected = "SELECT COUNT(*) AS count_rejected FROM products WHERE status = 'rejected'";
$resultRejected = $conn->query($sqlRejected);
$rejectedCount = $resultRejected->fetch_assoc()['count_rejected'];  // Get the count

$sql = "SELECT filename, id, p_name, description, price, category, status FROM products WHERE status = 'Approved' OR status = 'Rejected' ORDER BY id ASC"; // Modify query as needed
$result = $conn->query($sql);

if ($result === false) {
  echo "Error fetching the products: " . $conn->error;
  $products = [];
} else {
  $products = $result->fetch_all(MYSQLI_ASSOC);
}


$sql = "SELECT products.id, products.p_name, products.description, products.filename, products.price, products.email, users.fullname 
FROM products 
JOIN users ON products.email = users.email
WHERE products.status = 'pending'";


$result = $conn->query($sql);

// Check if "approve" or "reject" actions have been triggered
if (isset($_GET['action'], $_GET['id']) && in_array($_GET['action'], ['approve', 'reject'])) {
  $newStatus = $_GET['action'] === 'approve' ? 'approved' : 'rejected';
  $stmt = $conn->prepare("UPDATE products SET status = ? WHERE id = ?");
  $stmt->bind_param('si', $newStatus, $_GET['id']);
  $stmt->execute();
  $stmt->close();

  // Redirect to prevent resubmission
  header('Location: admin.php');
  exit();
}
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
  $productId = $_GET['id'];

  // SQL to delete the product
  $sql = "DELETE FROM products WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $productId);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {
    echo "<script>alert('Product deleted successfully.'); window.location.href='./adminprofile.php';</script>";
  } else {
    echo "<script>alert('Error deleting product.'); window.location.href='./adminprofile.php';</script>";
  }

  $stmt->close();
  $conn->close();
}
// Close database connection if open
$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wonderland</title>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="./ecommerce.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" />
  <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Raleway", sans-serif;
      box-sizing: border-box;
    }

    header {
      position: fixed;
      z-index: 1000;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 60px;
      width: 100%;
      background: black;
    }



    .heading {
      display: flex;
      justify-content: flex-end;
      /* Align items to the right */
      align-items: center;
      height: 60px;
      width: 100%;
      background: black;
      padding-right: 3%;
    }

    .heading1 {
      opacity: 1;
      bottom: 8px;
    }

    .heading ul {
      display: flex;
    }

    .logo {
      margin: 5%;
    }

    .logo a {
      color: white;
      transition-duration: 1s;
      font-weight: 800;
    }

    .logo a:hover {
      color: rgb(240, 197, 6);
      transition-duration: 1s;
    }

    .heading ul li {
      list-style-type: none;
    }

    .heading ul li a {
      margin: 5px;
      text-decoration: none;
      color: black;
      font-weight: 500;
      position: relative;
      color: white;
      margin: 2px 14px;
      font-size: 10px;
      transition-duration: 1s;
    }

    .heading ul li a:active {
      color: red;
    }

    .heading ul li a:hover {
      color: rgb(243, 168, 7);
      transition-duration: 1s;
    }

    .heading ul li a::before {
      content: "";
      height: 2px;
      width: 0px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: white;
      transition-duration: 1s;
    }

    .heading ul li a:hover::before {
      width: 100%;
      transition-duration: 1s;
      background-color: rgb(243, 168, 7);
    }

    #input {
      height: 30px;
      width: 300px;
      text-decoration: none;
      border: 0px;
      padding: 5px;
    }

    .logo a {
      color: white;
      font-size: 35px;
      font-weight: 500;
      text-decoration: none;
    }

    ion-icon {
      width: 30px;
      height: 30px;
      background-color: white;
      color: black;
    }

    ion-icon:hover {
      cursor: pointer;
    }

    .search a {
      display: flex;
    }

    header a ion-icon {
      position: relative;
      right: 3px;
    }

    .heading1 {
      opacity: 0;
    }

    .search {
      display: flex;
      position: relative;
    }

    .section1 {
      width: 100%;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      margin: 0px auto;
    }

    footer {
      margin-top: 3%;
      padding-top: 3%;
      display: flex;
      flex-direction: column;
      background-color: black;
      align-items: center;
      color: white;
    }

    .footer1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      margin-top: 15px;
    }

    .social-media {
      display: flex;
      justify-content: center;
      color: white;
      flex-wrap: wrap;
    }

    .social-media a {
      color: white;
      margin: 20px;
      border-radius: 5px;
      margin-top: 10px;
      color: white;
    }

    .social-media a ion-icon {
      color: white;
      background-color: black;
    }

    .social-media a:hover ion-icon {
      color: rgb(243, 168, 7);
      transform: translateY(5px);
    }

    .footer2 {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      align-items: center;
      text-decoration: none;
      flex-wrap: wrap;
    }

    .footer0 {
      font-weight: 1200;
      transition-duration: 1s;
    }

    .footer0:hover {
      color: rgb(243, 168, 7);
    }

    .footer2 .heading-start {
      font-weight: 900;
      font-size: 18px;
    }

    .footer3 {
      margin-top: 60px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .footer2 .heading:hover {
      color: rgb(243, 168, 7);
    }

    .footer2 .div:hover {
      transform: scale(1.05);
    }

    .footer3 h4 {
      margin: 0 10px;
    }

    .footer2 div {
      margin: 10px;
    }

    .menu {
      visibility: hidden;
    }

    .heading1 .ham:active {
      color: red;
    }

    .items {
      overflow: hidden;
    }

    .ham,
    .close {
      cursor: pointer;
    }

    @media screen and (max-width: 1250px) {
      .heading ul li {
        display: none;
      }

      .items {
        transform: scale(0.9);
      }

      .img-slider img {
        height: 60vw;
        width: 80vw;
      }

      .ham:active {
        color: red;
      }

      .menu {
        display: block;
        flex-direction: column;
        align-items: center;
      }

      .menu a ion-icon {
        position: absolute;
      }

      @keyframes slide1 {
        0% {
          left: 0vw;
        }

        15% {
          left: 0vw;
        }

        20% {
          left: -80vw;
        }

        32% {
          left: -80vw;
        }

        35% {
          left: -160vw;
        }

        47% {
          left: -160vw;
        }

        50% {
          left: -240vw;
        }

        63% {
          left: -240vw;
        }

        66% {
          left: -320vw;
        }

        79% {
          left: -320vw;
        }

        82% {
          left: -400vw;
        }

        100% {
          left: 0vw;
        }
      }

      .menu ul {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100vw;
        height: 70vh;
        background-color: rgb(0, 0, 0, 0.8);
        left: 0;
        top: 0;
        z-index: 11;
        align-items: center;
        justify-content: center;
      }

      .close {
        z-index: 34;

        color: white;
        background-color: black;
      }

      .close:active {
        color: red;
      }

      .menu ul li {
        list-style: none;
        margin: 20px;
        border-top: 3px solid white;
        width: 80%;
        text-align: center;

        padding-top: 10px;
      }

      .menu ul li a {
        text-decoration: none;
        padding-top: 10px;
        color: white;
        font-weight: 90;
      }

      .menu ul li a:hover {
        color: rgb(240, 197, 6);
      }

      .img-slider {
        display: flex;
        float: left;
        position: relative;
        width: 100%;
        height: 100%;
        animation-name: slide1;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        transition-duration: 2s;
      }

      .section1 {
        width: 100%;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        margin: 0px auto;
      }

      .heading1 {
        opacity: 1;
        bottom: 8px;
      }

      .search a {
        display: flex;
        flex-wrap: nowrap;
      }

      .heading1 .ham {
        background-color: black;
        color: white;
      }

      #input {
        width: 200px;
        flex-shrink: 2;
      }

      header {
        height: 150px;
      }
    }

    @media screen and (max-width: 550px) {
      .heading ul li {
        display: none;
      }

      .heading1 {
        opacity: 1;

        bottom: 8px;
      }

      header {
        height: 250px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;
      }

      #input {
        width: 150px;
      }

      .close {
        z-index: 34;
      }

      .search a {
        display: flex;
        flex-wrap: nowrap;
      }
    }

    .section-break {
      padding-top: 2%;
      text-align: center;
      margin: 5px 0;
      padding-bottom: 1%;
    }

    .section-break hr {
      width: 85%;
      /* Adjust the width as needed */
      border: none;
      height: 1px;
      margin: 0 auto;
      /* Center the line horizontally */
      background-color: #333;
    }

    .section-break-2 {
      padding-top: 2%;
      text-align: center;
      margin: 5px 0;
      padding-bottom: 1%;
    }

    .section-break-2 hr {
      width: 95%;
      /* Adjust the width as needed */
      border: none;
      height: 1px;
      margin: 0 auto;
      /* Center the line horizontally */
      background-color: #333;
    }

    .section2 {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      max-width: 1200px;
      padding: 20px;
    }

    .category-heading {
      text-align: center;
      font-size: 30px;
      padding: 1%;
    }

    .sidenav {
      height: 100%;
      width: 250px;
      position: fixed;
      z-index: 1;
      top: 60px;
      left: 0;
      background-color: #111;
      overflow-x: hidden;
      transition: 0.5s;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .sidenav a {
      padding: 8px 16px;
      text-decoration: none;
      font-size: 17px;
      color: #818181;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      transition: color 0.3s, background-color 0.3s;
      margin-left: 5%;
      margin-bottom: 10px;
      /* Added to create a gap between buttons */
      border-radius: 5px;
      width: 90%;
    }

    .sidenav a i {
      font-size: 20px;
      color: white;
      margin-right: 10px;
    }

    .sidenav a span {
      color: white;
    }

    .sidenav a:hover {
      color: #f1f1f1;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .sidenav hr {
      width: 90%;
      border: none;
      height: 1px;
      margin: 0 auto;
      background-color: #818181;
      margin-top: 20px;
      margin-bottom: 20px;
    }



    hr {
      width: 90%;
      border: none;
      height: 1px;
      margin: 0 auto;
      /* Center the line horizontally */
      background-color: #818181;
      margin-top: 50px;
      margin-bottom: 10px;
    }

    .profile-container {
      border: 0px solid #ccc;
      border-radius: 40px;
      padding: 20px;
      margin-left: 10%;
      margin-right: 0%;
      margin-top: 5%;
      padding-top: 2%;
      padding-bottom: 3%;
      box-shadow: 0 0 70px rgba(0, 0, 0, 0.7);
      opacity: 0;
      /* Initially hide the container */
      animation: fadeIn 0.5s forwards;

      /* Apply fade-in animation */
    }

    /* Define the fade-in animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        /* Start with opacity 0 */
      }

      to {
        opacity: 1;
        /* End with opacity 1 */
      }
    }




    .profile-container h2 {
      margin-bottom: 10px;
      font-size: 40px;
    }

    .profile-container div {
      margin-top: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 20px;
    }


    .section-break {
      padding-top: 3px;
      text-align: center;
      margin: 5px 0;
      padding-bottom: 1%;
    }

    .section-break hr {
      width: 100%;
      /* Adjust the width as needed */
      border: none;
      height: 1px;
      margin: 0 auto;
      /* Center the line horizontally */
      background-color: #333;
    }

    table,
    td,
    th {
      border: 2px solid #ddd;
      text-align: left;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th {
      font-size: 26px;
      text-align: center;
    }

    th,
    td {
      padding: 15px;
    }

    .btn {
      padding: 5px 20px;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      text-decoration: none;
      margin: 5px;
      width: 100px;
      /* Fixed width for all buttons */
      display: inline-block;
      /* Ensures the width is respected */
      text-align: center;

    }

    .btn-approve {
      background-color: #4CAF50;
      /* Green */
    }

    .btn-reject {
      background-color: #f44336;
      /* Red */
    }

    /* Optional: style for hover effect */
    .btn:hover {
      opacity: 0.8;
    }

    .refresh-button {
      margin-left: auto;
      /* Pushes the button to the right */
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 14px;
      font-size: 16px;
      border-radius: 15px;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.6);
      transition: all 0.5s ease;
      cursor: pointer;
    }

    .refresh-button:hover {
      background-color: #71CD75;
      color: black;
      box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.6);
    }

    .refresh-button i.fa-refresh {
      animation: spin 5s infinite linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .status-box {
      padding: 10px 20px;
      margin: 10px 0;
      border-radius: 15px;
      color: white;
      width: 20%;
      /* White text color for better readability on dark backgrounds */
      font-size: 20px;
    }

    .approved {
      background-color: #00A207;
      /* Green background for approved */
    }

    .rejected {
      background-color: #A30B0B;
      /* Red background for rejected */
    }

    .delete-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      padding: 8px;
      color: #ff6347;
      font-size: 25px;
      transition: color 0.3s ease;
    }

    .delete-button:hover {
      color: #d11a2a;
    }
  </style>
</head>

<body>
  <header>
    <div id="mySidenav" class="sidenav">
      <a href="#" id="approvalButton" onclick="toggleSections('profile')">
        <i class="fas fa-user"></i>
        <span>Approvals</span>
      </a>
      <a href="#" id="listingButton" onclick="toggleSections('items')">
        <i class="material-icons">favorite</i>
        <span>Items Listings</span>
      </a>


      <hr>
      <a href="./logout.php">
        <i class="fas fa-sign-out-alt"></i>
        <span>Signout</span>
      </a>
    </div>

    <div class="logo">
      <a href="../home.php">Wonderland</a>
    </div>

    <div class="heading">
      <ul>
        <li><a href="../home.php" class="under">HOME</a></li>
        <li><a href="../screens/shopscreen.php" class="under">SHOP</a></li>


      </ul>
    </div>

    <div class="heading1">
      <ion-icon name="menu" class="ham"></ion-icon>
      <div class="menu">
        <a href="#">
          <ion-icon name="close" class="close"></ion-icon>
        </a>

        <ul>
          <li><a href="#" class="under">HOME</a></li>
          <li><a href="#" class="under">SHOP</a></li>
          <li><a href="#" class="under">OUR PRODUCTS</a></li>
          <li><a href="#" class="under">LOGIN/REGISTER</a></li>
          <li><a href="#" class="under">ABOUT US</a></li>
        </ul>
      </div>
    </div>
  </header>

  <div id="contentContainer">
    <div id="approvalSection" style="background-color: white; color: black; padding: 20px; padding-left: 5%; ">
      <div class="profile-container">
        <h2>Products Approvals
          <button onclick="location.reload();" style="margin-left: 1100px; cursor: pointer;" class="refresh-button">
            <i class="fa fa-refresh fa-spin"></i>
          </button>
        </h2>
        <div class="section-break">
          <hr />
        </div>
        <table style="width:100%">
          <tr>
            <th>Image</th>
            <th>Product Owner</th>
            <th>Product's Owner</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          <?php while ($row = $result->fetch_assoc()) : ?>
            <tr>
              <td style="text-align: center;">
                <img src="../screens/image/<?= htmlspecialchars($row['filename']) ?>" alt="<?= htmlspecialchars($row['p_name']) ?>" style="width: 100px; height: auto;">
              </td>
              <td style="text-align: center;"><?= htmlspecialchars($row['fullname']) ?></td> <!-- Display the owner's name -->
              <td style="text-align: center;"><?= htmlspecialchars($row['email']) ?></td>
              <td style="text-align: center;"><?= htmlspecialchars($row['p_name']) ?></td>
              <td><?= htmlspecialchars($row['description']) ?></td>
              <td style="text-align: center;">Rs. <?= htmlspecialchars($row['price']) ?></td>
              <td style="text-align: center;">
                <a href="approve.php?id=<?= $row['id'] ?>&status=Approved" class="btn btn-approve">Approve</a>
                <a href="approve.php?id=<?= $row['id'] ?>&status=Rejected" class="btn btn-reject">Reject</a>
              </td>
            </tr>
          <?php endwhile; ?>

        </table>



      </div>
    </div>
    <div id="itemsLisiting" style="background-color: white; color: black; padding: 20px; padding-left: 5%;">
      <div class="profile-container">
        <h2>Product Listing
          <button onclick="location.reload();" style="margin-left: 1200px; cursor: pointer;" class="refresh-button">
            <i class="fa fa-refresh fa-spin"></i>
          </button>
        </h2>
        <div class="status-box approved">
          <strong>Approved Products: </strong> <?= $approvedCount ?>
        </div>
        <div class="status-box rejected">
          <strong>Rejected Products: </strong> <?= $rejectedCount ?>
        </div>

        <div class="section-break">
          <hr />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($products as $product) : ?>
              <tr>
                <td style="text-align: center;"><?= htmlspecialchars($product['id']) ?></td>
                <td style="text-align: center;">
                  <img src="../screens/image/<?= htmlspecialchars($product['filename']) ?>" alt="<?= htmlspecialchars($product['p_name']) ?>" style="width: 100px; height: auto;">
                </td>
                <td><?= htmlspecialchars($product['p_name']) ?></td>
                <td><?= htmlspecialchars($product['description']) ?></td>
                <td style="text-align: center;">Rs. <?= htmlspecialchars($product['price']) ?></td>
                <td style="text-align: center;"><?= htmlspecialchars($product['category']) ?></td>
                <td style="text-align: center;"><?= htmlspecialchars($product['status']) ?></td>
                <td style="text-align: center;">
                  <button onclick="deleteProduct(<?= $product['id']; ?>);" class="delete-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            <?php endforeach; ?>
            <?php if (empty($products)) : ?>
              <tr>
                <td colspan="8">No products found</td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div id="itemsAdded" style="background-color: white; color: black; padding: 20px; padding-left: 15%;">
    <div class="profile-container">
      <h2>Your Added Products</h2>
      <div class="section-break">
        <hr />
      </div>


    </div>
  </div>


  </div>

  <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
  <script src="./JS/cartscreen.js"></script>
  <script>
    function deleteProduct(productId) {
      if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        window.location.href = './adminprofile.php?id=' + productId;
      }
    }
  </script>

  <script>
    document.addEventListener('DOMContentLoaded', function() {

      function toggleSections(section) {
        var approvalSection = document.getElementById("approvalSection");
        var itemsLisiting = document.getElementById("itemsLisiting");
        var itemsAdded = document.getElementById("itemsAdded");

        if (section === 'profile') {
          approvalSection.style.display = "block";
          itemsLisiting.style.display = "none";
          itemsAdded.style.display = "none";
        } else if (section === 'items') {
          approvalSection.style.display = "none";
          itemsLisiting.style.display = "block";
          itemsAdded.style.display = "none";

        } else if (section === 'addedItems') {
          approvalSection.style.display = "none";
          itemsLisiting.style.display = "none";
          itemsAdded.style.display = "block";
        }
        localStorage.setItem("lastOpenedSection", section);
      }

      // Function to restore the section visibility from local storage or default to profile
      function restoreSections() {
        var lastOpenedSection = localStorage.getItem("lastOpenedSection");
        if (lastOpenedSection === 'items') {
          toggleSections('items');
        } else if (lastOpenedSection === 'profile') {
          toggleSections('profile');
        } else {
          toggleSections('addedItems');
        }
      }


      // Restore sections on page load based on saved state or default to profile
      restoreSections();

      // Event listeners for menu buttons
      document.getElementById("approvalButton").addEventListener("click", function() {
        toggleSections('profile');
      });

      document.getElementById("listingButton").addEventListener("click", function() {
        toggleSections('items');
      });

      document.getElementById("addedProductsButton").addEventListener("click", function() {
        toggleSections('addedItems');
      });
    });
  </script>




</body>

</html>