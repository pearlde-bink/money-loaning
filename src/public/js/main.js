const value = document.querySelector("#value");
const input = document.querySelector("#range1");
value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});