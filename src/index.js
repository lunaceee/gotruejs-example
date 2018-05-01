import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://imorente-gotrue-examples.netlify.com/.netlify/identity"
});

window.auth = auth;

document.querySelector("form[name='signup']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .signup(email.value, password.value)
    .then(response =>
      showMessage("Success! Response: " + JSON.stringify(response), form)
    )
    .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
});

function showMessage(msg, el) {
  el.querySelector(".message").textContent = msg;
}
