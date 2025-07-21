
//* Wave Animation */
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let scrollVelocity = 0;
let targetVelocity = 0;
let offset = 0;
let width, height;

let lastScroll = window.scrollY;
let scrollTimeout;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = 200;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const direction = currentScroll > lastScroll ? 1 : -1;
    targetVelocity = direction * 0.5;
    lastScroll = currentScroll;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        targetVelocity = 0;
    }, 500);
});

function drawFilledWave(offset, amplitude, frequency, colorStops, alpha) {
  const gradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
  colorStops.forEach(([pos, color]) => gradient.addColorStop(pos, color));

  ctx.beginPath();
  ctx.moveTo(0, height);

  for (let x = 0; x <= width; x++) {
    const y = (height * 0.66) + Math.sin((x + offset) * frequency) * amplitude;
    ctx.lineTo(x, y);
  }
  
  ctx.lineTo(width, height);
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.globalAlpha = alpha;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  }

let time = 0;
function animate() {
    scrollVelocity += (targetVelocity - scrollVelocity) * 0.015;
    offset += scrollVelocity;
    ctx.clearRect(0, 0, width, height);

    time += 0.004;

    const amp1 = 25 + Math.sin(time) * 5;
    const amp2 = 30 + Math.sin(time + 1) * 6;
    const amp3 = 28 + Math.sin(time + 2) * 4;

    drawFilledWave(offset, amp1, 0.02, [
        [0, "rgba(34, 92, 146, 0.8)"],
        [0.5, "rgba(200,200,200,0.5)"],
        [1, "rgba(33, 91, 167, 0.3)"]
    ], 0.4);
        drawFilledWave(offset +30, amp2, 0.02, [
        [0, "rgba(20, 81, 131, 0.8)"],
        [0.5, "rgba(255, 255, 255, 0.5)"],
        [1, "rgba(0, 0, 0, 0.3)"]
    ], 0.4);
        drawFilledWave(offset + 60, amp3, 0.02, [
        [0, "rgba(25, 54, 133, 0.8)"],
        [0.5, "rgba(53, 62, 136, 0.5)"],
        [1, "rgba(0, 0, 0, 0.3)"]
    ], 0.4);

  requestAnimationFrame(animate);
}

animate();
//-------------------------------------------------------------------------------------

//* Typing Effect */
const text = "Games Programmer | C++ / C# Developer.";
const typingTarget = document.getElementById("typing-text");

let i = 0;
let typed = "";

function typeHumanLike() {
    if (i < text.length) {
        const char = text.charAt(i);
        const makeTypo = Math.random() < 0.08 && i > 2; // 8% chance to make a typo
        
        if (makeTypo) {
            const wrongChar = String.fromCharCode(char.charCodeAt(0) + 1);
            typed += wrongChar;
            typingTarget.textContent = typed;

            setTimeout(() => {
                typed = typed.slice(0, -1); // Remove the wrong character
                typingTarget.textContent = typed;

                setTimeout(() => {
                    typed += char; // Add the correct character
                    typingTarget.textContent = typed;
                    i++;
                    setTimeout(typeHumanLike, randomDelay()); 
                }, randomDelay(30,80));
            }, randomDelay(100,200));
        } else {
            typed += char;
            typingTarget.textContent = typed;
            i++;
            setTimeout(typeHumanLike, randomDelay());
        } 
    }
}

function randomDelay(min = 40, max = 100) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

window.addEventListener("load", typeHumanLike);

//-------------------------------------------------------------------------------------

//Loading screen
let isNavigatingAway = false;
const projects = document.querySelectorAll('.project');
const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.querySelector('.loading-bar');

projects.forEach(project => {
    project.addEventListener('click', () => {
        isNavigatingAway = true;
        navBar.style.opacity = '0';
        navBar.style.pointerEvents = 'none';
        console.log("Project clicked:", project);
        loadingScreen.classList.add('active');

        loadingBar.style.width = '0%';
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 50);

        setTimeout(() => {
            const projectId = project.dataset.project.toLowerCase();
            window.location.href = `${projectId}.html`;

            console.log("Loaded:", projectId); // Debug placeholder
        }, 2200);
    });
});

//-------------------------------------------------------------------------------------

const navBar = document.getElementById('floating-nav-bar');
const header = document.querySelector('header');

function updateNavBarVisibility(e) {
    if (isNavigatingAway) return;
    const headerVisible = header.getBoundingClientRect().bottom > 0;
    const mouseTop = e.clientY < window.innerHeight * 0.1;

    if (headerVisible || mouseTop) {
        navBar.style.opacity = '1';
        navBar.style.pointerEvents = 'auto';
    } else {
        navBar.style.opacity = '0';
        navBar.style.pointerEvents = 'none';
    }
}

document.addEventListener('mousemove', updateNavBarVisibility);
window.addEventListener('scroll', () => updateNavBarVisibility({ clientY: 0 }));

//--------------------------------------------------------------------------------------

const goHome = document.getElementById("home-link");
goHome.addEventListener('click', goHomeFunction);

function goHomeFunction(e) {
    if (window.location.pathname.includes("home.html"))
    {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
    else {
        window.location.href = "home.html";
    }
}

const goAbout = document.getElementById("about-link");
goAbout.addEventListener('click', goAboutFunction);
function goAboutFunction(e) {
    e.preventDefault();
    window.location.href = "about.html";
}

const openPdf = document.getElementById("resume-link");
openPdf.addEventListener('click', openPdfFunction);
function openPdfFunction(e) {
    e.preventDefault();
    window.open("resume.pdf", "_blank");
}

const goCert = document.getElementById("cert-link");
goCert.addEventListener('click', goCertFunction);
function goCertFunction(e) {
    e.preventDefault();
    window.location.href = "certifications.html"
}

const goLinks = document.getElementById("links-link");
goLinks.addEventListener('click', goLinksFunction);
function goLinksFunction(e) {
    e.preventDefault();
    window.location.href = "links.html"
}
