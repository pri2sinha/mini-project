// Dropdown toggle
const profileMenu = document.getElementById('profileMenu');

if (profileMenu) {
  profileMenu.addEventListener('click', () => {
    profileMenu.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', function (e) {
    if (!profileMenu.contains(e.target)) {
      profileMenu.classList.remove('active');
    }
  });
}
