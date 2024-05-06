<?php
// DB credentials.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Shopnpay";
if (isset($_SESSION['email']) && $_SESSION['email'] !== 'admin@Shopnpay.com') {
  $showProfileIcon = true;
} else {
  $showProfileIcon = false;
}
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch products
$sql = "SELECT name, description, filename, price FROM products";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shopnpay</title>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" />
  <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Raleway", sans-serif;
      box-sizing: border-box;
    }

    header {
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

    .img-slider img {
      width: 100%;
      /* Ensure the image takes up the full width of the slider */
      height: 100%;
      /* Ensure the image takes up the full height of the slider */
      object-fit: cover;
      /* Ensure the image covers the entire container */
    }

    @keyframes slide {
      0% {
        left: 0px;
      }

      15% {
        left: 0px;
      }

      20% {
        left: -1080px;
      }

      32% {
        left: -1080px;
      }

      35% {
        left: -2160px;
      }

      47% {
        left: -2160px;
      }

      50% {
        left: -3240px;
      }

      63% {
        left: -3240px;
      }

      66% {
        left: -4320px;
      }

      79% {
        left: -4320px;
      }

      82% {
        left: -5400px;
      }

      100% {
        left: 0px;
      }
    }

    .slideshow-container {
      max-width: 1000px;
      position: relative;
      margin: auto;
      padding-top: 3%;
    }

    /* Hide the images by default */
    .mySlides {
      display: none;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    }

    /* Next & previous buttons */
    .prev,
    .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      margin-top: -22px;
      padding: 16px;
      color: rgb(8, 8, 8);
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
    }

    /* Position the "next button" to the right */
    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    .prev:hover,
    .next:hover {
      background-color: rgba(151, 148, 148, 0.8);
    }

    /* The dots/bullets/indicators */
    .dot {
      cursor: pointer;
      height: 10px;
      width: 10px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.6s ease;
    }

    .active,
    .dot:hover {
      background-color: #717171;
    }

    /* Fading animation */
    .fade {
      animation-name: fade;
      animation-duration: 1.5s;
    }

    @keyframes fade {
      from {
        opacity: 0.4;
      }

      to {
        opacity: 1;
      }
    }

    .img-slider {
      display: flex;
      float: left;
      position: relative;
      width: 1080px;
      height: 720px;
      animation-name: slide;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      transition-duration: 2s;
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

    .section2 .container {
      display: flex;
      width: 100%;
      height: max-content;
      flex-wrap: wrap;
      justify-content: center;
      margin: 10px auto;
    }

    .section2 .container .items {
      margin: 10px;
      width: 200px;
      height: 300px;
      background-color: white;
      border: 2.5px solid black;
      border-radius: 12px;
    }

    .section2 .container .items .name {
      text-align: center;
      background-color: rgb(240, 197, 6);
      height: 25px;
      padding-top: 4px;
      color: white;
      margin: 0;
    }

    .section2 .container .items .price {
      float: left;
      padding-left: 10px;
      display: block;
      width: 100%;
      color: rgb(255, 0, 0);
      font-weight: 650;
    }

    .section2 .container .items .info {
      padding-left: 10px;
      color: rgb(243, 168, 7);
    }

    .section2 .container .items .img img {
      width: 200px;
      height: 200px;
      margin: 0;
      padding: 0;
      border-radius: 12px;
      transition-duration: 0.8s;
    }

    .section2 .container .items .img {
      overflow: hidden;
      margin: 0;
    }

    .section2 .container .items:hover .img img {
      transform: scale(1.2);
      transition-duration: 0.8s;
      border-radius: 12px;
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

    .section2 {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      display: flex;
      justify-content: center;
    }

    .category-heading {
      text-align: center;
      font-size: 30px;
      padding: 1%;
    }

    .items {
      display: flex;
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 300px;
      margin: 3%;
      text-align: center;
      padding-bottom: 2%;
    }

    .card img:hover {
      color: rgb(155, 155, 155);
      opacity: 0.8;
      /* Reduce opacity on hover */
      transition: 0.3s ease;
    }

    .price {
      color: rgb(0, 0, 0);
      font-size: 22px;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }

    .card button {
      border: none;
      outline: 0;
      padding: 12px;
      color: white;
      background-color: #000;
      text-align: center;
      cursor: pointer;
      width: 100%;
      font-size: 18px;
      margin-top: 6%;
    }

    .card button:hover {
      color: rgb(192, 157, 4);
      opacity: 1;
      /* Reduce opacity on hover */
      transition: 0.3s ease;
    }

    .circle-card {
      text-align: center;
      font-size: 30px;
      padding: 2%;
      transition: opacity 0.3s ease;
    }

    .circle-card:hover {
      color: rgb(158, 129, 0);
      opacity: 0.8;
      /* Reduce opacity on hover */
    }

    .circle-image img {
      width: 330px;
      /* adjust size as needed */
      height: 450px;
      /* adjust size as needed */
      border-radius: 20%;
      border: 2px solid black;
      border-width: 2px;
      /* Remove any existing border */
      box-shadow: 20px 25px 15px 5px rgba(77, 76, 76, 0.5);
      /* Adjust color and size as needed */
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    #womenClothingSection,
    #menClothingSection {
      animation: fadeIn 0.8s ease forwards;
      opacity: 0;
    }

    #display-image {
      justify-content: center;
      width: 360px;
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
      height: 460px;
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
      border-radius: 5%;

      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.7);
      margin: 10px;
      padding: 0;
      background-color: rgb(248, 212, 170);
      overflow: hidden;
      width: 360px;
      height: 650px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
      padding-top: 10px;
      /* Smooth transition for shadow and transform */
      cursor: pointer;
      /* Indicates that the item is clickable */
    }

    .product-card:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      /* Enhanced shadow for hover effect */
      transform: translateY(-5px);
      /* Slightly raise the card */
    }

    .product-image {
      border-radius: 15px;
      width: 90%;
      /* Ensures the image fills the width */
      height: 450px;
      /* Fixed height for the image */
      object-fit: contain;
      /* Ensures the entire image is visible */
      margin: 0 auto;
      /* Center the image horizontally */
      display: block;
      /* Ensures the image doesn't inline any default margins/paddings */
      background: #fff;
      /* Optional: Adds a white background to fill any empty space */
    }


    .product-info {
      padding: 10px;
      font-weight: bold;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .product-desc {
      padding: 10px;
      font-size: 15px;
    }



    .price-cart-container {

      display: flex;
      justify-content: space-between;
      /* This spreads the button and price apart */
      align-items: center;
      padding: 0 10px 10px 10px;

    }

    .product-price {
      font-weight: bold;
      font-size: 22px;
      color: black;
      /* Gold color for pricing */
      position: absolute;
      bottom: 17px;
      right: 10px;
      background: rgba(255, 255, 255, 0.9);
      /* Slight background to ensure readability */
      padding: 5px 10px;
      border-radius: 5px;
      /* Rounded corners for the price tag */
    }

    .section-break-2 hr {
      background-color: black;
      /* Lighter line color for a subtle break */
    }

    .add-to-cart-btn {

      background-color: rgb(240, 197, 6);
      color: rgb(0, 0, 0);
      color: black;
      margin-top: 12%;
      margin-left: 3%;
      border: none;
      font-weight: bold;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
      width: 50%;

    }

    .add-to-cart-btn:hover {
      background-color: rgb(217, 118, 0);

      transition: background-color 0.6s ease;

      /* Darker shade on hover */
    }
  </style>
</head>

<body>
  <header>
    <div class="logo">
      <a href="#">Shopnpay</a>
    </div>

    <div class="heading">
      <ul>
        <li><a href="../home.php" class="under">HOME</a></li>
        <li><a href="./loginscreen.php" class="under">LOGIN/REGISTER</a></li>
        <li><a href="./about.html" class="under">ABOUT US</a></li>
        <?php if ($showProfileIcon) : ?>
          <li>
            <a href="./profilescreen.php"><i class="fa fa-user" style="font-size: 20px; color: white"></i></a>
          </li>
        <?php endif; ?>
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

          <li><a href="#" class="under">LOGIN/REGISTER</a></li>
          <li><a href="#" class="under">ABOUT US</a></li>
        </ul>
      </div>
    </div>
  </header>
  <section>
    <div class="category-heading">
      <h1>Clothing Categories</h1>
    </div>
    <div class="section2">
      <div class="container">
        <div class="circle-card" onclick="toggleCategory('men')">
          <div class="circle-image">
            <img src="../collection/men/6cd89aa0a4f5332635198f49b1d8a453.jpg" alt="" />
            <br />
            <br />
            <p>Men</p>
          </div>
        </div>
        <div class="circle-card" onclick="toggleCategory('women')">
          <div class="circle-image">
            <img src="../collection/women/MF-114.jpg" alt="" />
            <br />
            <br />
            <p>Women</p>
          </div>
        </div>
      </div>
    </div>
    <div id="menClothingSection" style="display: none" class="container animated-container">
      <div class="section-break">
        <hr />
      </div>

      <div class="category-heading">
        <h1>Mens Clothing</h1>
      </div>
      <div class="section2">
        <div class="display-image">
          <?php
          $conn = new mysqli($servername, $username, $password, $dbname); // Assume $conn is your active database connection
          $result = $conn->query("SELECT * FROM products WHERE status = 'approved' AND category = 'Men'"); // Only select approved products
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
              echo '<div class="product-card">';
              echo '<img class="product-image" src="./image/' . htmlspecialchars($row['filename']) . '" alt="' . htmlspecialchars($row['p_name']) . '">';
              echo '<div class="product-info">';
              echo '<p>' . htmlspecialchars($row['p_name']) . '</p>';
              echo '</div>';
              echo '<div class="section-break-2"> <hr/></div>';
              echo '<div class="product-desc">' . htmlspecialchars($row['description']) . '</div>';
              echo '<div class="price-cart-container">';
              echo '<button class="add-to-cart-btn" onclick="addToCartAndRedirect(\'' . htmlspecialchars($row['p_name']) . '\', ' . htmlspecialchars($row['price']) . ')">Add to Cart</button>';
              echo '<p class="product-price">Rs. ' . htmlspecialchars($row['price']) . '</p>';
              echo '</div>';
              echo '</div>'; // Close product-card
            }
          } else {
            echo "<p>No products found.</p>";
          }
          $conn->close();
          ?>
        </div>
      </div>
    </div>

    <div id="womenClothingSection" style="display: none" class="container animated-container">
      <div class="section-break">
        <hr />
      </div>

      <div class="category-heading">
        <h1>Women Clothing</h1>
      </div>
      <div class="section2">
        <div class="display-image">
          <?php
          $conn = new mysqli($servername, $username, $password, $dbname); // Assume $conn is your active database connection
          $result = $conn->query("SELECT * FROM products WHERE status = 'approved' AND category = 'Women'"); // Only select approved products
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
              echo '<div class="product-card">';
              echo '<img class="product-image" src="./image/' . htmlspecialchars($row['filename']) . '" alt="' . htmlspecialchars($row['p_name']) . '">';
              echo '<div class="product-info">';
              echo '<p>' . htmlspecialchars($row['p_name']) . '</p>';
              echo '</div>';
              echo '<div class="section-break-2"> <hr/></div>';
              echo '<div class="product-desc">' . htmlspecialchars($row['description']) . '</div>';
              echo '<div class="price-cart-container">';
              echo '<button class="add-to-cart-btn" onclick="addToCartAndRedirect(\'' . htmlspecialchars($row['p_name']) . '\', ' . htmlspecialchars($row['price']) . ')">Add to Cart</button>';
              echo '<p class="product-price">Rs. ' . htmlspecialchars($row['price']) . '</p>';
              echo '</div>';
              echo '</div>'; // Close product-card
            }
          } else {
            echo "<p>No products found.</p>";
          }
          $conn->close();
          ?>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer0">
      <h1>Shopnpay</h1>
    </div>
    <div class="footer1">
      Connect with us at
      <div class="social-media">
        <a href="#">
          <ion-icon name="logo-facebook"></ion-icon>
        </a>
        <a href="#">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a>
        <a href="#">
          <ion-icon name="logo-youtube"></ion-icon>
        </a>
        <a href="#">
          <ion-icon name="logo-instagram"></ion-icon>
        </a>
        <a href="#">
          <ion-icon name="logo-twitter"></ion-icon>
        </a>
      </div>
    </div>
    <div class="footer2">
      <div class="product">
        <div class="heading-footer">Products</div>
        <div class="div">Women Clothing</div>
        <div class="div">Men Clothing</div>
        <div class="div">Accessories</div>
      </div>
      <div class="services">
        <div class="heading-footer">Customer Care</div>
        <div class="div">Return</div>
        <div class="div">Cash Back</div>
        <div class="div">Complaint</div>
        <div class="div">Others</div>
      </div>

      <div class="Get Help">
        <div class="heading-footer">Get Help</div>
        <div class="div">Help Center</div>
        <div class="div">Privacy Policy</div>
        <div class="div">Terms</div>
        <div class="div">Support</div>
      </div>
    </div>
    <div class="footer3">
      Copyright ©
      <h4>Shopnpay</h4>
      2024
    </div>
  </footer>
  <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
  <script src="./JS/cartscreen.js"></script>
  <script>
    // Function to handle adding items to cart and redirecting
    function addToCartAndRedirect(productName, price) {
      // Retrieve the current cart from local storage or initialize a new one if none exists
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Create a product object with name and price
      const product = {
        name: productName,
        price: price
      };

      // Add the new product to the cart array
      cart.push(product);

      // Update the cart in local storage with the new product added
      localStorage.setItem('cart', JSON.stringify(cart));

      // Optionally: Display a confirmation message
      alert('Product added to cart!');

      // Redirect the user to the cart page (ensure you have a 'cart.html' or appropriate URL)
      window.location.href = './checkoutscreen.html'; // Change this URL to where your cart page is located
    }
  </script>

  <script>
    // Function to toggle visibility of category sections
    function toggleCategory(category) {
      if (category === "women") {
        document.getElementById("womenClothingSection").style.display =
          "block";
        document.getElementById("menClothingSection").style.display = "none";
      } else if (category === "men") {
        document.getElementById("womenClothingSection").style.display =
          "none";
        document.getElementById("menClothingSection").style.display = "block";
      }
    }
  </script>
</body>

</html>