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
      nowEl.textContent = fmt + " · reactivating React, learning Adobe Experience Manager.";
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

  /* -- 4. Console easter egg ---------------------------------------------- */
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
