async function loadAramco() {
  try {
    const response = await fetch("/api/aramco");
    const data = await response.json();

    const tbody = document.querySelector("#aramcoTable tbody");
    tbody.innerHTML = "";

    const row = `
      <tr>
        <td>${data.name}</td>
        <td>${data.symbol}</td>
        <td>${data.price}</td>
        <td>${data.change}</td>
        <td>${data.percent}</td>
        <td>${data.signal}</td>
      </tr>
    `;
    tbody.innerHTML = row;

  } catch (err) {
    console.error("❌ خطأ في تحميل البيانات:", err);
  }
}

loadAramco();
