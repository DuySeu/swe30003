let foodLists = document.querySelector(".tm-list");
let listCart = document.querySelector(".cart-display");
let iconCartSpan = document.querySelector(".tm-page-nav-item > span");
let cart = [];
let cartEmpty = document.querySelector(".cart-empty");
let order = document.querySelector(".order");
let menu_url = "http://localhost:3000/food";

const showMenu = () => {
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      // console.log(item);
      const foodList = document.createElement("div");
      foodList.dataset.id = item.id;
      foodList.className = "tm-list-item tm-black-bg";
      foodList.innerHTML = `
          <img src="${item.image}" alt="Image" class="tm-list-item-img">
          <div class="tm-list-item-text">
            <h3 class="tm-list-item-name">${item.food_name}<span class="tm-list-item-price">$${item.price}</span></h3>
            <p>${item.description}</p>
            <button class="add-cart">Add to Cart</button>
          </div>
                            `;
      foodLists.appendChild(foodList);
    }
  }
};

foodLists.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("add-cart")) {
    let id_product = positionClick.parentElement.parentElement.dataset.id;
    addToCart(id_product);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
  // console.log(cart);
};

const addCartToHTML = () => {
  listCart.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let cartItem = document.createElement("div");
      cartItem.className = "tm-black-bg tm-special-item";
      cartItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      cartItem.innerHTML = `
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
      listCart.appendChild(cartItem);
    });
  }
  iconCartSpan.innerText = totalQuantity;
  if (cart.length === 0) {
    cartEmpty.style.display = "block"; // Show the <p> element
    order.style.display = "none"; // Hide the <a> element
  } else {
    cartEmpty.style.display = "none"; // Hide the <p> element
    order.style.display = "block"; // Show the <a> element
  }
};

listCart.addEventListener("click", (event) => {
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
          info.quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initApp = () => {
  // get data product
  fetch(menu_url)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showMenu();
      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};
initApp();
