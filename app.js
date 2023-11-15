let input = document.getElementById("input_id");
let link_form = document.getElementById("link-form");
let err_msg = document.getElementById("error-msg");

link_form.addEventListener("submit", formSubmit);

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

  if (input.value === "") {
    err_msg.innerHTML = "Please input a value";
    input.classList.add("border-red");
    setTimeout(() => {
      err_msg.innerHTML = "";
      input.classList.remove("border-red");
    }, 3000);
  } else if (!validURL(input.value)) {
    err_msg.innerHTML = "Please input a valid URL";
    input.classList.add("border-red");
    setTimeout(() => {
      err_msg.innerHTML = "";
      input.classList.remove("border-red");
    }, 3000);
  } else {
    err_msg.innerHTML = "";
    input.classList.remove("border-red");
    alert(input.value)
  }
}
