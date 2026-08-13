(() => {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- NAV scroll state ---------------- */
  const nav = document.getElementById("nav");
  const scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });
  mobileMenu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => mobileMenu.classList.remove("is-open"))
  );

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach(el => {
    const delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--delay", delay + "ms");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Timeline gradient fill on scroll ---------------- */
  const timeline = document.getElementById("timeline");
  const timelineFill = document.getElementById("timelineFill");

  function updateTimelineFill() {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    // progress: how much of the timeline has passed the viewport's lower-middle line
    const triggerLine = vh * 0.75;
    const scrolled = triggerLine - rect.top;
    const pct = Math.max(0, Math.min(1, scrolled / total));
    timelineFill.style.height = (pct * 100) + "%";
  }
  window.addEventListener("scroll", updateTimelineFill, { passive: true });
  window.addEventListener("resize", updateTimelineFill);
  updateTimelineFill();

  /* ---------------- Constellation background (hero) ---------------- */
  const dotsG = document.getElementById("constellationDots");
  const linesG = document.getElementById("constellationLines");
  if (dotsG && linesG) {
    const W = 1200, H = 800, COUNT = 34;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.6
    }));

    pts.forEach(p => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", p.x);
      c.setAttribute("cy", p.y);
      c.setAttribute("r", p.r);
      dotsG.appendChild(c);
    });

    const MAX_DIST = 150;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", pts[i].x);
          line.setAttribute("y1", pts[i].y);
          line.setAttribute("x2", pts[j].x);
          line.setAttribute("y2", pts[j].y);
          line.setAttribute("opacity", (1 - dist / MAX_DIST) * 0.6);
          linesG.appendChild(line);
        }
      }
    }
  }

  /* ---------------- Custom cursor ---------------- */
  const cursorDot = document.getElementById("cursorDot");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a, button, .company-card__media img, .marquee__item").forEach(el => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("is-hover"));
    });
  }

  /* ---------------- Marquee build ---------------- */
  const marqueeImages = [
    { src: "assets/img/snakey-2.jpg", tag: "Snakey.Cash" },
    { src: "assets/img/finixio-3.jpg", tag: "Finixio" },
    { src: "assets/img/alias-4.jpg", tag: "Alias" },
    { src: "assets/img/dod-2.jpg", tag: "Do or Drink" },
    { src: "assets/img/blockrot-5.jpg", tag: "Blockrot" },
    { src: "assets/img/finixio-1.jpg", tag: "Finixio" },
    { src: "assets/img/alias-3.jpg", tag: "Alias" },
    { src: "assets/img/dod-4.jpg", tag: "Do or Drink" },
    { src: "assets/img/blockrot-1.jpg", tag: "Blockrot" },
    { src: "assets/img/finixio-2.jpg", tag: "Finixio" },
    { src: "assets/img/alias-1.jpg", tag: "Alias" },
    { src: "assets/img/dod-1.jpg", tag: "Do or Drink" },
    { src: "assets/img/blockrot-4.jpg", tag: "Blockrot" },
    { src: "assets/img/dod-3.jpg", tag: "Do or Drink" },
    { src: "assets/img/alias-5.jpg", tag: "Alias" },
    { src: "assets/img/blockrot-3.jpg", tag: "Blockrot" },
    { src: "assets/img/blockrot-2.jpg", tag: "Blockrot" },
    { src: "assets/img/snakey-1.jpg", tag: "Snakey.Cash" }
  ];

  const track = document.getElementById("marqueeTrack");
  function buildMarqueeItem(item) {
    const div = document.createElement("div");
    div.className = "marquee__item";
    div.innerHTML = `<img src="${item.src}" alt="${item.tag} project screenshot" loading="lazy"><span class="marquee__tag">${item.tag}</span>`;
    div.addEventListener("click", () => openLightbox(item.src));
    return div;
  }
  // duplicate the set once for a seamless loop
  [...marqueeImages, ...marqueeImages].forEach(item => track.appendChild(buildMarqueeItem(item)));

  /* ---------------- Lightbox ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".company-card__media img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src));
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

})();
