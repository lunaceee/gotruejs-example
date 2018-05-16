import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

let auth;
//
// auth = new GoTrue({
//   APIUrl: "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity"
// });

// auth
//   .login("luna+07@netlify.com", "icecream")
//   .then(response => response)
//   .catch(error => error);

document
  .querySelector("form[name='api-endpoint']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const { endpoint } = form.elements;
    auth = new GoTrue({
      APIUrl: endpoint.value
    });
    console.log(auth);
    document.querySelector(
      "#alert-msg"
    ).innerHTML = `<br><p>API endpoint submitted!</p>`;
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
      showMessage("Created a user! Response: " + JSON.stringify(response), form)
    )
    .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));
});

document.querySelector("#user-email").textContent = "Are you logged in?";

//login
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      document.querySelector("#user-email").textContent = email.value;
      showMessage(
        "Log in successful! Response: " + JSON.stringify(response),
        form
      );
    })
    .catch(error =>
      showMessage("Failed to log in :( " + JSON.stringify(error), form)
    );
});

//request recovery email
document
  .querySelector("form[name='request_recovery']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const user = auth.currentUser();
    const email = user.email;

    auth
      .requestPasswordRecovery(email)
      .then(response =>
        showMessage(
          "Recovery email sent, check your inbox! Response: " +
            JSON.stringify(response),
          form
        )
      )
      .catch(error =>
        showMessage("Something went wrong :( " + JSON.stringify(error), form)
      );
  });

//get current user
document
  .querySelector("form[name='get_current_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    showMessage(
      "Got current user! Response: " + JSON.stringify(auth.currentUser()),
      form
    );
  });

//Update users
document
  .querySelector("form[name='update_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const { password } = form.elements;
    const user = auth.currentUser();
    user
      .update({ password: password.value })
      .then(resopnse =>
        showMessage("Updated user! Response: " + JSON.stringify(response), form)
      )
      .catch(error =>
        showMessage("Failed to update user :( " + JSON.stringify(error), form)
      );
  });

//get jwt token
document
  .querySelector("form[name='get_jwt_token']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const user = auth.currentUser();
    const jwt = user.jwt();
    jwt
      .then(response =>
        showMessage(
          "Got JWT token! Response: " + JSON.stringify(response),
          form
        )
      )
      .catch(error => {
        showMessage(
          "Failed to get JWT token :( " + JSON.stringify(error),
          form
        );
        throw error;
      });
  });

//log out
document.querySelector("form[name='log_out']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const user = auth.currentUser();
  user
    .logout()
    .then(response =>
      showMessage("Logged out! Response: " + JSON.stringify(response), form)
    )
    .catch(error => {
      showMessage("Failed to log out :( " + JSON.stringify(error), form);
      throw error;
    });
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
          return response.json();
        })
        .then(data => {
          console.log("Got a user");
          showMessage(
            "Got a user! Response: " + JSON.stringify(data),
            getUserDiv
          );
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
  el.querySelector(".message").innerHTML = msg;
}

function clearPage() {
  document.querySelectorAll(".message").forEach(el => {
    el.textContent = "";
  });
}
