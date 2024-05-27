// document.getElementById("Input").readOnly = true;
document.addEventListener("DOMContentLoaded", () => {
  const loanAmountInput = document.getElementById("loanAmount");
  const loanDayElem = document.getElementById("loanDay");
  const loanPaydayElem = document.getElementById("loanPayday");
  const loanInterestElem = document.getElementById("loanInterest");
  const loanTotalElem = document.getElementById("loanTotal");

  loanDayElem.readOnly = true;
  loanPaydayElem.readOnly = true;
  loanInterestElem.readOnly = true;
  loanTotalElem.readOnly = true;

  const updateLoanDetails = () => {
    const loanAmount = parseFloat(loanAmountInput.value);

    if (isNaN(loanAmount) || loanAmount < 1000000 || loanAmount > 30000000) {
      loanInterestElem.value = "";
      loanTotalElem.value = "";
      loanPaydayElem.value = "";
      return;
    }

    let interestRate;
    let durationMonths;

    if (loanAmount <= 10000000) {
      interestRate = 0.12;
      durationMonths = 6;
    } else if (loanAmount <= 20000000) {
      interestRate = 0.264;
      durationMonths = 12;
    } else {
      interestRate = 0.45;
      durationMonths = 18;
    }

    const loanInterest = loanAmount * interestRate;
    const loanTotal = loanAmount + loanInterest;

    loanInterestElem.value = formatCurrency(loanInterest) + "đ";
    loanTotalElem.value = formatCurrency(loanTotal) + "đ";

    const today = new Date();
    const loanDay = formatDate(today);
    loanDayElem.value = loanDay;

    const payday = new Date(today.setMonth(today.getMonth() + durationMonths));
    const formattedPayday = formatDate(payday);
    loanPaydayElem.value = formattedPayday;
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  loanAmountInput.addEventListener("input", updateLoanDetails);
});
