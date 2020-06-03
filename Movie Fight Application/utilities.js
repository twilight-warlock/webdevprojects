// Debouncing an input -> waiting for sometime after the last event to do something
function debounce(func, delay = 1000) {
  let timeOutID;
  return (...args) => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
    timeOutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
