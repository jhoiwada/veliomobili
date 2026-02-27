// script.js (KODE LENGKAP YANG SUDAH DIPERBAIKI)

document.addEventListener("DOMContentLoaded", () => {
  // === BAGIAN 1: LOGIKA MENU HAMBURGER (Selalu berjalan) ===
  const navMenu = document.querySelector(".nav-menu");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const menuOverlay = document.querySelector(".menu-overlay");

  if (hamburgerBtn && navMenu && menuOverlay) {
    const toggleMenu = () => {
      navMenu.classList.toggle("is-active");
      document.body.classList.toggle("no-scroll");
      hamburgerBtn.classList.toggle("is-active"); // Animate hamburger if needed
    };

    hamburgerBtn.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", toggleMenu);

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("is-active")) {
          toggleMenu();
        }
      });
    });
  }

  // === BAGIAN BARU: NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // === BAGIAN BARU: SCROLL ANIMATIONS (FADE-IN) ===
  const fadeElements = document.querySelectorAll(".fade-in");
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Run once
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }
 
  // === BAGIAN 2: ANIMASI HITUNG-MUNDUR (Hanya jika ada) ===
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statNumbers.length > 0) {
    // Hanya jalankan jika elemen ada
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const targetVal = parseInt(el.getAttribute("data-val"));
          const duration = 2000;
          const suffix = el.innerText.replace("0", "");

          let startTime = null;

          function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentVal = Math.floor(percentage * targetVal);
            el.innerText = currentVal + suffix;

            if (progress < duration) {
              requestAnimationFrame(animateCounter);
            } else {
              el.innerText = targetVal + suffix;
            }
          }
          requestAnimationFrame(animateCounter);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => {
      counterObserver.observe(el);
    });
  }

  // === BAGIAN 3: SCROLLSPY (Hanya jika ada) ===
  const serviceNav = document.querySelector(".service-nav");

  if (serviceNav) {
    // Hanya jalankan jika elemen ada
    const sections = document.querySelectorAll(".service-showcase");
    const navLinks = document.querySelectorAll(".service-nav a");

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    };

    const spyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(
            `.service-nav a[href="#${id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      spyObserver.observe(section);
    });
  }

  // === BAGIAN 4: FILTER GALERI (Hanya jika ada) ===
  const filterContainer = document.querySelector(".gallery-filters");

  if (filterContainer) {
    // Hanya jalankan jika elemen ada
    const filterButtons = filterContainer.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (filterValue === "semua" || filterValue === itemCategory) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  }
}); // Akhir dari DOMContentLoaded
