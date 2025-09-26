async function loadStocks() {
  const res = await fetch("/api/stocks");
  const stocks = await res.json();
  const tbody = document.querySelector("#stocksTable tbody");
  tbody.innerHTML = "";

  stocks.forEach(stock => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.symbol}</td>
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td>${stock.change}</td>
      <td>${stock.volume}</td>
    `;
    tbody.appendChild(row);
  });
}

loadStocks();
setInterval(loadStocks, 60000); // يحدث كل دقيقة
