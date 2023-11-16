const btn = document.getElementById("menu-btn");

const menu = document.getElementById("menu");

let form_input = document.getElementById("input_id");
let link_form = document.getElementById("link-form");
let err_msg = document.getElementById("error-msg");

const links_wrap = document.querySelector(".links-wrap");

btn.addEventListener("click", navToggle);

link_form.addEventListener("submit", formSubmit);
link_form.addEventListener("submit", shortenURL);

// toggle mobile menu
function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
}

// Function to validate a URL
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}

function formSubmit(e) {
  e.preventDefault();

  if (form_input.value === "") {
    err_msg.innerHTML = "Please input a value";
    form_input.classList.add("border-red");
    setTimeout(() => {
      err_msg.innerHTML = "";
      form_input.classList.remove("border-red");
    }, 3000);
  } else if (!validURL(form_input.value)) {
    err_msg.innerHTML = "Please input a valid URL";
    form_input.classList.add("border-red");
    setTimeout(() => {
      err_msg.innerHTML = "";
      form_input.classList.remove("border-red");
    }, 3000);
  } else {
    err_msg.innerHTML = "";
    form_input.classList.remove("border-red");
  }
}

// shorten link function
async function shortenURL() {
  const url = form_input.value;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiURl = `${proxyUrl}https://cleanuri.com/api/v1/shorten`;

  try {
    const response = await fetch(apiURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      links_wrap.classList.add("flex");
      links_wrap.classList.remove("hidden");
      
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
