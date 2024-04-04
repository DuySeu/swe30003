class SignUpForm {
  constructor(apiUser) {
    this.apiUser = apiUser;
    this.signInForm = document.getElementById("signIn");
    this.signUpForm = document.getElementById("signup");
    this.usernameInput = document.querySelector(".username");
    this.emailInput = document.querySelector(".mail");
    this.passwordInput = document.querySelector(".password");
    this.registerButton = document.getElementById("signUpbtn");

    this.signUpButton = document.getElementById("signUpButton");
    this.signInButton = document.getElementById("signInButton");

    this.signUpButton.addEventListener("click", this.showSignUpForm.bind(this));
    this.signInButton.addEventListener("click", this.showSignInForm.bind(this));
    this.registerButton.addEventListener("click", this.registerUser.bind(this));
  }

  showSignUpForm() {
    this.signInForm.style.display = "none";
    this.signUpForm.style.display = "block";
  }

  showSignInForm() {
    this.signInForm.style.display = "block";
    this.signUpForm.style.display = "none";
  }

  registerUser(e) {
    e.preventDefault();
    if (
      this.usernameInput.value === "" ||
      this.emailInput.value === "" ||
      this.passwordInput.value === ""
    ) {
      alert("Please enter your username, email, and password");
    } else {
      const user = {
        username: this.usernameInput.value,
        email: this.emailInput.value,
        password: this.passwordInput.value,
        shopping_cart: []
      };
      fetch(this.apiUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
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
  }
}

class LoginForm {
  constructor(apiUser) {
    this.apiUser = apiUser;
    this.signInForm = document.getElementById("signIn");
    this.signInButton = document.getElementById("signInButton");
    this.loginButton = document.getElementById("signInbtn");
    this.emailInput = document.querySelector(".login-email");
    this.passwordInput = document.querySelector(".login-pwd");

    this.signInButton.addEventListener("click", this.showSignInForm.bind(this));
    this.loginButton.addEventListener("click", this.loginUser.bind(this));
  }

  showSignInForm() {
    this.signInForm.style.display = "block";
  }

  loginUser(e) {
    e.preventDefault();
    if (this.emailInput.value === "" || this.passwordInput.value === "") {
      alert("Please enter your email and password");
    } else {
      this.getUser()
        .then((data) => {
          const user = data.find(
            (user) =>
              user.email === this.emailInput.value &&
              user.password === this.passwordInput.value
          );
          console.log(user);
          if (user) {
            alert("Login success");
            localStorage.setItem("userData", JSON.stringify(user));
            window.location.href = "src/homepage.html";
          } else {
            alert("Login failed");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred during login");
        });
    }
  }

  async getUser() {
    const response = await fetch(this.apiUser);
    const data = await response.json();
    return data;
  }
}

// Usage
const apiUser = "http://localhost:3000/account";
const signUpForm = new SignUpForm(apiUser);
const loginForm = new LoginForm(apiUser);