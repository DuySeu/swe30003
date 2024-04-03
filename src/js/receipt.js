let listProduct = document.querySelector(".product-display");
const createInvoice = document.querySelector(".bill");
var fullname = document.querySelector(".fullname");
var address = document.querySelector(".address");
var number = document.querySelector(".number");
var email = document.querySelector(".email");
var postcode = document.querySelector(".postcode");
let menu_url = "http://localhost:3000/food";
let cart = [];

const bill = () => {
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
      let billInfo = products[positionProduct];
      // console.log(item);
      productItem.innerHTML = `
            <img src="../${
              billInfo.image
            }" alt="Image" class="tm-list-item-img"/>
            <h2 class="tm-special-item-title">
              ${billInfo.food_name}
            </h2>
            <h2 class="tm-text-primary tm-special-item-title">
              $${billInfo.price * item.quantity}
            </h2>
            `;
      listProduct.appendChild(productItem);

      totalPrice += billInfo.price * item.quantity; // Calculate total price
    });
  }

  // Update the total-bill element with the total price
  document.querySelector(
    ".total-bill"
  ).textContent = `Total Bill: $${totalPrice.toFixed(2)}`;
};

createInvoice.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fullname.value == "" ||
    address.value == "" ||
    number.value == "" ||
    email.value == "" ||
    postcode.value == ""
  ) {
    alert("Please enter the receipt form");
  } else {
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const formattedDate = formatDate(new Date());
    const invoice = {
      name: fullname.value,
      address: address.value,
      number: number.value,
      email: email.value,
      postcode: postcode.value,
      timestamp: formattedDate,
      shopping_cart: cart,
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

const getBill = () => {
  // get data product
  fetch(menu_url)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      // get data cart from memory
      cart = JSON.parse(localStorage.getItem("cart"));
      bill();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};
getBill();
