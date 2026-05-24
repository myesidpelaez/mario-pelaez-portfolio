const root = document.documentElement;
const canvas = document.getElementById("lab-canvas");
const ctx = canvas?.getContext("2d");
const revealItems = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const mobileMenu = document.querySelector(".mobile-menu");

let width = 0;
let height = 0;
let dpr = 1;
let nodes = [];
let animationFrame = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = width < 720 ? 30 : 52;
  nodes = Array.from({ length: count }, (_, index) => ({
    x: (index / count) * width + Math.random() * 80,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.14,
    r: Math.random() * 1.2 + 0.45,
  }));
}

function drawBackground() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width * 0.74, height * 0.18, 0, width * 0.74, height * 0.18, width * 0.62);
  gradient.addColorStop(0, "rgba(40, 96, 216, 0.18)");
  gradient.addColorStop(0.46, "rgba(18, 53, 116, 0.07)");
  gradient.addColorStop(1, "rgba(5, 7, 12, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -30) node.x = width + 30;
    if (node.x > width + 30) node.x = -30;
    if (node.y < -30) node.y = height + 30;
    if (node.y > height + 30) node.y = -30;

    for (let j = i + 1; j < nodes.length; j += 1) {
      const other = nodes[j];
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.hypot(dx, dy);
      const maxDistance = width < 720 ? 112 : 154;

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.16;
        ctx.strokeStyle = `rgba(166, 181, 209, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = "rgba(215, 223, 238, 0.32)";
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
  }

  animationFrame = window.requestAnimationFrame(drawBackground);
}

function setupCanvas() {
  if (!canvas || !ctx) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  resizeCanvas();
  drawBackground();

  if (prefersReducedMotion) {
    window.cancelAnimationFrame(animationFrame);
  }
}

function setMenu(open) {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => setMenu(true));
menuClose?.addEventListener("click", () => setMenu(false));
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 38, 260)}ms`;
  revealObserver.observe(item);
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  root.style.setProperty("--scroll-progress", `${progress}%`);
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  updateProgress();
});
window.addEventListener("scroll", updateProgress, { passive: true });

setupCanvas();
updateProgress();
