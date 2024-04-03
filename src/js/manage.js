let manageLists = document.querySelector(".tm-manage");
let foodName = document.querySelector("#foodName");
let priceEle = document.querySelector("#price");
let description = document.querySelector("#description");
let image = document.querySelector("#image");
let foodPic = document.querySelector("#food-pic");

let manage_url = "http://localhost:3000/food";
let httpm = null;
let products = [];
let id = null;
let data = {};
let imageName = "";

function openModal() {
  document.querySelector(".bg-modal").style.display = "block";
}
function closeModal() {
  document.querySelector(".bg-modal").style.display = "none";
}

document.querySelector(".add").addEventListener("click", function () {
  httpm = "POST";
  clearForm();
  openModal();
});

image.onchange = function () {
  foodPic.src = URL.createObjectURL(image.files[0]);
  imageName = image.files[0].name;
};

function displayMenu() {
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      //   console.log(item);
      const manageList = document.createElement("div");
      manageList.dataset.id = item.id;
      manageList.className = "tm-list-item tm-black-bg";
      manageList.innerHTML = `
            <img src="${item.image}" alt="Image" class="tm-list-item-img">
            <div class="tm-list-item-text">
                <h3 class="tm-list-item-name">${item.food_name}<span class="tm-list-item-price">$${item.price}</span></h3>
                <p>${item.description}</p>
                <button onclick="editFood(event)" class="add-cart">Edit</button>
                <button onclick="deleteFood(event)" class="add-cart">Delete</button>
            </div>
                            `;
      manageLists.appendChild(manageList);
    }
  }
}

document.querySelector(".cancel").addEventListener("click", function () {
  closeModal();
});

document.querySelector(".save").addEventListener("click", function () {
  data.food_name = foodName.value;
  data.price = priceEle.value;
  data.description = description.value;
  data.image = `../public/img/${imageName}`;
  // console.log(foodName.value);
  if (httpm === "PUT" && id) {
    manage_url += `/${id}`; // Append the ID to the URL for PUT requests
  }

  fetch(manage_url, {
    method: httpm,
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  })
    .then(() => {
      clearForm();
      closeModal();
      window.location.reload();
    })
    .catch((error) => console.error("Error:", error));
});

function clearForm() {
  foodName.value = null;
  priceEle.value = null;
  description.value = null;
  image.value = null;
}

function editFood(e) {
  openModal();
  httpm = "PUT";
  id = e.target.closest(".tm-list-item").dataset.id; // Improved target selection
  let selectedFood = products.find((m) => m.id == id); // Simplified to use .find
  console.log(selectedFood);
  if (selectedFood) {
    // Check if selectedFood is not undefined
    foodName.value = selectedFood.food_name;
    priceEle.value = selectedFood.price;
    description.value = selectedFood.description;
    foodPic.src = selectedFood.image;
    imageName = selectedFood.image.split("/").pop(); // Extract imageName from the image path
    console.log(imageName);
  }
}

function deleteFood(e) {
  console.log(e.target.parentElement.parentElement.dataset.id);
  id = e.target.parentElement.parentElement.dataset.id;
  fetch(menu_url + "/" + id, { method: "DELETE" }).then(() => {
    window.location.reload();
  });
}

const manageProduct = () => {
  // get data product
  fetch(manage_url)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      //   console.log(products);
      displayMenu();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};
manageProduct();
