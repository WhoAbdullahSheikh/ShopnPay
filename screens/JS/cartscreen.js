function addToCart(itemName, price) {
  
  var newItem = document.createElement("li");
  newItem.textContent = itemName + " - Rs. " + price;

  var cartItems = document.getElementById("cart-items");
  cartItems.appendChild(newItem);
}

var addToCartButtons = document.querySelectorAll(".card button");


addToCartButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {

    var card = event.target.closest(".card");


    var itemName = card.querySelector("h3").textContent;
    var price = card.querySelector(".price").textContent;

    addToCart(itemName, price);

   
  });
});
