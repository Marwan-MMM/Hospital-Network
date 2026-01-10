// Role check for admin dashboard
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role !== "admin") {
    alert("⚠️ Unauthorized access. Redirecting to login.");
    window.location.href = "login.html";
  }

  // Load appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const tableBody = document.getElementById("appointmentsTable");

  if (tableBody) {
    tableBody.innerHTML = "";

    if (appointments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="6">No appointments found.</td>`;
      tableBody.appendChild(row);
    } else {
      appointments.forEach((app, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${app.fullName}</td>
          <td>${app.date}</td>
          <td>${app.time}</td>
          <td>${app.department}</td>
          <td>${app.doctor || "Pending Assignment"}</td>
          <td>
            <span class="status">${app.status || "Pending"}</span>
            <button class="cta approve">Approve</button>
            <button class="cta cancel">Cancel</button>
          </td>
        `;
        tableBody.appendChild(row);

        const approveBtn = row.querySelector(".approve");
        const cancelBtn = row.querySelector(".cancel");
        const statusSpan = row.querySelector(".status");

        approveBtn.addEventListener("click", () => {
          appointments[index].status = "Approved";
          localStorage.setItem("appointments", JSON.stringify(appointments));
          statusSpan.textContent = "Approved";
          statusSpan.style.color = "#22c55e";
        });

        cancelBtn.addEventListener("click", () => {
          appointments[index].status = "Cancelled";
          localStorage.setItem("appointments", JSON.stringify(appointments));
          statusSpan.textContent = "Cancelled";
          statusSpan.style.color = "#ef4444";
        });
      });
    }
  }
});

// Logout helper
function logout() {
  localStorage.removeItem("userRole");
}

// Doctor management buttons
document.querySelectorAll('.admin-doctors .cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const li = btn.parentElement;
    const currentText = li.firstChild.textContent.trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.style.marginRight = "0.5rem";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "cta";

    li.innerHTML = "";
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      const newText = input.value.trim();
      li.innerHTML = `${newText} <button class="cta">Edit</button>`;
      li.querySelector("button").addEventListener("click", () => {
        alert(`Editing doctor: ${newText}`);
      });
    });
  });
});

// Patient records toggle
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
