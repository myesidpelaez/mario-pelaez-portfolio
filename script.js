const root = document.documentElement;
const canvas = document.getElementById("agent-canvas");
const ctx = canvas.getContext("2d");
const revealItems = document.querySelectorAll("[data-reveal]");

let width = 0;
let height = 0;
let nodes = [];
let pointer = { x: 0, y: 0, active: false };

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(34, Math.floor((width * height) / 26000));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: index % 7 === 0 ? 1.8 : 1.1,
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#08090d";
  ctx.fillRect(0, 0, width, height);

  const maxDistance = Math.min(170, width * 0.18);

  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        const alpha = (1 - dist / maxDistance) * 0.18;
        ctx.strokeStyle = `rgba(231, 201, 141, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  if (pointer.active) {
    const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 240);
    gradient.addColorStop(0, "rgba(231, 201, 141, 0.15)");
    gradient.addColorStop(0.48, "rgba(255, 114, 92, 0.08)");
    gradient.addColorStop(1, "rgba(8, 9, 13, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(pointer.x - 240, pointer.y - 240, 480, 480);
  }

  for (const node of nodes) {
    ctx.fillStyle = "rgba(248, 243, 234, 0.62)";
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawNetwork);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 38, 220)}ms`;
  revealObserver.observe(item);
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  root.style.setProperty("--scroll-progress", `${progress}%`);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  updateProgress();
});

window.addEventListener("scroll", updateProgress, { passive: true });

window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
});

window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

resizeCanvas();
drawNetwork();
updateProgress();
