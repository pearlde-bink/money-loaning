//format while inputting
function formatText() {
  // Get the input value
  let input = document.getElementById("").value;

  // Format the input (e.g., capitalize every word)
  let formattedInput = input.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });

  // Update the input field with the formatted text
  document.getElementById("inputBox").value = formattedInput;
}

//format number
function formatValue(e) {
  return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

// convert to number
let loanAmount = formatValue(parseFloat(loanAmountInput.value));
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = formatValue(parseFloat(loanTenureInput.value));

// calculate interest for month
let interest = interestRate / 12 / 100;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
};

let myChart;

const displayChart = (totalInterestAmount) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Tổng tiền lãi", "Số tiền vay"],
      datasets: [
        {
          data: [totalInterestAmount, loanAmount],
          backgroundColor: ["#FB9AD1", "#5536a2"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestAmount) => {
  myChart.data.datasets[0].data[0] = totalInterestAmount;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const calculateEMI = () => {
  let emi =
    (loanAmount * interest * Math.pow(1 + interest, loanTenure)) /
    (Math.pow(1 + interest, loanTenure) - 1);
  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = formatValue(Math.round(emi));

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = formatValue(totalAmount);

  let totalInterestAmount = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = formatValue(totalInterestAmount);

  if (myChart) {
    updateChart(totalInterestAmount);
  } else {
    displayChart(totalInterestAmount);
  }
};

// get new values after change input value
const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const init = () => {
  refreshInputValues();
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);
