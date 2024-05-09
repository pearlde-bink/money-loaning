//switch between steps
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const nextBtnFourth = document.querySelector(".next-3");
const prevBtnFift = document.querySelector(".prev-4");
const nextBtnFift = document.querySelector(".next-4");
const prevBtnSixth = document.querySelector(".prev-5");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-20%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-60%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-100%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-140%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnFift.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-180%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

submitBtn.addEventListener("click", function () {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  /*setTimeout(function () {
        alert("Your Form Successfully Signed up");
        location.reload();
    }, 800);*/
});

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-20%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-60%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFift.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-100%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnSixth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-140%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
//step2
var provinces = document.getElementById("province");
var districts = document.getElementById("district");
var villages = document.getElementById("village");
var Parameter2 = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json",
};
var promise2 = axios(Parameter2);
promise2.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    provinces.options[provinces.options.length] = new Option(x.Name, x.Id);
  }
  provinces.onchange = function () {
    districts.length = 1;
    villages.length = 1;
    if (this.value != "") {
      const result = data.filter((n) => n.Id === this.value);

      for (const k of result[0].Districts) {
        districts.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  districts.onchange = function () {
    villages.length = 1;
    const dataCity = data.filter((n) => n.Id === provinces.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === this.value
      )[0].Wards;

      for (const w of dataWards) {
        villages.options[villages.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}

//step 5
//bankin method toggle
const method = document.getElementById("methodItem");
const momoNum = document.querySelector(".momoNum");
const bank = document.querySelector(".bank");

//hide momo at first
momoNum.style.display = "none";
bank.style.display = "block";

method.addEventListener("change", function () {
  if (method.value === "Vi momo") {
    momoNum.style.display = "block";
    bank.style.display = "none";
  } else {
    momoNum.style.display = "none";
    bank.style.display = "block";
  }
});

//render bank json
const bankName = document.getElementById("bankNameItemInput");
const Parameter5 = {
  url: "https://api.vietqr.io/v2/banks",
  method: "GET",
  responseType: "json",
};

const promise5 = axios(Parameter5);
promise5
  .then(function (result) {
    //var origindata = JSON.parse(JSON.stringify(data));
    renderBank(result.data);
    //console.log("result: ", result.data);
  })
  .catch((err) => console.log("there's error: ", err));

function renderBank(data) {
  for (const x of data.data) {
    bankName.options[bankName.options.length] = new Option(
      x.shortName,
      x.shortName
    );
  }
}

//step6
// Upload file
const fileUploaders = document.querySelectorAll('[id^="file-uploader"]');
const dropZones = document.querySelectorAll('[id^="drop-zone"]');
const readers = [];

fileUploaders.forEach((fileUploader, index) => {
  const reader = new FileReader();
  readers.push(reader);

  fileUploader.addEventListener("change", (event) => {
    const files = event.target.files;
    console.log("files", files);
  });

  const dropZone = dropZones[index];
  const content = dropZone.querySelector('[id^="content"]');

  dropZone.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  dropZone.addEventListener("drop", (event) => {
    content.innerHTML = "";
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);

    reader.readAsDataURL(files[0]);

    reader.addEventListener("load", (event) => {
      content.innerHTML = "";
      const img = document.createElement("img");
      img.style.height = "400px";
      img.style.width = "400px";
      content.appendChild(img);
      img.src = event.target.result;
      img.alt = files[0].name;
    });
  });
});
