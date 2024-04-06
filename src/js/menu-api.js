class MenuAPI {
  constructor(menuUrl) {
    this.menuUrl = menuUrl;
    this.foodLists = document.querySelector(".tm-list");
    this.listCart = document.querySelector(".cart-display");
    this.iconCartSpan = document.querySelector(".tm-page-nav-item > span");
    this.cartEmpty = document.querySelector(".cart-empty");
    this.order = document.querySelector(".order");
    this.cart = [];

    this.getProduct();
    this.foodLists.addEventListener("click", this.handleAddToCart.bind(this));
    this.listCart.addEventListener(
      "click",
      this.handleCartQuantityChange.bind(this)
    );
  }

  async getProduct() {
    try {
      const response = await fetch(this.menuUrl);
      const data = await response.json();
      this.products = data;
      this.showMenu();
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
        this.addCartToHTML();
      }
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  showMenu() {
    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        const item = this.products[i];
        const foodList = document.createElement("div");
        foodList.dataset.id = item.id;
        foodList.className = "tm-list-item tm-black-bg";
        foodList.innerHTML = `
          <img src="../${item.image}" alt="Image" class="tm-list-item-img">
          <div class="tm-list-item-text">
            <h3 class="tm-list-item-name">${item.food_name}<span class="tm-list-item-price">$${item.price}</span></h3>
            <p>${item.description}</p>
            <button class="add-cart">Add to Cart</button>
          </div>
        `;
        this.foodLists.appendChild(foodList);
      }
    }
  }

  handleAddToCart(event) {
    let positionClick = event.target;
    if (positionClick.classList.contains("add-cart")) {
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      this.addToCart(product_id);
    }
  }

  addToCart(product_id) {
    let positionThisProductInCart = this.cart.findIndex(
      (value) => value.product_id == product_id
    );
    if (this.cart.length <= 0) {
      this.cart = [
        {
          product_id: product_id,
          quantity: 1,
        },
      ];
    } else if (positionThisProductInCart < 0) {
      this.cart.push({
        product_id: product_id,
        quantity: 1,
      });
    } else {
      this.cart[positionThisProductInCart].quantity += 1;
    }
    this.addCartToHTML();
    this.addCartToMemory();
  }

  handleCartQuantityChange(event) {
    let positionClick = event.target;
    if (
      positionClick.classList.contains("minus") ||
      positionClick.classList.contains("plus")
    ) {
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = positionClick.classList.contains("plus") ? "plus" : "minus";
      this.changeQuantityCart(product_id, type);
    }
  }

  changeQuantityCart(product_id, type) {
    let positionItemInCart = this.cart.findIndex(
      (value) => value.product_id == product_id
    );
    if (positionItemInCart >= 0) {
      switch (type) {
        case "plus":
          this.cart[positionItemInCart].quantity += 1;
          break;
        case "minus":
          let changeQuantity = this.cart[positionItemInCart].quantity - 1;
          if (changeQuantity > 0) {
            this.cart[positionItemInCart].quantity = changeQuantity;
          } else {
            this.cart.splice(positionItemInCart, 1);
          }
          break;
      }
    }
    this.addCartToHTML();
    this.addCartToMemory();
  }

  addCartToHTML() {
    this.listCart.innerHTML = "";
    let totalQuantity = 0;
    if (this.cart.length > 0) {
      this.cart.forEach((item) => {
        totalQuantity += item.quantity;
        let cartItem = document.createElement("div");
        cartItem.className = "tm-black-bg tm-special-item";
        cartItem.dataset.id = item.product_id;

        let positionProduct = this.products.findIndex(
          (value) => value.id == item.product_id
        );
        let info = this.products[positionProduct];
        cartItem.innerHTML = `
          <img src="../${info.image}" alt="Image" class="tm-list-item-img"/>
          <h2 class="tm-special-item-title">
            ${info.food_name}
          </h2>
          <h2 class"tm-text-primary tm-special-item-title">
            $${info.price * item.quantity}
          </h2>
          <div class="tm-special-item-title">
            <i class="fa-solid fa-minus minus"></i>
            <span class="tm-text-primary">${item.quantity}</span>
            <i class="fa-solid fa-plus plus"></i>
          </div>
        `;
        this.listCart.appendChild(cartItem);
      });
    }
    this.iconCartSpan.innerText = totalQuantity;
    if (this.cart.length === 0) {
      this.cartEmpty.style.display = "block";
      this.order.style.display = "none";
      this.iconCartSpan.style.display = "none";
    } else {
      this.cartEmpty.style.display = "none";
      this.order.style.display = "block";
      this.iconCartSpan.style.display = "flex";
    }
  }

  addCartToMemory() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

const menu_url = "http://localhost:3000/food";
const menuAPI = new MenuAPI(menu_url);
