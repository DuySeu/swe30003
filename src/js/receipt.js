let listProduct = document.querySelector(".product-display");
let menu_url = "http://localhost:3000/food";
let cart = [];

const addCartToHTML = () => {
  listProduct.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0; // Initialize total price
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let productItem = document.createElement("div");
      productItem.className = "tm-black-bg tm-special-item";
      productItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      console.log(item);
      productItem.innerHTML = `
            <img src="../${info.image}" alt="Image" class="tm-list-item-img"/>
            <h2 class="tm-special-item-title">
              ${info.food_name}
            </h2>
            <h2 class="tm-text-primary tm-special-item-title">
              $${info.price * item.quantity}
            </h2>
            <div class="tm-special-item-title">
              <i class="fa-solid fa-minus minus"></i>
              <span class="tm-text-primary">${item.quantity}</span>
              <i class="fa-solid fa-plus plus"></i>
            </div>
            `;
      listProduct.appendChild(productItem);

      totalPrice += info.price * item.quantity; // Calculate total price
    });
  }

  // Update the total-bill element with the total price
  document.querySelector(
    ".total-bill"
  ).textContent = `Total Bill: $${totalPrice.toFixed(2)}`;
};

listProduct.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    // console.log(product_id);
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let qtyInfo = cart[positionItemInCart];
    switch (type) {
      case "plus":
        qtyInfo.quantity = qtyInfo.quantity + 1;
        break;

      default:
        let changeQuantity = qtyInfo.quantity - 1;
        if (changeQuantity > 0) {
          qtyInfo.quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch(menu_url)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      // get data cart from memory
      cart = JSON.parse(localStorage.getItem("cart"));
      addCartToHTML();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};
initApp();