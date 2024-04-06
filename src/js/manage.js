class Manage {
  constructor() {
    this.manageLists = document.querySelector(".tm-manage");
    this.foodName = document.querySelector("#foodName");
    this.priceEle = document.querySelector("#price");
    this.description = document.querySelector("#description");
    this.image = document.querySelector("#image");
    this.foodPic = document.querySelector("#food-pic");
    this.manage_url = "http://localhost:3000/food";
    this.httpm = null;
    this.products = [];
    this.id = null;
    this.data = {};
    this.imageName = "";

    this.addEventListeners();
    this.fetchProducts();
  }

  addEventListeners() {
    document.querySelector(".add").addEventListener("click", () => {
      this.httpm = "POST";
      this.clearForm();
      this.openModal();
    });

    this.image.onchange = () => {
      this.foodPic.src = URL.createObjectURL(this.image.files[0]);
      this.imageName = this.image.files[0].name;
    };

    document.querySelector(".cancel").addEventListener("click", () => {
      this.closeModal();
    });

    document.querySelector(".save").addEventListener("click", () => {
      this.data.food_name = this.foodName.value;
      this.data.price = this.priceEle.value;
      this.data.description = this.description.value;
      this.data.image = `public/img/${this.imageName}`;

      if (this.httpm === "PUT" && this.id) {
        this.manage_url += `/${this.id}`;
      }

      fetch(this.manage_url, {
        method: this.httpm,
        body: JSON.stringify(this.data),
        headers: { "Content-type": "application/json" },
      })
        .then(() => {
          this.clearForm();
          this.closeModal();
          window.location.reload();
        })
        .catch((error) => console.error("Error:", error));
    });
  }

  openModal() {
    document.querySelector(".bg-modal").style.display = "block";
  }

  closeModal() {
    document.querySelector(".bg-modal").style.display = "none";
  }

  fetchProducts() {
    fetch(this.manage_url)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.displayMenu();
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }

  displayMenu() {
    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        const item = this.products[i];
        const manageList = document.createElement("div");
        manageList.dataset.id = item.id;
        manageList.className = "tm-list-item tm-black-bg";
        manageList.innerHTML = `
          <img src="../${item.image}" alt="Image" class="tm-list-item-img">
          <div class="tm-list-item-text">
              <h3 class="tm-list-item-name">${item.food_name}<span class="tm-list-item-price">$${item.price}</span></h3>
              <p>${item.description}</p>
              <button onclick="manage.editFood(event)" class="add-cart">Edit</button>
              <button onclick="manage.deleteFood(event)" class="add-cart">Delete</button>
          </div>
        `;
        this.manageLists.appendChild(manageList);
      }
    }
  }

  clearForm() {
    this.foodName.value = null;
    this.priceEle.value = null;
    this.description.value = null;
    this.image.value = null;
  }

  editFood(e) {
    this.openModal();
    this.httpm = "PUT";
    this.id = e.target.closest(".tm-list-item").dataset.id;
    let selectedFood = this.products.find((m) => m.id == this.id);
    if (selectedFood) {
      this.foodName.value = selectedFood.food_name;
      this.priceEle.value = selectedFood.price;
      this.description.value = selectedFood.description;
      this.foodPic.src = selectedFood.image;
      this.imageName = selectedFood.image.split("/").pop();
    }
  }

  deleteFood(e) {
    this.id = e.target.parentElement.parentElement.dataset.id;
    fetch(this.manage_url + "/" + this.id, { method: "DELETE" }).then(() => {
      window.location.reload();
    });
  }
}

// Usage
const manage = new Manage();
