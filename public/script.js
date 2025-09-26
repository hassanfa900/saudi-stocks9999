const INTERVAL_SECONDS = 30; // معدل التحديث

async function fetchAramco() {
  try {
    const res = await fetch('/api/aramco');
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchAramco error:', err);
    return null;
  }
}

function render(data) {
  if (!data) return;
  document.getElementById('name').innerText = data.name || '—';
  document.getElementById('symbol').innerText = data.symbol || '—';
  document.getElementById('ts').innerText = new Date(data.timestamp || Date.now()).toLocaleString();

  document.getElementById('price').innerText = data.price ?? '—';
  document.getElementById('change').innerText = data.change ?? '—';
  document.getElementById('percent').innerText = data.percent_change ?? '—';
  document.getElementById('volume').innerText = data.volume ?? '—';

  // إشارة مبسطة: دخول إذا النسبة >= 0، وإلا خروج
  const pct = parseFloat((data.percent_change || '').toString().replace('%','')) || parseFloat(data.percent_change) || 0;
  const signalEl = document.getElementById('signal');
  if (pct >= 0) {
    signalEl.innerText = '✅ دخول';
    signalEl.className = 'ok';
  } else {
    signalEl.innerText = '❌ خروج';
    signalEl.className = 'warn';
  }
}

async function updateLoop() {
  const data = await fetchAramco();
  render(data);
}

// initial load
updateLoop();

// set interval
setInterval(updateLoop, INTERVAL_SECONDS * 1000);
document.getElementById('interval').innerText = INTERVAL_SECONDS;
