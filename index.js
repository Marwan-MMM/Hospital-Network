// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let overlay;

function closeMenu() {
  mobileMenu.classList.remove('show');
  if (overlay) overlay.remove();
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('show');

    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.add('show');
      overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);

      overlay.addEventListener('click', closeMenu);

      // Close menu with Escape key
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
      });
    }
  });
}

// Appointment Form Submission with Spinner + Validation + Inline Messages
const appointmentForm = document.querySelector('.appointment-form');

// Utility to show inline messages
function showFormMessage(type, message) {
  const msgBox = appointmentForm.querySelector('.form-message');
  msgBox.textContent = message;
  msgBox.className = `form-message ${type}`; // success or error
}

if (appointmentForm) {
  appointmentForm.addEventListener('submit', e => {
    e.preventDefault();

    const emailInput = appointmentForm.querySelector('input[type="email"]');
    const dateInput = appointmentForm.querySelector('input[type="date"]');
    const timeInput = appointmentForm.querySelector('input[type="time"]');
    const spinner = appointmentForm.querySelector('.spinner');

    // Validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const dateValid = new Date(dateInput.value) >= new Date();
    const timeValid = timeInput.value !== "";

    if (!emailValid) {
      showFormMessage("error", "❌ Please enter a valid email address.");
      return;
    }
    if (!dateValid) {
      showFormMessage("error", "❌ Please select a future date.");
      return;
    }
    if (!timeValid) {
      showFormMessage("error", "❌ Please select a time.");
      return;
    }

    // Show spinner
    spinner.style.display = "block";

    setTimeout(() => {
      spinner.style.display = "none";
      showFormMessage("success", "✅ Appointment booked successfully! We will contact you soon.");
      appointmentForm.reset();
    }, 2000); // simulate loading
  });
}

// Doctor Search Filter (name + specialty)
const doctorSearch = document.getElementById('doctor-search');
const specialtyFilter = document.getElementById('specialty-filter');
const doctorCards = document.querySelectorAll('.doctor-card');

function filterDoctors() {
  const query = doctorSearch ? doctorSearch.value.toLowerCase() : "";
  const specialty = specialtyFilter ? specialtyFilter.value.toLowerCase() : "";

  doctorCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const matchesQuery = text.includes(query);
    const matchesSpecialty = specialty === "" || text.includes(specialty);
    card.style.display = (matchesQuery && matchesSpecialty) ? "block" : "none";
  });
}

if (doctorSearch) doctorSearch.addEventListener('input', filterDoctors);
if (specialtyFilter) specialtyFilter.addEventListener('change', filterDoctors);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenu.classList.contains('show')) {
        closeMenu();
      }
    }
  });
});

// Accessibility Controls
function increaseFont() {
  const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
  document.body.style.fontSize = (currentSize * 1.1) + "px";
}

function decreaseFont() {
  const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
  document.body.style.fontSize = (currentSize * 0.9) + "px";
}


// Language Toggle (English ↔ Arabic + Direction + Persistence)
const langToggle = document.querySelector('.lang-toggle');
const translations = {
  en: {
    logo: "Hospital Network",
    nav: ["About Us","Departments","Doctors","Appointments","Emergency","News","Patient Portal","Contact"],
    heroTitle: "Trust Your Care With Us",
    heroSubtitle: "Compassionate healthcare across our hospital and clinic network",
    appointmentBtn: "Book Appointment",
    hotline: "Emergency Hotline:",
    quickLinks: ["Emergency Hotline","Book Appointment","Find a Doctor"],
    aboutTitle: "About Our Network",
    aboutText: "We provide healthcare services across multiple hospitals and clinics, with a mission to deliver safe, compassionate, and accessible care for all patients.",
    departmentsTitle: "Departments & Services",
    departments: ["Cardiology","Pediatrics","Surgery","Radiology","Orthopedics","Dermatology","Neurology","Ophthalmology"],
    doctorsTitle: "Our Doctors",
    specialtiesFilter: ["All Specialties","Cardiologist","Pediatrician","Dermatologist","Orthopedics","Radiology"],
    doctorSpecialties: ["Cardiologist","Pediatrician","Dermatologist","Orthopedics","Radiology"],
    appointmentFormTitle: "Book an Appointment",
    formPlaceholders: ["Full Name","Email Address","Select Department","Appointment Date","Appointment Time","Submit"],
    emergencyTitle: "Emergency Services",
    emergencyText: "Call our 24/7 hotline:",
    footer: ["© 2025 Hospital Network | All Rights Reserved","📍 123 Main Street, Alexandria, Egypt","Contact Us","Privacy Policy","Terms of Service"]
  },
  ar: {
    logo: "شبكة المستشفى",
    nav: ["عنّا","الأقسام","الأطباء","المواعيد","الطوارئ","الأخبار","بوابة المرضى","اتصل"],
    heroTitle: "ثق برعايتنا",
    heroSubtitle: "رعاية صحية رحيمة عبر شبكتنا من المستشفيات والعيادات",
    appointmentBtn: "احجز موعد",
    hotline: "الخط الساخن للطوارئ:",
    quickLinks: ["الخط الساخن للطوارئ","احجز موعد","ابحث عن طبيب"],
    aboutTitle: "عن شبكتنا",
    aboutText: "نحن نقدم خدمات الرعاية الصحية عبر عدة مستشفيات وعيادات، بهدف تقديم رعاية آمنة رحيمة ومتاحة لجميع المرضى.",
    departmentsTitle: "الأقسام والخدمات",
    departments: ["القلب","طب الأطفال","الجراحة","الأشعة","العظام","الأمراض الجلدية","الأعصاب","طب العيون"],
    doctorsTitle: "أطباؤنا",
    specialtiesFilter: ["كل التخصصات","طبيب قلب","طبيب أطفال","طبيب جلدية","طبيب عظام","طبيب أشعة"],
    doctorSpecialties: ["طبيب قلب","طبيب أطفال","طبيب جلدية","طبيب عظام","طبيب أشعة"],
    appointmentFormTitle: "احجز موعد",
    formPlaceholders: ["الاسم الكامل","البريد الإلكتروني","اختر القسم","تاريخ الموعد","وقت الموعد","إرسال"],
    emergencyTitle: "خدمات الطوارئ",
    emergencyText: "اتصل بالخط الساخن على مدار الساعة:",
    footer: ["© 2025 شبكة المستشفى | جميع الحقوق محفوظة","📍 ١٢٣ شارع رئيسي، الإسكندرية، مصر","اتصل بنا","سياسة الخصوصية","شروط الخدمة"]
  }
};

let currentLang = "en";

function switchLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("preferredLang", currentLang); // save choice
  const t = translations[currentLang];

  // Header
  document.querySelector(".logo").textContent = t.logo;
  document.querySelectorAll(".nav-desktop a").forEach((a,i)=>{ if(t.nav[i]) a.textContent = t.nav[i]; });
  document.querySelectorAll("#mobile-menu a").forEach((a,i)=>{ if(t.nav[i]) a.textContent = t.nav[i]; });

  // Hero
  document.querySelector(".hero h1").textContent = t.heroTitle;
  document.querySelector(".hero p").textContent = t.heroSubtitle;
  document.querySelector(".hero .cta").textContent = t.appointmentBtn;
  document.querySelector(".hotline").childNodes[0].textContent = t.hotline+" ";

  // Quick Links
  document.querySelectorAll(".quick-links a").forEach((a,i)=>{ if(t.quickLinks[i]) a.textContent = t.quickLinks[i]; });

  // About
  document.querySelector("#about h2").textContent = t.aboutTitle;
  document.querySelector("#about p").textContent = t.aboutText;

  // Departments
  document.querySelector("#departments h2").textContent = t.departmentsTitle;
  document.querySelectorAll(".department-card").forEach((card,i)=>{ if(t.departments[i]) card.lastChild.textContent = t.departments[i]; });

   // Doctors
  document.querySelector("#doctors h2").textContent = t.doctorsTitle;
  document.querySelectorAll("#specialty-filter option").forEach((opt,i)=>{ if(t.specialtiesFilter[i]) opt.textContent = t.specialtiesFilter[i]; });
  document.querySelectorAll(".doctor-card p").forEach((p,i)=>{ if(t.doctorSpecialties[i]) p.textContent = t.doctorSpecialties[i]; });
  document.querySelectorAll(".doctor-card button").forEach(btn=>{ btn.textContent = t.appointmentBtn; });

  // Appointment Form
  document.querySelector("#appointments h2").textContent = t.appointmentFormTitle;
  const formInputs = appointmentForm.querySelectorAll("input, select, button");
  formInputs[0].placeholder = t.formPlaceholders[0]; // Full Name
  formInputs[1].placeholder = t.formPlaceholders[1]; // Email
  formInputs[2].options[0].textContent = t.formPlaceholders[2]; // Select Department
  for (let i = 1; i < formInputs[2].options.length; i++) {
    if (t.departments[i-1]) formInputs[2].options[i].textContent = t.departments[i-1];
  }
  formInputs[3].setAttribute("placeholder", t.formPlaceholders[3]); // Date
  formInputs[4].setAttribute("placeholder", t.formPlaceholders[4]); // Time
  formInputs[5].textContent = t.formPlaceholders[5]; // Submit

  // Emergency
  document.querySelector("#emergency h2").textContent = t.emergencyTitle;
  document.querySelector("#emergency p").childNodes[0].textContent = t.emergencyText + " ";

  // Footer
  const footerParas = document.querySelectorAll(".footer p");
  footerParas[0].textContent = t.footer[0];
  footerParas[1].textContent = t.footer[1];
  const footerLinks = footerParas[3].querySelectorAll("a");
  footerLinks[0].textContent = t.footer[2];
  footerLinks[1].textContent = t.footer[3];
  footerLinks[2].textContent = t.footer[4];

  // Update direction
  if (currentLang === "ar") {
    document.documentElement.setAttribute("lang", "ar");
    document.body.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("lang", "en");
    document.body.setAttribute("dir", "ltr");
  }
}

if (langToggle) {
  langToggle.addEventListener("click", switchLanguage);
}

// Persist language choice on load
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && savedLang !== currentLang) {
    currentLang = savedLang;
    switchLanguage();
  }
});

// Breadcrumb updater (optional dynamic)
const breadcrumb = document.querySelector('.breadcrumb');
if (breadcrumb) {
  const path = window.location.pathname.split("/").pop();
  if (path === "login.html") {
    breadcrumb.innerHTML = `<a href="index.html">Home</a> › <span>Patient Portal</span>`;
  }
  if (path === "contact.html") {
    breadcrumb.innerHTML = `<a href="index.html">Home</a> › <span>Contact</span>`;
  }
}
