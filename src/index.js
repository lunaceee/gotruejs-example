import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://kaldi-identity-access-test.netlify.com/.netlify/identity"
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
    .then(response =>
      showMessage("Success! Response: " + JSON.stringify(response), form)
    )
    .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
});

//reset password
document.querySelector("form[name='resetpw']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const email = "luna+03@netlify.com";
  auth
    .requestPasswordRecovery(email)
    .then(response =>
      showMessage(
        "Success!Recovery email sent" + JSON.stringify(response),
        form
      )
    )
    .catch(error => console.log("Error sending recovery mail: %o", error));
});

function showMessage(msg, el) {
  el.querySelector(".message").textContent = msg;
}
