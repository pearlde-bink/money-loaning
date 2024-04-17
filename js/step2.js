var provinces = document.getElementById("province");
var districts = document.getElementById("district");
var villages = document.getElementById("village");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json",
};
var promise = axios(Parameter);
promise.then(function (result) {
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
