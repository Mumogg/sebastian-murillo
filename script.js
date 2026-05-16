/* Sebastián Murillo — Portfolio
 * Tiny vanilla JS. No frameworks, no build, no dependencies.
 * Honors prefers-reduced-motion.
 */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -- 1. Live "now" line: today's date in lowercase, plus current focus --- */
  var nowEl = document.getElementById("now-line");
  if (nowEl) {
    try {
      var today = new Date();
      var fmt = new Intl.DateTimeFormat("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }).format(today).toLowerCase();
      nowEl.textContent = fmt + " · reactivating React, deepening TypeScript, ramping on Adobe Experience Manager.";
    } catch (e) {
      /* leave the static fallback in place */
    }
  }

  /* -- 2. Footer year stamp ------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* -- 3. Reveal on scroll via IntersectionObserver ------------------------ */
  var revealNodes = document.querySelectorAll("[data-reveal]");
  var revealAll = function () {
    revealNodes.forEach(function (n) { n.classList.add("is-revealed"); });
  };

  /* Dev escape hatch: ?reveal-all or #reveal-all forces every section open.
     Useful for screenshot tools, link previews, and local debugging. */
  var devForce = location.search.indexOf("reveal-all") !== -1
              || location.hash.indexOf("reveal-all") !== -1;

  if (prefersReduced || devForce || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealNodes.forEach(function (n) { io.observe(n); });

    /* Hero is above-the-fold — reveal it on next frame so the orchestrated
       stagger fires reliably even if the observer is late. */
    requestAnimationFrame(function () {
      document.querySelectorAll(".hero [data-reveal]").forEach(function (n) {
        n.classList.add("is-revealed");
      });
    });

    /* Safety net: if for any reason a node never intersects (very tall
       viewport, headless renderer, crawler) reveal everything after 1.5s
       so content is never permanently invisible. Also force on full load,
       so static-render snapshotters never capture empty sections. */
    setTimeout(revealAll, 1500);
    window.addEventListener("load", function () {
      setTimeout(revealAll, 0);
    });
  }

  /* -- 4. Carousel(s) ----------------------------------------------------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var slides = root.querySelectorAll("[data-carousel-track] > li");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    var current = root.querySelector("[data-carousel-current]");
    var total = slides.length;
    var idx = 0;
    function show(n) {
      idx = (n + total) % total;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      if (current) current.textContent = String(idx + 1);
    }
    if (prevBtn) prevBtn.addEventListener("click", function () { show(idx - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(idx + 1); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  { e.preventDefault(); show(idx - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(idx + 1); }
    });

    /* Swipe support: only single-finger horizontal gestures past 40px */
    var startX = null;
    root.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { startX = null; return; }
      startX = e.touches[0].clientX;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      show(idx + (dx < 0 ? 1 : -1));
    });
  });

  /* -- 5. Console easter egg ---------------------------------------------- */
  if (window.console && console.log) {
    var head = "color:#c2410c;font:600 14px/1.2 ui-monospace,monospace;";
    var body = "color:#5c554f;font:400 12px/1.4 ui-monospace,monospace;";
    console.log("%cSebastián Murillo · Front End Developer", head);
    console.log(
      "%c—\nCosta Rica · sebastianmurillomoracr@gmail.com\n" +
      "If you read source, we should probably talk.\n—",
      body
    );
  }
})();
