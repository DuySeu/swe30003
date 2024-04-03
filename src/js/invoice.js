let latestInvoice = [];

const displayInvoice = () => {
  document.querySelector(
    ".user-invoice-1"
  ).innerHTML = `Invoice #: ${latestInvoice.id}<br />
                    Date: 
                    `;
  document.querySelector(
    ".user-invoice-2"
  ).innerHTML = `${latestInvoice.address}<br />
                    ${latestInvoice.postcode}
                    `;
  document.querySelector(
    ".user-invoice-3"
  ).innerHTML = `${latestInvoice.name}<br />
                    ${latestInvoice.email}<br />
                    ${latestInvoice.number}
                    `;
  //   invoiceProduct.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0; // Initialize total price
  if (latestInvoice.shopping_cart.length > 0) {
    const table = document.querySelector(".invoice-box table"); // Select the table
    latestInvoice.shopping_cart.forEach((item) => {
      totalQuantity += item.quantity;
      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let ivInfo = products[positionProduct];

      // Create a new row and cells for the item
      let row = document.createElement("tr");
      row.className = "item";
      let cell1 = document.createElement("td");
      let cell2 = document.createElement("td");

      cell1.innerHTML = `${ivInfo.food_name} (${item.quantity})`;
      cell2.innerHTML = `$${(ivInfo.price * item.quantity).toFixed(2)}`;

      // Append cells to the row
      row.appendChild(cell1);
      row.appendChild(cell2);

      const invoiceProduct = document.querySelector(".invoiceProduct");
      invoiceProduct.parentNode.insertBefore(row, invoiceProduct.nextSibling);

      totalPrice += ivInfo.price * item.quantity; // Calculate total price
    });

    // Update the total price
    document.querySelector(
      ".total td:last-child"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
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
      // Process data1 and data2 as needed
      // console.log("Data from Invoice:", data1);
      // console.log("Data from Food:", data2);
      invoice = data1;
      products = data2;
      latestInvoice = invoice[invoice.length - 1];
      displayInvoice();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
getInvoice();
