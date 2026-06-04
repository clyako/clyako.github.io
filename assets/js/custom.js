/* ============================================
   Collapsible tables (existing behavior)
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* ============================================
     Publications heading: align with text column
     ============================================ */
  document.fonts.ready.then(function () {
    var firstContent = document.querySelector('.pub-content');
    var title = document.querySelector('.pub-page-title');
    if (firstContent && title) {
      var offset = firstContent.getBoundingClientRect().left
                   - title.parentElement.getBoundingClientRect().left;
      title.style.marginLeft = offset + 'px';
    }
  });

  /* ============================================
     Diagonal dot wave background
     ============================================ */
  const hoverSources = []; // populated by timeline hover section below

  {
    const cv = document.createElement('canvas');
    cv.id = 'bg-dots';
    cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:-1;';
    document.body.prepend(cv);
    const cx = cv.getContext('2d');
    const GRID = 15, R_MIN = 1.0, R_MAX = 2.0;
    const SPEED = 0.00168, FREQ = 0.0135;

    const resizeDots = () => {
      cv.width  = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resizeDots();
    window.addEventListener('resize', resizeDots, { passive: true });

    const drawDots = (ts) => {
      // Prune fully decayed pulse sources (lifetime ~5 s)
      for (let i = hoverSources.length - 1; i >= 0; i--) {
        if (ts - hoverSources[i].t > 5000) hoverSources.splice(i, 1);
      }

      const W = cv.width, H = cv.height;

      // Three virtual sources drifting on smooth independent paths
      const srcs = [
        { x: W * (0.5 + 0.38 * Math.sin(ts * 0.000087)),       y: H * (0.5 + 0.38 * Math.cos(ts * 0.000113)) },
        { x: W * (0.5 + 0.38 * Math.sin(ts * 0.000097 + 2.1)), y: H * (0.5 + 0.38 * Math.cos(ts * 0.000073 + 1.3)) },
        { x: W * (0.5 + 0.38 * Math.sin(ts * 0.000063 + 4.2)), y: H * (0.5 + 0.38 * Math.cos(ts * 0.000103 + 0.7)) },
      ];

      cx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / GRID) + 1;
      const rows = Math.ceil(H / GRID) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID, y = r * GRID;

          let wave = 0;
          for (const s of srcs) {
            wave += Math.sin(Math.sqrt((x - s.x) ** 2 + (y - s.y) ** 2) * FREQ - ts * SPEED);
          }

          // Hover-triggered single expanding pulse rings (Gaussian envelope)
          for (const s of hoverSources) {
            const age  = ts - s.t;
            const dist = Math.sqrt((x - s.x) ** 2 + (y - s.y) ** 2);
            const diff = dist - age * 0.25;        // ring expands at 250 px/s
            wave += 2.5 * Math.exp(-(diff * diff) / 9800)  // ring width σ≈70 px
                        * Math.exp(-age * 0.0005);          // global fade over ~2 s
          }

          // tanh squash → amp in [0, 1]; minimum kept high so trough dots stay visible
          const amp = 0.5 + 0.5 * Math.tanh(wave * 0.5);
          cx.beginPath();
          cx.arc(x, y, R_MIN + (R_MAX - R_MIN) * amp, 0, 6.283);
          cx.fillStyle = `rgba(89,83,73,${(0.05 + 0.08 * amp).toFixed(3)})`;
          cx.fill();
        }
      }
      requestAnimationFrame(drawDots);
    };
    requestAnimationFrame(drawDots);
  }

  /* ============================================
     Frosted masthead on scroll
     ============================================ */
  const masthead = document.querySelector('.masthead');
  if (masthead) {
    const updateMasthead = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop ?? 0;
      masthead.classList.toggle('masthead--scrolled', y > 10);
    };
    window.addEventListener('scroll',   updateMasthead, { passive: true });
    document.addEventListener('scroll', updateMasthead, { passive: true });
    updateMasthead(); // apply correct state on page load
  }

  /* ============================================
     Masthead dropdown: highlight active project
     ============================================ */
  const path = window.location.pathname;
  document.querySelectorAll('.masthead__dropdown-item a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) {
      link.classList.add('masthead__dropdown-link--active');
      if (!link.querySelector('.masthead__dropdown-active-arrow')) {
        const arrow = document.createElement('span');
        arrow.className = 'masthead__dropdown-active-arrow';
        arrow.textContent = '▶';
        link.insertBefore(arrow, link.firstChild);
      }
    }
  });


  document.querySelectorAll('.project-details summary').forEach((summary) => {
    summary.addEventListener('click', (e) => {
      e.preventDefault();

      const details = summary.parentNode;
      const content = details.querySelector('.small-table');

      if (!details.hasAttribute('open')) {
        details.setAttribute('open', 'true');
        setTimeout(() => {
          content.classList.add('is-open');
          summary.classList.add('is-open-arrow');
        }, 10);
      } else {
        content.classList.remove('is-open');
        summary.classList.remove('is-open-arrow');
        setTimeout(() => {
          details.removeAttribute('open');
        }, 400);
      }
    });
  });

  /* ============================================
     Scroll reveal: fade-in elements on project pages
     ============================================ */
  const isProjectPage = document.querySelector('.page__content') &&
                        !document.querySelector('.project-container');

  if (isProjectPage) {
    const revealTargets = document.querySelectorAll(
      '.page__content > p, .page__content > h2, .page__content > h3, ' +
      '.page__content > ul, .page__content > ol, .page__content > blockquote, ' +
      '.page__content > .notice, .page__content > .notice--info, ' +
      '.page__content > .notice--warning, .page__content > .notice--danger, ' +
      '.page__content > figure, .page__content > img, ' +
      '.page__content > .physics-widget, .page__content > .project-details, ' +
      '.page__content > .pub-entry, .page__content > .pub-page-header'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el, i) => {
      el.classList.add('scroll-reveal');
      el.style.transitionDelay = Math.min(i * 0.04, 0.3) + 's';
      observer.observe(el);
    });
  }

  /* ============================================
     Homepage timeline: stagger layout + scroll reveal
     ============================================ */
  const timeline = document.querySelector('.timeline');
  if (timeline) {

    function layoutTimeline() {
      const children = Array.from(timeline.children);

      if (window.innerWidth <= 700) {
        timeline.style.height = '';
        children.forEach(item => {
          item.style.position = '';
          item.style.top      = '';
          item.style.left     = '';
          item.style.right    = '';
        });
        return;
      }

      // Equal spacing: each entry is separated by PX_PER_RANK regardless of
      // calendar distance, so the timeline scales to content rather than time.
      const PX_PER_RANK = 150;
      const ENTRY_GAP   = 14;  // minimum px between same-side entries
      const PAD_B       = 16;  // entry padding-bottom (excluded from content height)

      const heightMap = new Map(children.map(el => [el, el.getBoundingClientRect().height]));

      function getYear(el) { return parseInt(el.dataset.year)  || 2020; }
      function getMon(el)  { return parseInt(el.dataset.month) || 6;    }

      const entryEls = children.filter(el => el.classList.contains('tl-entry'));

      // Sort all entries newest-first and assign rank-based y positions.
      // TOP_OFFSET shifts rank-0's ideal dot down so its entry top lands at
      // exactly ENTRY_GAP — no floor clamping, so all dot spacings are equal.
      const sorted = [...entryEls].sort((a, b) =>
        (getYear(b) * 12 + getMon(b)) - (getYear(a) * 12 + getMon(a))
      );
      const firstH    = sorted.length ? (heightMap.get(sorted[0]) || 0) : 0;
      const firstCH   = Math.max(firstH - PAD_B, 0);
      const TOP_OFFSET = Math.round(firstCH / 2) + ENTRY_GAP;
      const rankMap = new Map(sorted.map((el, i) => [el, TOP_OFFSET + i * PX_PER_RANK]));

      function idealDotY(el) {
        return rankMap.get(el) ?? 0;
      }

      function byRank(a, b) { return idealDotY(a) - idealDotY(b); }

      const leftEntries  = entryEls.filter(el => el.classList.contains('tl-entry--left')).sort(byRank);
      const rightEntries = entryEls.filter(el => el.classList.contains('tl-entry--right')).sort(byRank);

      function placeEntries(entries) {
        let floor = 0;
        entries.forEach(el => {
          const h        = heightMap.get(el) || 0;
          const contentH = Math.max(h - PAD_B, 0);
          const fixedTop = el.dataset.top;
          let top;
          if (fixedTop !== undefined && fixedTop !== '') {
            top = parseInt(fixedTop);
          } else {
            const tgt = idealDotY(el) - contentH / 2;
            top = Math.max(tgt, floor + ENTRY_GAP);
          }

          el.style.position = 'absolute';
          el.style.left  = '0';
          el.style.right = '0';
          el.style.top   = Math.round(top) + 'px';

          floor = top + h;
        });
        return floor;
      }

      const leftFloor  = placeEntries(leftEntries);
      const rightFloor = placeEntries(rightEntries);

      timeline.style.position = 'relative';
      timeline.style.height   = Math.max(leftFloor, rightFloor) + ENTRY_GAP + 'px';
    }

    // Scroll reveal for timeline entries — toggle so animations replay on re-entry
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('tl-visible', entry.isIntersecting);
      });
    }, { threshold: 0 });

    function observeEntries() {
      document.querySelectorAll('.tl-entry').forEach(el => tlObserver.observe(el));
    }

    layoutTimeline();
    observeEntries();

    // After fonts load: fix capped compacts and re-layout.
    // Using fonts.ready instead of window.load avoids waiting for images.
    document.fonts.ready.then(() => {
      fitCappedCompacts();
      layoutTimeline();
      observeEntries();
    });

    // Re-layout on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        fitCappedCompacts();
        layoutTimeline();
      }, 150);
    });
  }

  /* ============================================
     Dot pulse on entry hover — uses a real child
     element so void offsetWidth reliably restarts
     the animation (doesn't work on ::after)
     ============================================ */
  document.querySelectorAll('.tl-entry').forEach(entry => {
    const dot = entry.querySelector('.tl-dot');
    if (!dot) return;

    const ring = document.createElement('span');
    ring.className = 'tl-dot-ring';
    dot.appendChild(ring);

    entry.querySelectorAll(
      '.tl-cell--left:not(.tl-cell--empty), .tl-cell--right:not(.tl-cell--empty), .tl-cell--dot'
    ).forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        // Dot ring pulse
        ring.classList.remove('pulsing');
        void ring.offsetWidth;
        ring.classList.add('pulsing');

        // Single expanding background pulse — fires once per hover
        const rect = dot.getBoundingClientRect();
        hoverSources.push({
          x: rect.left + rect.width  / 2,
          y: rect.top  + rect.height / 2,
          t: performance.now(),
        });
      });
      cell.addEventListener('mouseleave', () => {
        ring.classList.remove('pulsing');
        // pulse fades on its own — no action needed
      });
    });
  });

  /* ============================================
     Fix only compacts that are capped at max-width
     (width: max-content alone can't help when the
     title is longer than 280 px and wraps, leaving
     empty space between the connector and the text).
     All other entries are handled by CSS alone.
     ============================================ */
  function fitCappedCompacts() {
    document.querySelectorAll('.tl-entry__inner .tl-compact').forEach(function(compact) {
      // Only act when the compact has hit its 280 px ceiling
      if (compact.offsetWidth < 275) return;

      // Find the widest rendered text line
      var maxLineW = 0;
      var walker = document.createTreeWalker(
        compact, NodeFilter.SHOW_TEXT, null, false
      );
      var node;
      while ((node = walker.nextNode()) !== null) {
        if (!node.textContent.trim()) continue;
        var range = document.createRange();
        range.selectNode(node);
        var rects = range.getClientRects();
        for (var i = 0; i < rects.length; i++) {
          if (rects[i].width > maxLineW) maxLineW = rects[i].width;
        }
      }

      // Only shrink if the widest line is measurably shorter than the cap.
      // +4px buffer prevents sub-pixel reflow after resizing.
      if (maxLineW > 0 && maxLineW < compact.offsetWidth - 8) {
        var w = Math.ceil(maxLineW) + 4;
        compact.style.width = w + 'px';
        compact.style.flex  = '0 0 ' + w + 'px';
      }
    });
  }

});
