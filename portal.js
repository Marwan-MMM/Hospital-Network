const portalForm = document.querySelector('.portal-form');

function showPortalMessage(type, message) {
  const msgBox = portalForm.querySelector('.form-message');
  msgBox.textContent = message;
  msgBox.className = `form-message ${type}`;
}

if (portalForm) {
  portalForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      showPortalMessage("error", "❌ Please enter both email and password.");
      return;
    }

    // Mock login credentials for demo
    if (email === "patient@example.com" && password === "demo123") {
      localStorage.setItem("userRole", "patient");
      showPortalMessage("success", "✅ Login successful! Redirecting to patient dashboard...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("userRole", "admin");
      showPortalMessage("success", "✅ Login successful! Redirecting to admin dashboard...");
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1500);
    } else {
      showPortalMessage("error", "❌ Invalid credentials. Try again.");
    }
  });
}

// Role check for protected pages
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  const path = window.location.pathname.split("/").pop();

  if (path === "admin.html" && role !== "admin") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }

  if (path === "dashboard.html" && role !== "patient") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }
});
