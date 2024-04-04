class Receipt {
  constructor() {
    this.listProduct = document.querySelector(".product-display");
    this.createInvoice = document.querySelector(".bill");
    this.fullname = document.querySelector(".fullname");
    this.address = document.querySelector(".address");
    this.number = document.querySelector(".number");
    this.email = document.querySelector(".email");
    this.postcode = document.querySelector(".postcode");
    this.menu_url = "http://localhost:3000/food";
    this.cart = [];
    this.products = [];
    this.totalPrice = 0;

    this.createInvoice.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        this.fullname.value === "" ||
        this.address.value === "" ||
        this.number.value === "" ||
        this.email.value === "" ||
        this.postcode.value === ""
      ) {
        alert("Please enter the receipt form");
      } else {
        const formattedDate = this.formatDate(new Date());
        const invoice = {
          name: this.fullname.value,
          address: this.address.value,
          number: this.number.value,
          email: this.email.value,
          postcode: this.postcode.value,
          timestamp: formattedDate,
          shopping_cart: this.cart.map((item) => ({
            food_name: this.products.find(
              (product) => product.id === item.product_id
            ).food_name,
            price: this.products.find(
              (product) => product.id === item.product_id
            ).price,
            quantity: item.quantity,
          })),
        };
        fetch("http://localhost:3000/invoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoice),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.location.href = "invoice.html";
          });
      }
    });

    this.getBill();
  }

  formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  updateTotalBill() {
    document.querySelector(
      ".total-bill"
    ).textContent = `Total Bill: $${this.totalPrice.toFixed(2)}`;
  }

  createProductItem(item) {
    const productItem = document.createElement("div");
    productItem.className = "tm-black-bg tm-special-item";
    productItem.dataset.id = item.product_id;
    const positionProduct = this.products.findIndex(
      (value) => value.id == item.product_id
    );
    const billInfo = this.products[positionProduct];
    productItem.innerHTML = `
      <img src="../${billInfo.image}" alt="Image" class="tm-list-item-img"/>
      <h2 class="tm-special-item-title">${billInfo.food_name}</h2>
      <h2 class="tm-text-primary tm-special-item-title">$${
        billInfo.price * item.quantity
      }</h2>
    `;
    this.listProduct.appendChild(productItem);
  }

  bill() {
    this.listProduct.innerHTML = "";
    let totalQuantity = 0;
    this.totalPrice = 0;

    if (this.cart.length > 0) {
      this.cart.forEach((item) => {
        totalQuantity += item.quantity;
        this.createProductItem(item);

        const positionProduct = this.products.findIndex(
          (value) => value.id == item.product_id
        );
        const billInfo = this.products[positionProduct];
        this.totalPrice += billInfo.price * item.quantity;
      });
    }

    this.updateTotalBill();
  }

  getBill() {
    fetch(this.menu_url)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.bill();
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }
}

// Usage
const receipt = new Receipt();
