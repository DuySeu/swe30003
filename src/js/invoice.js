class Invoice {
  constructor() {
    this.latestInvoice = {};
    this.invoiceProduct = document.querySelector(".invoiceProduct");

    this.getInvoice();
  }

  displayInvoice() {
    console.log(this.latestInvoice);
    document.querySelector(
      ".user-invoice-1"
    ).innerHTML = `Invoice #: ${this.latestInvoice.id}<br />
                    Date: ${this.latestInvoice.timestamp}
                    `;
    document.querySelector(
      ".user-invoice-2"
    ).innerHTML = `Address: ${this.latestInvoice.address}<br />
                 Postcode: ${this.latestInvoice.postcode}
                    `;
    document.querySelector(
      ".user-invoice-3"
    ).innerHTML = `${this.latestInvoice.name}<br />
                    ${this.latestInvoice.email}<br />
                    ${this.latestInvoice.number}
                    `;
    let totalPrice = 0;

    if (this.latestInvoice.shopping_cart.length > 0) {
      this.latestInvoice.shopping_cart.forEach((item) => {
        const row = document.createElement("tr");
        row.className = "item";
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");

        cell1.innerHTML = `${item.food_name} (${item.quantity})`;
        cell2.innerHTML = `$${(item.price * item.quantity).toFixed(2)}`;

        row.appendChild(cell1);
        row.appendChild(cell2);

        this.invoiceProduct.parentNode.insertBefore(
          row,
          this.invoiceProduct.nextSibling
        );

        totalPrice += item.price * item.quantity;
      });

      document.querySelector(
        ".total td:last-child"
      ).textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
  }

  getInvoice() {
    fetch("http://localhost:3000/invoice")
      .then((response) => response.json())
      .then((data) => {
        const invoice = data;
        this.latestInvoice = invoice[invoice.length - 1];
        this.displayInvoice();
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }
}

// Usage
const invoice = new Invoice();
