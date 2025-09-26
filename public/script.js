async function loadAramco() {
  try {
    const response = await fetch("/api/aramco");
    const data = await response.json();

    const tbody = document.querySelector("#aramcoTable tbody");
    tbody.innerHTML = "";

    // حساب إشارة مبسطة: إذا التغير إيجابي → دخول، إذا سلبي → خروج
    const signal = parseFloat(data.change) > 0 ? "✅ دخول" : "❌ خروج";

    const row = `
      <tr>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.change}</td>
        <td>${data.percent}</td>
        <td>${signal}</td>
      </tr>
    `;
    tbody.innerHTML = row;

  } catch (err) {
    console.error("❌ خطأ في تحميل البيانات:", err);
  }
}

loadAramco();
