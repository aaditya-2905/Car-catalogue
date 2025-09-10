// Show/Hide modal utility
function showModal(id) {
  document.getElementById(id).style.display = "block";
}
function hideModal(id) {
  document.getElementById(id).style.display = "none";
}

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  if (
    (username === "admin" && password === "12345") ||
    (storedUsers[username] && storedUsers[username] === password)
  ) {
    errorMessage.style.color = "green";
    errorMessage.textContent = "Login successful!";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    errorMessage.style.color = "red";
    errorMessage.textContent = "Invalid username or password.";
  }
});

document.getElementById("cancelSignup").addEventListener("click", function () {
  hideModal("signupModal");
});

// Show sign-up modal
document.getElementById("signupBtn").addEventListener("click", function () {
  showModal("signupModal");
});

// Cancel sign-up modal
document.getElementById("cancelSignup").addEventListener("click", function (e) {
  e.preventDefault(); // ⬅️ prevent form submit
  hideModal("signupModal");
});

// Handle Sign Up
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newUser = document.getElementById("newUsername").value;
  const newPass = document.getElementById("newPassword").value;
  const signupMsg = document.getElementById("signup-message");

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[newUser] || newUser === "admin") {
    signupMsg.style.color = "red";
    signupMsg.textContent = "Username already exists!";
  } else {
    users[newUser] = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    signupMsg.style.color = "green";
    signupMsg.textContent = "Sign up successful! You can now log in.";
    setTimeout(() => {
      hideModal("signupModal");
      signupMsg.textContent = "";
    }, 1500);
  }
});

// Show forgot modal
document.getElementById("forgotPass").addEventListener("click", function (e) {
  e.preventDefault();
  showModal("forgotModal");
});

// Cancel forgot modal
document.getElementById("cancelForgot").addEventListener("click", function (e) {
  e.preventDefault(); // ⬅️ prevent form submit
  hideModal("forgotModal");
});

// Handle forgot password
document.getElementById("forgotForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const forgotUser = document.getElementById("forgotUsername").value;
  const forgotMsg = document.getElementById("forgot-message");

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (forgotUser === "admin") {
    forgotMsg.style.color = "blue";
    forgotMsg.textContent = "Default password: 12345";
  } else if (users[forgotUser]) {
    forgotMsg.style.color = "blue";
    forgotMsg.textContent = `Your password is: ${users[forgotUser]}`;
  } else {
    forgotMsg.style.color = "red";
    forgotMsg.textContent = "Username not found!";
  }
});
