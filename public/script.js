fetch('/api/stocks')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('stocks-table').querySelector('tbody');
    table.innerHTML = "";

    data.forEach(stock => {
      const row = table.insertRow();
      row.insertCell(0).innerText = stock.name;
      row.insertCell(1).innerText = stock.symbol;
      row.insertCell(2).innerText = stock.price;
      row.insertCell(3).innerText = stock.change + '%';
      row.insertCell(4).innerText = stock.volume;

      // إشارة دخول/خروج بناءً على التغير
      const signal = (stock.change >= 0 ? "✅ دخول" : "❌ خروج");
      row.insertCell(5).innerText = signal;
    });
  })
  .catch(err => console.error("Error:", err));
