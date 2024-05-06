<?php
session_start(); // Start the session to access session variables
if (isset($_SESSION['email']) && $_SESSION['email'] === 'admin@wonderland.com') {
  $showProfileIcon = true;
} else {
  $showProfileIcon = false;
}


?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wonderland</title>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="./home.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" />
  <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
</head>

<body>
  <header>
    <div class="logo"><a href="#">Wonderland</a></div>

    <div class="heading">
      <ul>
        <li><a href="home.php" class="under">HOME</a></li>
        <li><a href="./screens/shopscreen.php" class="under">SHOP</a></li>
        <li>
          <a href="screens/loginscreen.php" class="under">LOGIN/REGISTER</a>
        </li>
        <li><a href="./screens/about.html" class="under">ABOUT US</a></li>
        <?php if ($showProfileIcon) : ?>
          <li>
            <a href="./admin/adminprofile.php" class="under">
              ADMIN
            </a>
          </li>
        <?php endif; ?>
        
        <?php if (isset($_SESSION['email']) && $_SESSION['email'] !== 'admin@wonderland.com') : ?>
          <li>
            <a href="./screens/profilescreen.php"><i class="fa fa-user" style="font-size: 20px; color: white"></i></a>
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
          <li><a href="home.html" class="under">HOME</a></li>
          <li><a href="#" class="under">SHOP</a></li>
          <li><a href="#" class="under">OUR PRODUCTS</a></li>
          <li>
            <a href="screens/loginscreen.php" class="under">LOGIN/REGISTER</a>
          </li>
          <li><a href="#" class="under">ABOUT US</a></li>
        </ul>
      </div>
    </div>
  </header>
  <section>
    <div class="section">
      <div class="section1">
        <div class="slideshow-container">
          <div class="mySlides fade">
            <img src="./collection/banners/Made_for_comfort.webp" style="width: 100%" alt="" />
          </div>
          <div class="mySlides fade">
            <img src="./collection/banners/Made_for_comfort.webp" style="width: 100%" alt="" />
          </div>
          <div class="mySlides fade">
            <img src="./collection/banners/Made_for_comfort.webp" style="width: 100%" alt="" />
          </div>

          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <br />

        <!-- The dots/circles -->
        <div style="text-align: center">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
        </div>
      </div>

      <div class="section-break">
        <hr />
      </div>
      <div class="category-heading">
        <h1>Clothing Categories</h1>
      </div>
      <div class="section2">
        <div class="container">
          <div class="circle-card" id="men-card">
            <div class="circle-image">
              <img src="./collection/men/6cd89aa0a4f5332635198f49b1d8a453.jpg" alt="" />
              <br />
              <br />
              <p>Men</p>
            </div>
          </div>
          <div class="circle-card" id="women-card">
            <div class="circle-image">
              <img src="./collection/women/MF-114.jpg" alt="" />
              <br />
              <br />
              <p>Women</p>
            </div>
          </div>
          <div class="circle-card" id="kids-card">
            <div class="circle-image">
              <img src="./collection/kid/KT-1066.jpg" alt="" />
              <br />
              <br />
              <p>Kids</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer>
    <div class="footer0">
      <h1>Wonderland</h1>
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
      <h4>Wonderland</h4>
      2024
    </div>
  </footer>
  <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
  <script src="./home.js"></script>
  <script>
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
      showSlides((slideIndex += n));
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides((slideIndex = n));
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  </script>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Get references to the cards
      const womenCard = document.getElementById("women-card");
      const menCard = document.getElementById("men-card");
      const kidsCard = document.getElementById("kids-card");

      // Add click event listeners to each card
      womenCard.addEventListener("click", function() {
        window.location.href = "./screens/shopscreen.php";
      });

      menCard.addEventListener("click", function() {
        window.location.href = "./screens/shopscreen.php";
      });

      kidsCard.addEventListener("click", function() {
        window.location.href = "./screens/shopscreen.php";
      });
    });
  </script>
</body>

</html>