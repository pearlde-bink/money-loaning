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
