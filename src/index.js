import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";
import 'normalize.css';
import "./style.css";

let auth;

// auth = new GoTrue({
//   APIUrl: "https://inspiring-ride-d3b2ae.netlify.com/.netlify/identity"
// });

// auth
//   .login("luna+07@netlify.com", "2222")
//   .then(response => console.log("auth", response))
//   .catch(error => error);

document
  .querySelector("form[name='endpoint']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const {
      apiendpoint
    } = form.elements;
    auth = new GoTrue({
      APIUrl: apiendpoint.value
    });
    document.getElementById(
      "alert-msg"
    ).innerHTML = `<br><p>API endpoint submitted!</p>`;
  });

window.auth = auth;

//sign up
document.querySelector("form[name='signup']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const {
    email,
    password
  } = form.elements;
  auth
    .signup(email.value, password.value)
    .then(response =>
      showMessage(`<p>Created a user! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`, form)
    )
    .catch(error => showMessage(`Failed :( <code>${JSON.stringify(error)}</code>`, form));
});

document.querySelector("#user-email").textContent = "Are you logged in?";

//login
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const {
    email,
    password
  } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      document.querySelector("#user-email").textContent = email.value;
      showMessage(
        `<p>Log in successful! </p><p>Response:  </p><code>${JSON.stringify(response)}</code>`,
        form
      );
    })
    .catch(error =>
      showMessage(`Failed to log in :( <code>${JSON.stringify(error)}</code>`, form)
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
          `<p>Recovery email sent, check your inbox! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
          form
        )
      )
      .catch(error =>
        showMessage(`Something went wrong :( <code>${JSON.stringify(error)}</code>`, form));
  });

//get current user
document
  .querySelector("form[name='get_current_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const user = auth.currentUser();
    user ?
      showMessage(
        `<p>Got current user! </p><p>Response: </p><code>${JSON.stringify(user)}</code>`,
        form
      ) : showMessage(`<p>User not found...did you log in?</p>`, form)
  });


//Update users
document
  .querySelector("form[name='update_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const {
      password
    } = form.elements;
    const user = auth.currentUser();
    user
      .update({
        password: password.value
      })
      .then(
        response => {
          showMessage(
            `<p>Updated user! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
            form
          )
        })
      .catch(error => {
        showMessage(`Failed to update user :( <code>${JSON.stringify(error)}</code>`, form)
      });
  });


//get jwt token
document
  .querySelector("form[name='get_token']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const user = auth.currentUser();
    const jwt = user.jwt();

    jwt
      .then(response =>
        showMessage(
          `<p>Got JWT token! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
          form
        )
      )
      .catch(error => {
        showMessage(
          `<p>Failed to get JWT token :( </p><code>${JSON.stringify(error)}</code>`,
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
    .then(response => {
      showMessage(`<p>Logged out!</p><p>Response: </p><code>${JSON.stringify(response)}</code>`, form)
    })
    .catch(error => {
      showMessage(`<p>Failed to log out :(</p><code>${JSON.stringify(error)}</code>`, form);
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
          headers: {
            Authorization: myAuthHeader
          },
          credentials: "include"
        })
        .then(response => {
          return response.json();
        })
        .then(response => {
          showMessage(
            `<p>Got a user!</p><p>Response: </p>${JSON.stringify(response)}`,
            getUserDiv
          );
        })
        .catch(error => console.error("Error:", error));
    };
  })
  .catch(error => showMessage("Failed :( " + JSON.stringify(error)));

// //Delete a user via admin token

const deleteUserBtn = document.querySelector("delete-user");

auth
  .login("luna+01@netlify.com", "gotrue")
  .then(response => {
    const myAuthHeader = "Bearer " + response.token.access_token; //creates the bearer token
    deleteUserBtn.onclick = () => {
      fetch("/.netlify/functions/deleteuser", {
          headers: {
            Authorization: myAuthHeader
          },
          credentials: "include"
        })
        .then(response => {
          console.log(JSON.stringify({
            response
          }));
        })
        .catch(error => console.error("Error:", error));
    };
  })
  .catch(error => showMessage("Failed :( " + JSON.stringify(error)));

function showMessage(msg, el) {
  el.querySelector(".message").innerHTML = msg;
}

function clearPage() {
  document.querySelectorAll(".message").forEach(el => {
    el.textContent = "";
  });
}