async function fetchAramco() {
    try {
        const res = await fetch('/api/aramco');
        const data = await res.json();
        const tbody = document.querySelector('#stock-table tbody');

        tbody.innerHTML = `
            <tr>
                <td>${data.name}</td>
                <td>${data.symbol}</td>
                <td>${data.price}</td>
                <td>${data.change}</td>
                <td>${data.percent}</td>
                <td>${data.volume}</td>
                <td>${data.signal}</td>
            </tr>
        `;
    } catch (err) {
        console.error(err);
    }
}

// تحديث كل 30 ثانية
fetchAramco();
setInterval(fetchAramco, 30000);
