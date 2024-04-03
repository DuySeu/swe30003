let latestInvoice = [];

const displayInvoice = () => {
  console.log(latestInvoice);
  document.querySelector(
    ".user-invoice-1"
  ).innerHTML = `Invoice #: ${latestInvoice.id}<br />
                    Date: ${latestInvoice.timestamp}
                    `;
  document.querySelector(
    ".user-invoice-2"
  ).innerHTML = `Address: ${latestInvoice.address}<br />
                 Postcode: ${latestInvoice.postcode}
                    `;
  document.querySelector(
    ".user-invoice-3"
  ).innerHTML = `${latestInvoice.name}<br />
                    ${latestInvoice.email}<br />
                    ${latestInvoice.number}
                    `;
  let totalPrice = 0; // Initialize total price
  if (latestInvoice.shopping_cart.length > 0) {
    latestInvoice.shopping_cart.forEach((item) => {
      // Create a new row and cells for the item
      let row = document.createElement("tr");
      row.className = "item";
      let cell1 = document.createElement("td");
      let cell2 = document.createElement("td");

      cell1.innerHTML = `${item.food_name} (${item.quantity})`;
      cell2.innerHTML = `$${(item.price * item.quantity).toFixed(2)}`;

      // Append cells to the row
      row.appendChild(cell1);
      row.appendChild(cell2);

      const invoiceProduct = document.querySelector(".invoiceProduct");
      invoiceProduct.parentNode.insertBefore(row, invoiceProduct.nextSibling);

      totalPrice += item.price * item.quantity; // Calculate total price
    });

    // Update the total price
    document.querySelector(
      ".total td:last-child"
    ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
};

const getInvoice = () => {
  // get data invoice
  fetch("http://localhost:3000/invoice")
    .then((response) => response.json())
    .then((data) => {
      invoice = data;
      // console.log(invoice);
      latestInvoice = invoice[invoice.length - 1];
      displayInvoice();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};
getInvoice();
