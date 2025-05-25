import 'dotenv/config';

export function debounce(func, delay = 3000) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
      console.log(`Function executed after ${delay}ms delay`);
    }, delay);
  };
}

export function logAction(action, size) {
  console.log(action);
  console.log(`Clients amount: ${size}`);
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
      ...options.headers,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

  return res;
}
