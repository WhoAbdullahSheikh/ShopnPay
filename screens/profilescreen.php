 <?php
  session_start();
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  $userprofile = $_SESSION['email'];

  if ($userprofile == true) {
    // Step 1: Connect to your database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "wonderland";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];
    $sql = "SELECT id, fullname, email FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $fullname = $row['fullname'];
      $email = $row['email'];
    }

    $msg = "";
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['upload'])) {
      $filename = $_FILES["uploadfile"]["name"];
      $tempname = $_FILES["uploadfile"]["tmp_name"];
      $category = $conn->real_escape_string($_POST['category']);
      $description = $_POST['description'];
      $p_name = $_POST['p_name'];
      $price = $_POST['price'];
      $folder = "./image/" . $filename;
      $status = 'pending';
      $sql = "INSERT INTO products (email, p_name, description, price, category, filename, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')";
      $stmt = $conn->prepare($sql);
      if (move_uploaded_file($tempname, $folder)) {
        // Prepare the SQL statement to avoid SQL injection

        $stmt->bind_param("sssdss", $email, $_POST['p_name'], $_POST['description'], $_POST['price'], $category, $filename);
        $stmt->execute();
        $_SESSION['message'] = "Thank You! Your Product will go live after it gets approved by our team!";
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
      } else {
        echo "Failed to upload file.";
      }
    }

    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
      $productId = $_GET['id'];
      $conn = new mysqli("localhost", "root", "", "wonderland");
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

      // Ensure the product belongs to the user to prevent unauthorized deletions
      $sql = "DELETE FROM products WHERE id = ? AND email = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("is", $productId, $_SESSION['email']);
      if ($stmt->execute()) {
        echo "Product deleted successfully.";
      } else {
        echo "Error deleting product: " . $stmt->error;
      }
      $stmt->close();
      $conn->close();
      header('Location: ./profilescreen.php'); // Redirect back to the listing page
      exit;
    }

    $conn->close();
  } else {
    header("Location: loginscreen.php");
    exit();
  }
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
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

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
       margin-right: 10%;
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

     input[type="text"],
     input[type="email"] {
       width: 30%;
       padding: 10px;
       border: 1px solid black;
       border-radius: 10px;
       font-size: 15px;
     }

     button[type="submit"] {
       width: 30%;
       padding: 10px;
       border: none;
       border-radius: 5px;
       background-color: rgb(240, 197, 6);
       color: rgb(0, 0, 0);
       font-weight: bold;
       cursor: pointer;
       transition: background-color 0.3s ease;
     }

     button[type="submit"]:hover {
       background-color: rgb(243, 168, 7);
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



     .price-wrapper {
       width: 50%;
       align-items: center;
       border: 1px solid black;
       border-radius: 10px;
       padding: 2px;
     }

     .currency-prefix {
       background-color: #f0f0f0;
       padding: 10px;
       border-right: 1px solid black;
       border-top-left-radius: 8px;
       border-bottom-left-radius: 8px;
       font-size: 15px;
       color: #333;

     }

     input[type="number"] {
       flex-grow: 1;
       border: none;
       width: 90%;
       /* Removes focus outline */
       border-radius: 8px;
       padding: 10px;
       font-size: 15px;
       border: none;
       /* Removes border inside the input */
       outline: none;
     }


     #display-image {
       justify-content: center;
       /* Center content horizontally */
       padding: 5px;
       margin: 15px auto;
       /* Centers the div horizontally */

     }

     img {
       margin: 5px;
       width: 330px;

       height: 450px;
     }

     .product-item {

       border: 1px solid #ccc;
       border-radius: 5px;
       margin: 10px;
       padding: 10px;
       width: calc(33.333% - 20px);
       /* Three items per row, with margin */
       display: inline-block;
       vertical-align: top;
     }

     .product-item img {
       width: 330px;
       height: 450px;
       object-fit: cover;
       /* Ensures the image covers the area, might crop if aspect ratio differs */
     }

     @media (max-width: 1200px) {
       .product-item {
         width: 100%;
         /* Full width on smaller screens */
       }

       .product-item img {
         width: 100%;
         /* Image takes full width of its container */
         height: auto;
         /* Maintain aspect ratio */
       }
     }

     .product-card {
       border: 1px solid #ccc;
       border-radius: 5px;
       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
       margin: 10px;
       overflow: hidden;
       width: 330px;
       height: 650px;
       display: inline-block;
       vertical-align: top;
       position: relative;
     }


     .product-image {
       width: 330px;
       height: 450px;
       /* Adjusted to fit the image */
       object-fit: cover;
       /* Ensures the image covers the area properly */
     }

     .product-info {
       padding: 10px;
       color: #333;
       height: 5px;
       font-size: 25px;
       display: flex;
       align-items: center;
       /* Center the content vertically */
       font-weight: bold;
       /* Bold font for product name */
     }

     .product-info p {
       margin: 5px 0;
     }

     .product-desc {
       padding: 10px;
       font-size: 18px;
       color: #333;
       height: 130px;
       /* Adjusted for the description */
       font-weight: normal;
       /* Regular font weight for description */
       overflow: auto;
       /* Adds scroll if content overflows */
     }

     .product-desc p {
       margin: 5px 0;
     }

     .product-price {
       font-weight: bold;
       font-size: 25px;
       color: black;
       /* Set the text color to yellow */
       font-family: "Raleway", sans-serif;

       position: absolute;
       bottom: 10px;
       right: 10px;

       /* Black outline around text */
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

     .status-approved {
       background-color: #4CAF50;
       /* Green background */
       color: white;
       /* White text */
       padding: 10px 20px;
       /* Some padding */
       border-radius: 10px;
       /* Rounded corners */
     }

     .status-rejected {
       background-color: #f44336;
       /* Red background */
       color: white;
       /* White text */
       padding: 10px 20px;
       /* Some padding */
       border-radius: 10px;
       /* Rounded corners */
     }

     .status-pending {
       background-color: #ffeb3b;
       /* Yellow background */
       color: black;
       /* Black text */
       padding: 10px 20px;
       /* Some padding */
       border-radius: 10px;
       /* Rounded corners */
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
       <a href="#" id="profileButton" onclick="toggleSections('profile')">
         <i class="fas fa-user"></i>
         <span>Profile</span>
       </a>
       <a href="#" id="itemsButton" onclick="toggleSections('items')">
         <i class="material-icons">favorite</i>
         <span>Sell Product</span>
       </a>
       <a href="#" id="addedProductsButton" onclick="toggleSections('itemsAdded')">
         <i class="fa fa-shopping-bag"></i>
         <span>Added Products</span>
       </a>
       <a href="#" id="statusButton" onclick="toggleSections('productStatus')">
         <i class="fa fa-clock-o"></i>
         <span>Product Status</span></span>
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
         <li><a href="./shopscreen.php" class="under">SHOP</a></li>
         <li><a href="./about.html" class="under">ABOUT US</a></li>

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
     <div id="profileSection" style="background-color: white; color: black; padding: 20px; padding-left: 15%; ">
       <div class="profile-container">
         <h2>Personal Information
           <button onclick="location.reload();" style="margin-left: 700px; cursor: pointer;" class="refresh-button">
             <i class="fa fa-refresh fa-spin"></i>
           </button>
         </h2>
         <div class="section-break">
           <hr />
         </div>
         <div>
           <?php include './components/updateprofile.php'; ?>
           <form action="profilescreen.php" method="post">
             <label for="fullname">Full Name</label>
             <input type="text" id="fullname" name="fullname" value="<?php echo $fullname; ?>">
             <br>
             <br>
             <label for="email">Email</label>
             <input type="email" id="email" name="email" value="<?php echo $email; ?>">
             <br>
             <br>
             <br>
             <button type="submit">Update</button>
           </form>
         </div>
       </div>
     </div>
     <div id="itemsSection" style="background-color: white; color: black; padding: 20px; padding-left: 15%;">
       <div class="profile-container">
         <h2>Product Details
           <button onclick="location.reload();" style="margin-left: 800px; cursor: pointer;" class="refresh-button">
             <i class="fa fa-refresh fa-spin"></i>
           </button>
         </h2>

         <div class="section-break">
           <hr />
         </div>

         <form action="./profilescreen.php" method="POST" enctype="multipart/form-data">
           <label for="email">Email</label>
           <input type="email" id="email" name="email" value="<?php echo $email; ?>">

           <div class="input-container">
             <label for="p_name">Product Name:</label>
             <input type="text" id="p_name" name="p_name" required>
           </div>
           <div class="input-container">
             <label for="category">Category:</label>
             <select id="category" name="category" required style="border-radius: 10px; padding: 10px; font-size: 15px;">
               <option value="">Select a Category</option>
               <option value="Men">Men's</option>
               <option value="Women">Women's</option>
             </select>
           </div>

           <div class="input-container">
             <label for="description">Description:</label>
             <textarea id="description" name="description" required style="border-radius: 10px; height: 200px; width: 40%; font-size: 15px; padding: 10px"></textarea>
           </div>
           <div class="input-container">
             <label for="price">Price:</label>
             <div class="price-wrapper">
               <span class="currency-prefix">Rs.</span>
               <input type="number" step="10" id="price" name="price" required style="border-radius: 10px; padding: 10px; font-size: 15px; ">
             </div>
           </div>

           <div class="input-container image-upload">
             <input type="file" name="uploadfile" value="" />
             <br>
             <br>
             <button class="btn btn-primary" type="submit" name="upload">Submit Product</button>
           </div>
           <br>
           <div class="section-break">
             <hr />
           </div>

           <div id="display-image">
             <?php
              $conn = new mysqli($servername, $username, $password, $dbname); // Assume $conn is your active database connection
              $result = $conn->query("SELECT * FROM products WHERE email = '" . $conn->real_escape_string($_SESSION['email']) . "'");
              if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                  echo '<div class="product-card">';
                  echo '<img class="product-image" src="./image/' . htmlspecialchars($row['filename']) . '" alt="' . htmlspecialchars($row['p_name']) . '">';
                  echo '<div class="product-info">';
                  echo '<p>' . htmlspecialchars($row['p_name']) . '</p>';
                  echo '</div>';
                  echo '<div class="section-break-2"> <hr/></div>';
                  echo '<div class="product-desc">' . htmlspecialchars($row['description']) . '</div>';
                  echo '<p class="product-price">Rs. ' . htmlspecialchars($row['price']) . '</p>';
                  echo '</div>';
                }
              } else {
                echo "<p>No products found.</p>";
              }
              $conn->close();
              ?>
           </div>
         </form>
       </div>

     </div>

     <div id="itemsAdded" style="background-color: white; color: black; padding: 20px; padding-left: 15%;">
       <div class="profile-container">
         <h2>Your Added Products
           <button onclick="location.reload();" style="margin-left: 700px; cursor: pointer;" class="refresh-button">
             <i class="fa fa-refresh fa-spin"></i>
           </button>
         </h2>
         <div class="section-break">
           <hr />
         </div>
         <div id="display-image">
           <?php
            $conn = new mysqli($servername, $username, $password, $dbname); // Assume $conn is your active database connection
            $result = $conn->query("SELECT * FROM products WHERE email = '" . $conn->real_escape_string($_SESSION['email']) . "'");
            if ($result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                echo '<div class="product-card">';
                echo '<img class="product-image" src="./image/' . htmlspecialchars($row['filename']) . '" alt="' . htmlspecialchars($row['p_name']) . '">';
                echo '<div class="product-info">';
                echo '<p>' . htmlspecialchars($row['p_name']) . '</p>';
                echo '</div>';
                echo '<div class="section-break-2"> <hr/></div>';
                echo '<div class="product-desc">' . htmlspecialchars($row['description']) . '</div>';
                echo '<p class="product-price">Rs. ' . htmlspecialchars($row['price']) . '</p>';
                echo '</div>';
              }
            } else {
              echo "<p>No products found.</p>";
            }
            $conn->close();
            ?>
         </div>
       </div>
     </div>
     <div id="productStatus" style="background-color: white; color: black; padding: 20px; padding-left: 15%;">
       <div class="profile-container">
         <h2>Product Status
           <button onclick="location.reload();" style="margin-left: 850px; cursor: pointer;" class="refresh-button">
             <i class="fa fa-refresh fa-spin"></i>
           </button>
         </h2>
         <div class="section-break">
           <hr />
         </div>
         <?php
          $email = $_SESSION['email'] ?? null;

          if ($email) {
            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
              die("Connection failed: " . $conn->connect_error);
            }

            $sql = "SELECT id, filename, p_name, description, price, status FROM products WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
          ?>
           <table style="width:100%">
             <thead>
               <tr>

                 <th>Image</th>
                 <th>Product Name</th>
                 <th>Description</th>
                 <th>Price</th>
                 <th>Status</th>
                 <th>Action</th> <!-- New column for delete action -->
               </tr>
             </thead>
             <tbody>
               <?php while ($row = $result->fetch_assoc()) : ?>
                 <tr>
                   <td style="text-align: center;">
                     <img src="./image/<?= htmlspecialchars($row['filename']) ?>" alt="<?= htmlspecialchars($row['p_name']) ?>" style="width: 100px; height: auto;">
                   </td>
                   <td style="text-align: center;"><?= htmlspecialchars($row['p_name']) ?></td>
                   <td><?= htmlspecialchars($row['description']) ?></td>
                   <td style="text-align: center;">Rs. <?= htmlspecialchars($row['price']) ?></td>
                   <td style="text-align: center;">
                     <span class="<?= 'status-' . strtolower(htmlspecialchars($row['status'])) ?>">
                       <?= htmlspecialchars($row['status']) ?>
                     </span>
                   </td>
                   <td style="text-align: center;">
                     <button onclick="deleteProduct(<?= $row['id'] ?>);" class="delete-button">
                       <i class="fas fa-trash"></i>
                     </button>
                   </td>
                 </tr>
               <?php endwhile; ?>
             </tbody>
           </table>


         <?php
            $stmt->close();
            $conn->close();
          } else {
            // Redirect user to login page or inform them to log in
            echo "Please log in to view this page.";
          }
          ?>
       </div>
     </div>


   </div>

   <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
   <script src="./JS/cartscreen.js"></script>
   <script>
     function deleteProduct(productId) {
       if (confirm('Are you sure you want to delete this product?')) {
         window.location.href = 'profilescreen.php?id=' + productId;
       }
     }
   </script>
   <script>
     document.addEventListener("DOMContentLoaded", function() {
       <?php if (isset($_SESSION['message'])) : ?>
         alert("<?= $_SESSION['message']; ?>");
         <?php unset($_SESSION['message']); // Clear the message after displaying it 
          ?>
       <?php endif; ?>
     });
   </script>

   <script>
     document.addEventListener('DOMContentLoaded', function() {

       function toggleSections(section) {
         var profileSection = document.getElementById("profileSection");
         var itemsSection = document.getElementById("itemsSection");
         var itemsAdded = document.getElementById("itemsAdded");
         var productStatus = document.getElementById("productStatus");

         if (section === 'profile') {
           profileSection.style.display = "block";
           itemsSection.style.display = "none";
           itemsAdded.style.display = "none";
           productStatus.style.display = "none";
         } else if (section === 'items') {
           profileSection.style.display = "none";
           itemsSection.style.display = "block";
           itemsAdded.style.display = "none";
           productStatus.style.display = "none";

         } else if (section === 'itemsAdded') {
           profileSection.style.display = "none";
           itemsSection.style.display = "none";
           itemsAdded.style.display = "block";
           productStatus.style.display = "none";

         } else if (section === 'productStatus') {
           profileSection.style.display = "none";
           itemsSection.style.display = "none";
           itemsAdded.style.display = "none";
           productStatus.style.display = "block";
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
         } else if (lastOpenedSection === 'itemsAdded') {
           toggleSections('itemsAdded');
         } else {
           toggleSections('productStatus');
         }
       }


       // Restore sections on page load based on saved state or default to profile
       restoreSections();

       // Event listeners for menu buttons
       document.getElementById("profileButton").addEventListener("click", function() {
         toggleSections('profile');
       });

       document.getElementById("itemsButton").addEventListener("click", function() {
         toggleSections('items');
       });

       document.getElementById("addedProductsButton").addEventListener("click", function() {
         toggleSections('itemsAdded');
       });
       document.getElementById("statusButton").addEventListener("click", function() {
         toggleSections('productStatus');
       });
     });
   </script>




 </body>

 </html>