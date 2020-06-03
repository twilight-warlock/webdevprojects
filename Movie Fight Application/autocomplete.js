function createAutocomplete({
  autoCompleteEl,
  renderOption,
  onOptionSelection,
  inputValueDisplayed,
  fetchDataFromApi,
}) {
  autoCompleteEl.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>    
    </div>`;

  const input1 = autoCompleteEl.querySelector(".input");
  const dropdown = autoCompleteEl.querySelector(".dropdown");
  const resultsWrapper = autoCompleteEl.querySelector(".results");

  // Passing value from input by user to fetch the api
  const onInput = async (e) => {
    const items = await fetchDataFromApi(e.target.value);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    //   Clearing the dropdown before the next search
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    // Displaying autocompleted options
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");

      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input1.value = inputValueDisplayed(item);

        onOptionSelection(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  // ---------------------------Event Listeners------------------------
  input1.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (e) => {
    if (!autoCompleteEl.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
}
