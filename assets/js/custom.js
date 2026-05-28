/* ============================================
   Collapsible tables (existing behavior)
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {

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
      '.page__content > .physics-widget, .page__content > .project-details'
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

    // Re-layout after all resources load (fixes height measurement with unloaded images/fonts)
    window.addEventListener('load', () => {
      layoutTimeline();
      observeEntries();
    });

    // Re-layout on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutTimeline, 150);
    });
  }

});
