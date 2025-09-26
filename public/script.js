async function fetchStocks() {
  try {
    const response = await fetch("/api/stocks");
    const data = await response.json();

    const tbody = document.querySelector("#stocksTable tbody");
    tbody.innerHTML = "";

    for (let symbol in data) {
      if (data[symbol].symbol) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${data[symbol].symbol}</td>
          <td>${data[symbol].name}</td>
          <td>${data[symbol].price}</td>
          <td>${data[symbol].change}</td>
        `;
        tbody.appendChild(row);
      }
    }
  } catch (err) {
    console.error("❌ خطأ في جلب البيانات:", err);
  }
}

fetchStocks();
