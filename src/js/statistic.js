class Statistic {
  constructor() {
    this.quantity = [];
    this.product_name = [];
    this.barColors = [];
    this.quantityPerFood = {};
    this.chartElement = document.getElementById("myStatistic");

    this.getInvoice();
  }

  displayStatistic() {
    this.products.forEach((item) => {
      this.product_name.push(item.food_name);
      this.quantityPerFood[item.food_name] = 0;
    });

    this.invoice.forEach((item) => {
      item.shopping_cart.forEach((cartItem) => {
        const { food_name, quantity } = cartItem;
        this.quantityPerFood[food_name] += quantity;
      });
    });

    this.quantity = Object.values(this.quantityPerFood);

    for (let i = 0; i < this.product_name.length; i++) {
      this.barColors.push(
        `rgb(${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)})`
      );
    }

    new Chart(this.chartElement, {
      type: "bar",
      data: {
        labels: this.product_name,
        datasets: [
          {
            backgroundColor: this.barColors,
            data: this.quantity,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Sale of Healthy Foods Store",
        },
      },
    });
  }

  getInvoice() {
    const fetch1 = fetch("http://localhost:3000/invoice").then((response) =>
      response.json()
    );
    const fetch2 = fetch("http://localhost:3000/food").then((response) =>
      response.json()
    );

    Promise.all([fetch1, fetch2])
      .then(([data1, data2]) => {
        this.invoice = data1;
        this.products = data2;
        this.displayStatistic();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

// Usage
const statistic = new Statistic();
