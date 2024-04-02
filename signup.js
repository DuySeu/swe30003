const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

let apiUser = "http://localhost:3000/account";
let account = [];

const loginBtn = document.getElementById("signInbtn");
var loginEmail = document.querySelector(".login-email");
var loginPassword = document.querySelector(".login-pwd");

const registerBtn = document.getElementById("signUpbtn");
var username = document.querySelector(".username");
var mail = document.querySelector(".mail");
var password = document.querySelector(".password");

signUpButton.addEventListener("click", function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
signInButton.addEventListener("click", function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});

// register
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == "" || mail.value == "" || password.value == "") {
    alert("Please enter your username and password and email");
  } else {
    const user = {
      username: username.value,
      email: mail.value,
      password: password.value,
      shopping_cart: []
    };
    fetch(apiUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          alert("Signup success");
          window.location.href = "index.html";
        } else {
          alert("Signup failed");
        }
      });
  }
});

const getUser = async () => {
    const response = await fetch(apiUser);
    const data = await response.json();
    // console.log(data);
    return data;
};
  
  // login
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.preventDefault());
    if (loginEmail.value == "" || loginPassword.value == "") {
      alert("Please enter your username and password");
    } else {
      getUser().then((data) => {
        const user = data.find(
          (user) =>
            user.email == loginEmail.value && user.password == loginPassword.value
        );
        // console.log(user);
        if (user) {
          alert("Login success");
          window.location.href = "src/homepage.html";
        } else {
          alert("Login failed");
        }
      });
    }
  });
  