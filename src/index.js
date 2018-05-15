import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity"
});

window.auth = auth;
//
// //signing up a user
//
// auth
//   .signup("luna+14@netlify.com", "gotrue")
//   .then(function(response) {
//     console.log(JSON.stringify({ response }));
//   })
//   .catch(error => console.log("It's an error", error));
//
// //login methods
// auth
//   .login("luna+12@netlify.com", "gotrue")
//   .then(function(response) {
//     console.log(JSON.stringify(response));
//   })
//   .catch(function(e) {
//     console.log(e);
//   });
//
// //comfirm a user via access_token
// auth
//   .confirm("Iyo9xHvsGVbW-9A9v4sDmQ")
//   .then(function(response) {
//     console.log("Confirmation email sent", JSON.stringify({ response }));
//   })
//   .catch(function(e) {
//     console.log(e);
//   });
//
// //test out password recovery method
// auth
//   .requestPasswordRecovery("luna+identity@netlify.com")
//   .then(response =>
//     console.log("Recovery email sent", JSON.stringify({ response }))
//   )
//   .catch(error => console.log("Error sending recovery mail: %o", error));
//
// //test out recovery token method
// auth
//   .recover("6T8jMdpax0S5CFgHDMGCZg")
//   .then(function(response) {
//     console.log("Logged in as %s", JSON.stringify({ response }));
//   })
//   .catch(function(e) {
//     console.log(e);
//   });

//sign up
document.querySelector("form[name='signup']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .signup(email.value, password.value)
    .then(response =>
      showMessage("Created a user! Response: " + JSON.stringify(response), form)
    )
    .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
});

//login
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
      showMessage(
        "Log in successful! Response: " + JSON.stringify(response),
        form
      );
    })
    .catch(error =>
      showMessage("Failed to log in :( " + JSON.stringify(error), form)
    );
});

//Get a user via admin token

const getUserBtn = document.querySelector(".get-user");
const getUserDiv = document.querySelector("#get-user-div");

auth
  .login("luna+01@netlify.com", "gotrue")
  .then(response => {
    const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
    getUserBtn.onclick = () => {
      clearPage();
      fetch("/.netlify/functions/getuser", {
        headers: { Authorization: myAuthHeader },
        credentials: "include"
      })
        .then(response => {
          console.log("line 106");
          return response.json();
        })
        .then(data => {
          console.log("line 110");
          showMessage(
            "Got a user! Response: " + JSON.stringify(data),
            getUserDiv
          );
          console.log("line 112");
        })
        .catch(error => console.error("Error:", error));
    };
  })
  .catch(error => showMessage("Failed :( " + JSON.stringify(error)));

// //Delete a user via admin token
//
// const deleteUserBtn = document.querySelector("delete-user");
//
// auth
//   .login("luna+01@netlify.com", "gotrue")
//   .then(response => {
//     const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
//     console.log({ myAuthHeader });
//     deleteUserBtn.onclick = () => {
//       fetch("/.netlify/functions/deleteuser", {
//         headers: { Authorization: myAuthHeader },
//         credentials: "include"
//       })
//         .then(response => {
//           console.log(JSON.stringify({ response }));
//         })
//         .catch(error => console.error("Error:", error));
//     };
//   })
//   .catch(error => showMessage("Failed :( " + JSON.stringify(error)));

function showMessage(msg, el) {
  el.querySelector(
    ".message"
  ).innerHTML = `<div class="card col-sm-3"><div class="card-body">${msg}</div></div>`;
}

function clearPage() {
  document.querySelectorAll(".message").forEach(el => {
    el.textContent = "";
  });
}
