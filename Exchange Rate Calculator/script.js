const currency1 = document.querySelector("#currency1");
const currency2 = document.querySelector("#currency2");
const amt1 = document.querySelector("#amt1");
const amt2 = document.querySelector("#amt2");
const rateEl = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// --------------------Functions-------------------
function calculate() {
  var cur1 = currency1.value;
  var cur2 = currency2.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${cur1}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[cur2];
      rateEl.innerText = `1 ${cur1} = ${rate} ${cur2}`;
      amt2.value = (amt1.value * rate).toFixed(2);
    });
}
function swapCurrency() {
  var cur2 = currency1.value;
  var cur1 = currency2.value;
  var swap = currency1.value;
  currency1.value = currency2.value;
  currency2.value = swap;
  calculate();
}

// -----------------Event Listeners----------------
currency1.addEventListener("change", calculate);
currency2.addEventListener("change", calculate);
amt1.addEventListener("input", calculate);
amt2.addEventListener("input", calculate);
swap.addEventListener("click", swapCurrency);

calculate();
