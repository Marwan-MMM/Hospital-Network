// Role check for admin dashboard
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role !== "admin") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }
});

// Logout helper (clears role)
function logout() {
  localStorage.removeItem("userRole");
}

// Appointment management buttons
document.querySelectorAll('.admin-appointments tr').forEach(row => {
  const approveBtn = row.querySelector('button:nth-child(1)');
  const cancelBtn = row.querySelector('button:nth-child(2)');

  if (approveBtn) {
    approveBtn.addEventListener('click', () => {
      approveBtn.textContent = "Approved";
      approveBtn.style.backgroundColor = "#22c55e"; // green
      approveBtn.style.color = "#fff";
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.backgroundColor = "";
      cancelBtn.style.color = "";
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      approveBtn.textContent = "Cancelled";
      approveBtn.style.backgroundColor = "#ef4444"; // red
      approveBtn.style.color = "#fff";
      cancelBtn.textContent = "Cancelled";
      cancelBtn.style.backgroundColor = "#ef4444";
      cancelBtn.style.color = "#fff";
    });
  }
});

// Doctor management buttons
document.querySelectorAll('.admin-doctors .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.parentElement;
    const currentText = li.firstChild.textContent.trim();

    // Replace text with editable input
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.style.marginRight = "0.5rem";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "cta";

    // Clear existing content and append input + save
    li.innerHTML = "";
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      const newText = input.value.trim();
      li.innerHTML = `${newText} <button class="cta">Edit</button>`;
      // Reattach edit functionality
      li.querySelector("button").addEventListener("click", () => {
        alert(`Editing doctor: ${newText}`);
      });
    });
  });
});

// Patient records button
const recordBtn = document.getElementById('recordsBtn');
const recordsContainer = document.getElementById('recordsContainer');

if (recordBtn && recordsContainer) {
  recordBtn.addEventListener('click', () => {
    if (recordsContainer.style.display === "none") {
      recordsContainer.style.display = "block";
      recordBtn.textContent = "Hide Records";
    } else {
      recordsContainer.style.display = "none";
      recordBtn.textContent = "Access Records";
    }
  });
}

