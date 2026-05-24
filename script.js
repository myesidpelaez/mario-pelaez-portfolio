const root = document.documentElement;
const video = document.getElementById("hero-video");
const revealItems = document.querySelectorAll("[data-reveal]");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const mobileMenu = document.querySelector(".mobile-menu");
const streamUrl = "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

function setupVideo() {
  if (!video) return;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.addEventListener("canplay", () => video.play().catch(() => {}));

  if (window.Hls && window.Hls.isSupported()) {
    const hls = new window.Hls({ enableWorker: false });
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {});
    });
    return;
  }

  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = streamUrl;
    video.addEventListener("loadedmetadata", () => video.play().catch(() => {}), { once: true });
  }

  window.addEventListener("pointerdown", () => video.play().catch(() => {}), { once: true });
}

function setMenu(open) {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
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
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 44, 260)}ms`;
  revealObserver.observe(item);
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  root.style.setProperty("--scroll-progress", `${progress}%`);
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

setupVideo();
updateProgress();
