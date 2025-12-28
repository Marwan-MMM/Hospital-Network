// Role check for patient dashboard
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role !== "patient") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }
});

// Logout helper (clears role)
function logout() {
  localStorage.removeItem("userRole");
}

// Profile form submission
const profileForm = document.querySelector('.profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', e => {
    e.preventDefault();
    const msgBox = profileForm.querySelector('.form-message');
    msgBox.textContent = "✅ Profile updated successfully!";
    msgBox.className = "form-message success";
    setTimeout(() => msgBox.textContent = "", 3000);
  });
}

// Contact doctor form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const msgBox = contactForm.querySelector('.form-message');
    msgBox.textContent = "✅ Message sent to doctor!";
    msgBox.className = "form-message success";
    setTimeout(() => msgBox.textContent = "", 3000);
    contactForm.reset();
  });
}
