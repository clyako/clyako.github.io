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
  // Shared state for 3-D dot wave ↔ hover pulse integration
  const hoverSources = [];
  const BG_S_MIN = 0.35;          // perspective scale at horizon
  let bgFloorY = 0, bgHorizonY = 0, bgWD = 0;

  {
    const cv = document.createElement('canvas');
    cv.id = 'bg-dots';
    cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:-1;';
    document.body.prepend(cv);
    const cx = cv.getContext('2d');

    const COLS = 144, ROWS = 42;
    const SPEED = 0.00168, FREQ = 0.012;

    let W, H, CELL, W_W, W_D;

    const updateDims = () => {
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;
      CELL       = W * 3.0 / (COLS - 1);   // 3.0 × 0.35 > 1 → back row fills corners
      bgFloorY   = H * 1.0;               // reach screen bottom
      bgHorizonY = H * 0.01;              // horizon at very top edge
      W_W        = (COLS - 1) * CELL;
      bgWD = W_D = (ROWS - 1) * CELL;
    };
    updateDims();
    window.addEventListener('resize', updateDims, { passive: true });

    const drawDots = (ts) => {
      // Prune fully decayed pulse sources
      for (let i = hoverSources.length - 1; i >= 0; i--) {
        if (ts - hoverSources[i].t > 5000) hoverSources.splice(i, 1);
      }

      // Four traveling plane waves in distinct directions.
      // Each wave has flat wavefronts perpendicular to its direction vector,
      // creating horizontal, depth (vertical), and two diagonal patterns.
      // Incommensurable speeds ensure the pattern never fully repeats.
      const K  = FREQ, Kd = FREQ * 0.71;
      const ph0 = ts * SPEED * 1.00,   // → horizontal
            ph1 = ts * SPEED * 0.83,   // ↓ depth (vertical on screen)
            ph2 = ts * SPEED * 1.09,   // ↘ diagonal
            ph3 = ts * SPEED * 0.91;   // ↙ diagonal

      cx.clearRect(0, 0, W, H);

      // Render back-to-front (row 0 = horizon/back, row ROWS-1 = near/front)
      // rowC: non-linear Y so row spacing ∝ scale — grid looks square at every depth
      const rowC = 2 * (bgFloorY - bgHorizonY) / ((ROWS - 1) * (1 + BG_S_MIN));
      for (let row = 0; row < ROWS; row++) {
        const t      = row / (ROWS - 1);
        const scale  = BG_S_MIN + t * (1 - BG_S_MIN);
        const baseY  = bgHorizonY + rowC * (row * BG_S_MIN + (1 - BG_S_MIN) * row * row / (2 * (ROWS - 1)));
        const worldZ = (1 - t) * W_D;

        for (let col = 0; col < COLS; col++) {
          const worldX = (col - (COLS - 1) / 2) * CELL;

          let wave   = Math.sin( worldX * K              - ph0 + 0.0)   // →
                     + Math.sin( worldZ * K              - ph1 + 2.1)   // ↓
                     + Math.sin( worldX * Kd + worldZ * Kd - ph2 + 4.2) // ↘
                     + Math.sin(-worldX * Kd + worldZ * Kd - ph3 + 1.5);// ↙

          // Hover pulse rings expanding in world space
          for (const s of hoverSources) {
            const age  = ts - s.t;
            const d    = Math.sqrt((worldX - s.wx) ** 2 + (worldZ - s.wz) ** 2);
            const diff = d - age * 0.24;
            wave += 2.5 * Math.exp(-(diff * diff) / (8 * CELL * CELL))
                        * Math.exp(-age * 0.0005);
          }

          const amp     = 0.5 + 0.5 * Math.tanh(wave * 0.5);
          const screenX = W / 2 + worldX * scale;
          const screenY = baseY - amp * 60 * scale;          // wave height = 3-D bump
          const dotR  = 0.8 + (0.1 + 2.1 * amp) * scale; // size = depth cue
          const alpha = 0.09 + 0.15 * amp;             // flat floor — dots always visible

          cx.beginPath();
          cx.arc(screenX, screenY, dotR, 0, 6.283);
          cx.fillStyle = `rgba(89,83,73,${alpha.toFixed(3)})`;
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
        ring.classList.remove('pulsing');
        void ring.offsetWidth;
        ring.classList.add('pulsing');

        // Convert dot's viewport position → world space for the 3-D pulse
        const rect = dot.getBoundingClientRect();
        const sx  = rect.left + rect.width  / 2;
        const sy  = rect.top  + rect.height / 2;
        const tS  = Math.max(0, Math.min(1, (sy - bgHorizonY) / (bgFloorY - bgHorizonY)));
        const sS  = Math.max(0.01, BG_S_MIN + tS * (1 - BG_S_MIN));
        hoverSources.push({
          wx: (sx - window.innerWidth / 2) / sS,
          wz: (1 - tS) * bgWD,
          t:  performance.now(),
        });
      });
      cell.addEventListener('mouseleave', () => ring.classList.remove('pulsing'));
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
