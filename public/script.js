async function fetchAramco() {
    try {
        const res = await fetch('/api/aramco');
        const data = await res.json();
        const tbody = document.querySelector('#stock-table tbody');
        tbody.innerHTML = `
            <tr>
                <td>${data.name || 'N/A'}</td>
                <td>${data.symbol || 'N/A'}</td>
                <td>${data.price || 'N/A'}</td>
                <td>${data.percent || 'N/A'}</td>
                <td>${data.signal || 'N/A'}</td>
            </tr>
        `;
    } catch (err) {
        console.error(err);
    }
}

// تحديث كل 30 ثانية
fetchAramco();
setInterval(fetchAramco, 30000);
