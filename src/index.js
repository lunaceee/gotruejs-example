import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity"
});

window.auth = auth;

//test log in response object
document
  .querySelector("form[name='login_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const { email, password } = form.elements;
    auth
      .login(email.value, password.value)
      .then(response => {
        showMessage("Success! Response: " + JSON.stringify({ response }), form);
      })
      .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
  });

//test out password recovery method
auth
  .requestPasswordRecovery("luna+08@netlify.com")
  .then(response => console.log("Recovery email sent", { response }))
  .catch(error => console.log("Error sending recovery mail: %o", error));

//test out recovery token method
auth
  .recover("30xx87Y2R3WdR6QHK-t4LQ")
  .then(function(response) {
    console.log("Logged in as %s", { response });
  })
  .catch(function(e) {
    console.log(e);
  });

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

//test admin methods
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
      console.log({ myAuthHeader });
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
