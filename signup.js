const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

function auth() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email == "admin@gmail.com" && password == "12345") {
        window.location.assign("src/homepage.html");
        alert("Login Successfully")
    } else {
        alert("Invalid Information")
        return
    }
}