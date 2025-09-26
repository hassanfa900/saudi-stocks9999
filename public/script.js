fetch('/api/stocks')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('stocks-table');
    data.forEach(stock => {
      const row = table.insertRow();
      row.insertCell(0).innerText = stock.name;
      row.insertCell(1).innerText = stock.symbol;
      row.insertCell(2).innerText = stock.price;
      row.insertCell(3).innerText = stock.entry + '%';
      row.insertCell(4).innerText = stock.signal;
    });
  });
