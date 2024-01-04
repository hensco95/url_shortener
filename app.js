const btn = document.getElementById("menu-btn");

const menu = document.getElementById("menu");

let form_input = document.getElementById("input_id");
let link_form = document.getElementById("link-form");
let err_msg = document.getElementById("error-msg");

let long = document.querySelector(".old-txt");
let short = document.querySelector(".new-txt");

const copy = document.getElementById("copy");

const links_wrap = document.querySelector(".links-wrap");

btn.addEventListener("click", navToggle);

copy.addEventListener("click", copyText);

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

async function copyText() {
  let short_value = short.textContent;

  try {
    await navigator.clipboard.writeText(short_value);
    console.log("copied");
    copy.textContent = "Copied!";
    setTimeout(() => {
      copy.textContent = "Copy";
    }, 1000);
  } catch (err) {
    console.log(err);
  }
}

// shorten link function
function shortenURL() {
  let old_txt = document.querySelector(".old-txt");
  const new_text = document.querySelector(".new-txt");
  const links_wrap = document.querySelector(".links-wrap");
  const url = form_input.value;

  fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "804bca43d3eb88bc39e37c9788cca71e8830f2b6",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long_url: url,
      domain: "bit.ly",
      group_guid: "Bnbg2mhQBjt",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      old_txt.textContent = data.long_url;
      new_text.textContent = data.link;
      links_wrap.classList.remove("hidden");
      links_wrap.classList.add("flex");
    })
    .catch((err) => {
      console.log(err);
    });
}
