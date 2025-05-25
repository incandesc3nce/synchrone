export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number = 1000
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(args);
    }, delay);
  };
};
