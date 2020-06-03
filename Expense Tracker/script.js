const balance = document.getElementById("balance");
const income = document.getElementById("moneyPlus");
const expense = document.getElementById("moneyMinus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "salary", amount: 100000 },
//   { id: 2, text: "bouquet", amount: -500 },
//   { id: 3, text: "food", amount: -1500 },
//   { id: 4, text: "shares", amount: 2000 }
// ];
const savingStorage = JSON.parse(localStorage.getItem("transactions"));

let transaction =
  localStorage.getItem("transactions") !== null ? savingStorage : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please fill the text and amount");
  } else {
    const trans = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    };
    transaction.push(trans);

    console.log(transaction);
    addTransactionsToDOM(trans);
    updatingMoney();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generating random Ids
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function addTransactionsToDOM(transaction) {
  const sign = transaction.amount >= 0 ? "+" : "-";
  const item = document.createElement("li");
  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
`;
  list.appendChild(item);
}

// Updating Balance,Income & Expense
function updatingMoney() {
  const amounts = transaction.map(trans => trans.amount);
  const total = amounts.reduce((sum, num) => (sum += num), 0).toFixed(2);
  balance.innerText = `${total}`;

  const plus = amounts
    .filter(item => item >= 0)
    .reduce((sum, num) => (sum += num), 0)
    .toFixed(2);
  income.innerText = ` ${plus}`;
  const minus = (
    amounts.filter(item => item < 0).reduce((sum, num) => (sum += num), 0) * -1
  ).toFixed(2);
  expense.innerText = ` ${minus}`;
}

function removeTransaction(transactionId) {
  transaction = transaction.filter(e => e.id !== transactionId);

  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transaction));
}

function init() {
  list.innerHTML = "";
  transaction.forEach(item => addTransactionsToDOM(item));
  updatingMoney();
}

// ---------------------Event Listeners------------------------
form.addEventListener("submit", addTransaction);

init();
