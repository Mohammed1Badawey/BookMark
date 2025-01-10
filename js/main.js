// dark-light-mode

let btnDark = document.querySelector(".btn-dark");
let btnLight = document.querySelector(".btn-light");
let bodyLight = document.querySelector(".my-light");

btnLight.classList.add("d-none");
btnDark.classList.remove("d-none");

btnDark.addEventListener("click", () => {
  btnDark.classList.add("d-none");
  btnLight.classList.remove("d-none");
  bodyLight.classList.remove("my-light");
});

btnLight.addEventListener("click", () => {
  btnLight.classList.add("d-none");
  bodyLight.classList.add("my-light");
  btnDark.classList.remove("d-none");
});

//==================  CRUD  =========================//

let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let btnSubmit = document.querySelector(".btn-addSite");
let btnVisit = document.querySelector(".btn-visit");
let btnDelete = document.querySelector(".btn-delete");
let form = document.querySelector(".myForm");

let urlList;

if (JSON.parse(localStorage.getItem("urlList")) !== null) {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  displaySite();
} else {
  urlList = [];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
});

btnSubmit.onclick = () => addSite();

function addSite() {
  if (siteName.value.trim() === "" || siteURL.value.trim() === "") {
    alert("الرجاء ملء جميع الحقول");
    return;
  }

  let url = {
    name: siteName.value.trim(),
    url: siteURL.value.trim(),
  };

  urlList.push(url);
  clearInputs();
  displaySite();
  localStorage.setItem("urlList", JSON.stringify(urlList));
}

function displaySite() {
  let cartona = "";
  for (let i = 1; i < urlList.length; i++) {
    cartona += createTable(i);
  }
  document.getElementById("urlBody").innerHTML = cartona;
}

function deleteSite(i) {
  urlList.splice(i, 1);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displaySite();
}

function visitSite(i) {
  let site = urlList[i].url;
  window.location.replace(`https://${site}`);
}

function createTable(i) {
  return `<tr class="align-baseline">
      <th scope="">${i}</th>
      <td class="cursorURL">${urlList[i].name} </td>
      <td><button onclick="visitSite(${i})" class="btn btn-success btn-visit"><i class="fa-duotone fa-solid fa-eye "></i>&nbsp;  Visit</button></td>
      <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-delete"><i class="fa-sharp-duotone fa-solid fa-trash"></i>&nbsp; Delete</button></td>
    </tr>`;
}

function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
}
