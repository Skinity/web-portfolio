document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.horizontal-wrapper');
  const panels = Array.from(wrapper.querySelectorAll('.panel'));

  // Button scroll behavior
  function scrollToPanel(index) {
    if (index >= 0 && index < panels.length) {
      panels[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  panels.forEach((panel, index) => {
    const prevBtn = panel.querySelector('.prev-btn');
    const nextBtn = panel.querySelector('.next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => scrollToPanel(index - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => scrollToPanel(index + 1));
    }
  });

  const homeLink = document.getElementById("home-link");
  if (!homeLink) return;
  homeLink.addEventListener("click", function (e) {
    e.preventDefault();
    const path = window.location.pathname.toLowerCase();
    const isHome = path.includes("home.html") || path.endsWith("/") || path.endsWith("index.html");
    if (isHome) {
      window.scrollTo({top: 0, behavior: "smooth"});
    } else {
      window.location.href = "home.html";
    }
  });
});

//----------------------------------------------------------------------------------------------------------
// Hover Click and Expand Images on Level Design Subsection
document.addEventListener("DOMContentLoaded", () => {
  const levelImages = document.querySelectorAll(".image-content.level-design-img img");

  //Create Overlay once
  const overlay = document.createElement("div");
  overlay.className = "image-overlay";
  overlay.innerHTML = `
    <button class="close-btn" aria-label="Close image">&times;</button>
    <img src="" alt="Expanded View">
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".close-btn");

  levelImages.forEach(img => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
    }
  });
});


//----------------------------------------------------------------------------------------------------------
// Under Maintenance Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const MAINTENANCE_MODE = false;

  const MAINTENANCE_PAGES = [
    'sdl2-engine.html',
    'html-css-portfolio.html',
    'forex-simulator.html',
    'unreal-gol.html'
  ];

  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  console.log("Loaded page is:", currentPage);

  const isUnderMaintenance = MAINTENANCE_MODE || MAINTENANCE_PAGES.includes(currentPage);

  const maintenanceScreen = document.getElementById('maintenance-screen');

  if (isUnderMaintenance && maintenanceScreen) {
    maintenanceScreen.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else if (maintenanceScreen) {
    maintenanceScreen.classList.add('hidden');
  }
});