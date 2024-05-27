//toggle sidebar
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
menuicn.addEventListener("click", () => {
  nav.classList.toggle("navclose");
});

//toggle menu when clicking on
const menuItems = [
  {
    element: document.querySelector(".option1"),
    container: document.querySelector(".client"),
  },
  {
    element: document.querySelector(".option2"),
    container: document.querySelector(".pendingLoan"),
  },
  {
    element: document.querySelector(".option3"),
    container: document.querySelector(".confirmedLoan"),
  },
  {
    element: document.querySelector(".option4"),
    container: document.querySelector(".interest"),
  },
  {
    element: document.querySelector(".option5"),
    container: document.querySelector(".payMethod"),
  },
  {
    element: document.querySelector(".option6"),
    container: document.querySelector(".news"),
  },
  {
    element: document.querySelector(".option7"),
    container: document.querySelector(".blockedClient"),
  },
];

function handleMenuItemClick(clickedItem) {
  menuItems.forEach((item) => {
    if (item.element === clickedItem) {
      item.container.style.display = "block";
      item.element.style.backgroundColor = "#3f0097";
      item.element.style.color = "white";
    } else {
      item.container.style.display = "none";
      item.element.style.backgroundColor = "white";
      item.element.style.color = "#3f0097";
    }
  });
}

menuItems.forEach((item) => {
  item.container.style.display = "none";
  item.element.addEventListener("click", () =>
    handleMenuItemClick(item.element)
  );
});
// Initially show the first menu item
handleMenuItemClick(menuItems[0].element);

//DELETE news + paymethod
document.addEventListener("DOMContentLoaded", () => {
  const deleteNewsBtns = document.querySelectorAll(".deleteNews");
  const deletePayBtns = document.querySelectorAll(".deletePay");

  deleteNewsBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      try {
        const response = await fetch(`/news/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          button.closest("tr").remove(); // remove row from the table
        } else {
          alert("Delete news successfully. Please refresh to view result."); //actually it shows error (even it deleted in db )
          // alert(`Failed to delete: ${result.error}`);
        }
      } catch (err) {
        alert(`Eror: ${err.message}`);
      }
    });
  });

  deletePayBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      try {
        const response = await fetch(`/payment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          button.closest("tr").remove(); // remove row from the table
        } else {
          alert(
            "Delete payment method successfully. Please refresh to view result."
          ); //actually it shows error (even it deleted in db )

          // alert(`Failed to delete: ${result.error}`);
        }
      } catch (err) {
        alert(`Eror: ${err.message}`);
      }
    });
  });
});

// BLOCK user
document.addEventListener("DOMContentLoaded", () => {
  const blockBtns = document.querySelectorAll(".block");

  blockBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      event.preventDefault();
      const id = button.getAttribute("data-id");

      try {
        const response = await fetch(`/user/block/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.success) {
          button.closest("tr").remove(); // remove row from the table
          alert("Block user successfully. Please refresh to view result.");
        } else {
          alert(`Block successfully. Please refresh to view result.`); //actually it shows error (even it updated in db )
          // alert(`Failed to block: ${result.message}`);
        }
      } catch (err) {
        alert(`Eror: ${err.message}`);
      }
    });
  });
});

// UNBLOCK user
document.addEventListener("DOMContentLoaded", () => {
  const blockBtns = document.querySelectorAll(".unblock");

  blockBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      event.preventDefault();
      const id = button.getAttribute("data-id");

      try {
        const response = await fetch(`/user/unblock/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.success) {
          button.closest("tr").remove(); // remove row from the table
          alert("Unblock user successfully. Please refresh to view result.");
        } else {
          alert(`Unblock successfully. Please refresh to view result.`); //actually it shows error (even it updated in db )
          // alert(`Failed to block: ${result.message}`);
        }
      } catch (err) {
        alert(`Eror: ${err.message}`);
      }
    });
  });
});

// CONFIRM loan
document.addEventListener("DOMContentLoaded", () => {
  const acceptBtns = document.querySelectorAll(".accept");

  acceptBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      event.preventDefault();
      const id = button.getAttribute("data-id");

      try {
        const response = await fetch(`/loan/confirm/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.success) {
          button.closest("tr").remove(); // remove row from the table
          alert("Confirm loan successfully. Please refresh to view result.");
        } else {
          alert(`Confirm loan successfully. Please refresh to view result.`); //actually it shows error (even it updated in db )
          // alert(`Failed to confirm: ${result.message}`);
        }
      } catch (err) {
        alert(`Eror: ${err.message}`);
      }
    });
  });
});

// CONFIRM LOAN STATUS
document.addEventListener("DOMContentLoaded", () => {
  const paidStatusElements = document.querySelectorAll(".paidStatus");

  paidStatusElements.forEach((status) => {
    const text = status.textContent.trim();
    if (text === "false") {
      status.textContent = "Chưa thanh toán";
      status.style.color = "#ff2727";
    } else if (text === "true") {
      status.textContent = "Đã thanh toán";
      status.style.color = "#27ff4b";
    }
  });
});

// ADJUST interest (not finished yet 'cant adjust value')
document.addEventListener("DOMContentLoaded", () => {
  const adjustBtns = document.querySelectorAll(".adjust");

  adjustBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      const row = button.closest("tr");
      const id = button.getAttribute("data-id");
      const amount = row.querySelector(
        "input[type='text'][value*='amount']"
      ).value;
      const duration = row.querySelector(
        "input[type='text'][value*='duration']"
      ).value;
      const interestRate = row.querySelector(
        "input[type='text'][value*='interestRate']"
      ).value;

      try {
        const response = await fetch(`/interest/adjust/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            duration: parseInt(duration),
            interestRate: parseFloat(interestRate),
          }),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          alert("Adjust interest successfully. Please refresh to view result.");
        } else {
          alert(`Failed to adjust interest: ${result.message}`);
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    });
  });
});
