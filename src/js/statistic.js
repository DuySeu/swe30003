let quantity = [];
let product_name = [];
const barColors = ["red", "green", "blue", "orange", "brown"];
let totalQuantity = 0;

const displayStatistic = () => {
    products.forEach((item) => {
        product_name.push(item.food_name);
    });
    console.log(product_name);
    invoice.forEach(item => {
        quantity.push(...item.shopping_cart.map(cartItem => {
            // console.log(cartItem);
            if (product_name.includes(cartItem.food_name)) {
                totalQuantity += cartItem.quantity;
            }
        }));
    });
    console.log(quantity);

//   new Chart("myStatistic", {
//     type: "bar",
//     data: {
//       labels: product_name,
//       datasets: [
//         {
//           backgroundColor: barColors,
//           data: yValues,
//         },
//       ],
//     },
//     options: {
//       legend: { display: false },
//       title: {
//         display: true,
//       },
//     },
//   });
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
