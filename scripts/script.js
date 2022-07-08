if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    var removeCartItemButtons=document.getElementsByClassName("btn-danger");
    console.log(removeCartItemButtons);

    for (var i=0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener("click",removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }

    var addToCart = document.getElementsByClassName("add-to-cart");
    for (var i=0; i<addToCart.length; i++){
        var button = addToCart[i];
        button.addEventListener("click",addToCartClicked)
    }

    var purchase = document.getElementById("purchase-Button").addEventListener("click",confirmPurchase);

}

function confirmPurchase(){
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartRows = document.getElementsByClassName("cart-row");
    if (cartRows.length == 0){
        alert("Cart is empty")
        return;
    }
    alert("Purchased Completed");
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName("card-title")[0].innerText;
    var price = shopItem.getElementsByClassName("card-text")[0].innerText;
    var image = shopItem.getElementsByClassName("card-img-top")[0].src;
    addItemToCart(title,price,image);
    updateCartTotal();
}

function addItemToCart(title,price,image){
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i=0; i<cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert("Item is already added into the cart");
            return;
        }
    }
    var cartRowItems = `
    <div class="item-pic-name">
        <img class="cart-item-image" src="${image}" width="75" height="100" alt="">
        <span class="cart-item-title">${title}</span>
    </div>
    <div>
        <span class="price">${price}</span>
    </div>
    <div>
        <input title="quantity" class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Remove</button>
    </div>`;
    cartRow.innerHTML = cartRowItems;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change",quantityChanged);
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value<=0){
        input.value = 1;
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price*quantity); 
        console.log(total)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total;
}