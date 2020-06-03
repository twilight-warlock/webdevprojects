var container = document.querySelector(".container");
var seat = document.querySelectorAll(".row .seat:not(.booked)");
var count = 0,
  total = 0;
var movie = document.querySelector("#movie");
var ticketPrice = movie.value;
var counter = document.querySelector("#count");
var tot = document.querySelector("#total");
var text = container.querySelector("p");

populateUi();

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

function update() {
  var selectedSeats = document.querySelectorAll(".row .seat.selected");
  var seatsIndex = [...selectedSeats].map(function(e) {
    return [...seat].indexOf(e);
  });
  ticketPrice = movie.value;
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count = selectedSeats.length;
  total = count * ticketPrice;
  counter.innerText = String(count);
  tot.innerText = total;
}
function populateUi() {
  var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const movieIndex = localStorage.getItem("movieIndex");
  var moviePrice = localStorage.getItem("moviePrice");
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seat.forEach(function(e, index) {
      if (selectedSeats.indexOf(index) > -1) {
        e.classList.add("selected");
      }
    });
  }
  if (movieIndex !== null) {
    movie.selectedIndex = +movieIndex;
  }

  if (moviePrice !== null) {
    movie.value = moviePrice;
  }
}

movie.addEventListener("change", function(e) {
  ticketPrice = +e.target.value;
  //   console.log(e.target.selectedIndex);
  setMovieData(e.target.selectedIndex, e.target.value);
  update();
});
container.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked")
  ) {
    e.target.classList.toggle("selected");
    update();
  }
});
update();

// for (var i = 0; i < seat.length; i++) {
//   seat[i].addEventListener("click", function() {
//     this.classList.add("selected");
//     count += 1;
//     total = count * +ticketPrice.value;
//     counter.textContent = count;
//     tot.textContent = total;
//   });
// }

// for (var i = 0; i < seat.length; i++) {
//     if (e.target.classList.contains("selected")) {
//       e.target.classList.remove("selected");
//       count = 0;
//       total = count * +ticketPrice.value;
//       counter.textContent = count;
//       tot.textContent = total;
//     }
//   }

//   if (
//     e.target.classList.contains("seat") &&
//     !e.target.classList.contains("booked") &&
//     !e.target.classList.contains("selected")
//   ) {
//     e.target.classList.add("selected");
//     update();

//   } else if (e.target.classList.contains("selected")) {
//     e.target.classList.remove("selected");
//     count -= 1;
//     total = count * +ticketPrice.value;
//     counter.textContent = count;
//     tot.textContent = total;
//   }
