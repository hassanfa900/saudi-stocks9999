fetch('/api/aramco')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('stock-data');
    tbody.innerHTML = `
      <tr>
        <td>${data.name}</td>
        <td>${data.symbol}</td>
        <td>${data.price}</td>
        <td>${data.change}</td>
        <td>${data.volume}</td>
        <td>${data.ema9.toFixed(2)}</td>
        <td>${data.ema20.toFixed(2)}</td>
        <td>${data.rsi}</td>
        <td>${data.macdSignal}</td>
        <td>${data.mfi}</td>
        <td>${data.entrySignal}</td>
      </tr>
    `;
  })
  .catch(err => console.error(err));
