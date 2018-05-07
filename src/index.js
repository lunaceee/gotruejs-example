import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity"
});

window.auth = auth;

//sign up
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

//log in
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
      showMessage(
        "Success! Response: " + JSON.stringify([response, myAuthHeader]),
        form
      );
      fetch("/.netlify/functions/hello", {
        headers: { Authorization: myAuthHeader },
        credentials: "include"
      })
        .then(response => {
          console.log({ response });
        })
        .catch(error => console.error("Error:", error));
    })
    .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
});

function showMessage(msg, el) {
  el.querySelector(".message").textContent = msg;
}
