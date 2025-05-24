export function debounce(func, delay = 3000) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function logAction(action, size) {
  console.log(action);
  console.log(`Clients amount: ${size}`);
}

