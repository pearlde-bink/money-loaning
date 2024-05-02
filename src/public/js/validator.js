function Validator(options) {
  //to include all rules for each selector
  var selectorRules = {};

  //validate function
  function validate(inputElement, rule) {
    var formMessage = inputElement.parentElement.querySelector(
      options.formMessage
    );
    var errorMessage = rule.test(inputElement.value);

    if (errorMessage) {
      formMessage.innerHTML = errorMessage;
      inputElement.parentElement.classList.add("invalid");
      formMessage.style.color = "red";
    } else {
      formMessage.innerHTML = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //get form element and check if it's blank or not
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      //save rules for input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Xu ly truong hop blur ra ngoai input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xu ly truong hop nguoi dung nhap vao input
        inputElement.oninput = function () {
          var formMessage = inputElement.parentElement.querySelector(
            options.formMessage
          );
          formMessage.innerHTML = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });

    console.log(selectorRules);
  }
}

Validator.isSdt = function (selector, message) {
  // Validate phone number function
  function validatePhoneNumber(value) {
    // Regex pattern for 10-digit phone number
    const pattern = /^\d{10}$/;
    const isValid = pattern.test(value);

    return isValid ? undefined : "Hãy nhập đúng định dạng số điện thoại.";
  }

  return {
    selector: selector,
    test: function (value) {
      return value.trim()
        ? validatePhoneNumber(value.trim())
        : message || "Vui lòng nhập trường này";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim().length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự.`;
    },
  };
};

function checkPassword(password) {
  var pd = document.getElementById("password").value;
  return password === pd;
}

Validator.isConfirmed = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      if (checkPassword(value)) {
        value = undefined;
      } else {
        value = message ? message : "Giá trị nhap lại khác giá trị";
      }
      return value;
    },
  };
};
