let quantity = [];
let product_name = [];
let barColors = [];
let quantityPerFood = {};

const displayStatistic = () => {
  products.forEach((item) => {
    product_name.push(item.food_name);
    quantityPerFood[item.food_name] = 0;
  });
  // console.log(product_name);

  invoice.forEach((item) => {
    item.shopping_cart.forEach((cartItem) => {
      const { food_name, quantity } = cartItem;
      quantityPerFood[food_name] += quantity;
    });
  });

  // Convert the object to an array
  quantity = Object.values(quantityPerFood);
  // console.log(quantity);

  for (let i = 0; i < product_name.length; i++) {
    barColors.push(
      `rgb(${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)}, 
        ${Math.floor(Math.random() * 255)})`
    );
  }
  // console.log(barColors);

  new Chart("myStatistic", {
    type: "bar",
    data: {
      labels: product_name,
      datasets: [
        {
          backgroundColor: barColors,
          data: quantity,
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
};

const getInvoice = () => {
  const fetch1 = fetch("http://localhost:3000/invoice").then((response) =>
    response.json()
  );
  const fetch2 = fetch("http://localhost:3000/food").then((response) =>
    response.json()
  );
  Promise.all([fetch1, fetch2])
    .then(([data1, data2]) => {
      invoice = data1;
      products = data2;
      displayStatistic();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
getInvoice();
