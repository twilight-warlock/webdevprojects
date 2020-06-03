var addUser = document.querySelector("#add-user");
var double = document.querySelector("#double-money");
var showMilllionaire = document.querySelector("#show-millionaires");
var sortbtn = document.querySelector("#sort");
var total = document.querySelector("#total-wealth");
var main = document.querySelector("#main");

let data = [];

// -----------------------Functions---------------------------

// fetch random user and money
async function getUser() {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

function addData(user) {
  data.push(user);
  updateDOM();
}

// Double Money

function doubleMoney() {
  //   data.forEach(item => {
  //     item.money *= 2;
  //   });
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sorting By Richest
function sorting() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filtering out the Millionaires
function filteringMillionaire() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}

// Calculate Total Wealth
function calculateWealth() {
  const wealthy = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthelm = document.createElement("div");
  wealthelm.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    wealthy
  )}</strong></h3>`;
  main.appendChild(wealthelm);
}

// Upadte DOM
function updateDOM(providedData = data) {
  // Clear Main Div
  main.innerHTML = "<h2><strong>Users</strong>Wealth</h2>";
  providedData.forEach(item => {
    const elm = document.createElement("div");
    elm.classList.add("person");
    elm.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(elm);
  });
}

// Formattting Money
function formatMoney(num) {
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// --------------------Event Listeners------------------------
addUser.addEventListener("click", getUser);
double.addEventListener("click", doubleMoney);
sortbtn.addEventListener("click", sorting);
showMilllionaire.addEventListener("click", filteringMillionaire);
total.addEventListener("click", calculateWealth);
getUser();
getUser();
