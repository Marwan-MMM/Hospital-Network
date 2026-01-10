// Role check for patient dashboard
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role !== "patient") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }

  // Load appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const tableBody = document.getElementById("patientAppointments");

  if (tableBody) {
    tableBody.innerHTML = "";

    if (appointments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5">No appointments booked yet.</td>`;
      tableBody.appendChild(row);
    } else {
      appointments.forEach((app, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${app.date}</td>
          <td>${app.time}</td>
          <td>${app.department}</td>
          <td>${app.doctor || "Pending Assignment"}</td>
          <td>${app.status || "Pending"} 
            ${app.status !== "Cancelled" ? '<button class="cta cancel-patient">Cancel</button>' : ''}
          </td>
        `;
        tableBody.appendChild(row);

        // Cancel button logic
        const cancelBtn = row.querySelector(".cancel-patient");
        if (cancelBtn) {
          cancelBtn.addEventListener("click", () => {
            appointments[index].status = "Cancelled";
            localStorage.setItem("appointments", JSON.stringify(appointments));

            // Update UI immediately
            row.cells[4].innerHTML = "Cancelled";
          });
        }
      });
    }
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
