// Profile dropdown toggle
const profileMenu = document.getElementById('profileMenu');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showLoginBtn = document.getElementById('showLoginBtn');
const showSignupBtn = document.getElementById('showSignupBtn');

profileMenu.addEventListener('click', () => {
  profileMenu.classList.toggle('active');
});

// Close dropdown on click outside
window.addEventListener('click', function (e) {
  if (!profileMenu.contains(e.target)) {
    profileMenu.classList.remove('active');
  }
});

// Show Login
showLoginBtn.addEventListener('click', () => {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  profileMenu.classList.remove('active');
});

// Show Signup
showSignupBtn.addEventListener('click', () => {
  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
  profileMenu.classList.remove('active');
});
