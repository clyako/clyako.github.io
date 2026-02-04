---
layout: single
permalink: /publications/
---

<style>
  /* 1. Main Page Container */
  .page {
    width: 100% !important;
    max-width: 900px !important;
    float: none !important;
    margin-left: auto !important;
    margin: 20px auto !important;
    padding: 0 10px !important;
  }

  /* 2. Button Container */
  .pub-buttons {
    margin-top: 10px;
    margin-bottom: 45px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
    align-items: center; /* Crucial for vertical alignment */
    position: relative;
    line-height: 1; /* Removes extra vertical space from text-line height */
  }

  .pub-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none !important;
    border-radius: 4px;
    width: 24px;  /* Strict width */
    height: 24px; /* Strict height */
    transition: transform 0.15s ease-out, filter 0.15s ease-out;
    /* box-sizing: border-box; */
    /* overflow: hidden;  */
  }

  /* Standardizing the icon sizes inside the boxes */
  .pub-link i {
    font-size: 14px; /* Fixed size for standard icons */
    line-height: 1;
    display: block;
  }

  /* Specific fix for GitHub brand icon to match visual weight */
  .pub-link .fa-github, 
  .pub-link .fa-square-github {
    font-size: 27px !important; /* Matches the box exactly */
    color: #000 !important;
  }

  /* Re-applying colors to ensure they stay solid */
  .link-paper { background-color: #d4d4d4; color: #000000 !important; }
  .link-video { background-color: #FF0000; color: #fff !important; }
  .link-web   { background-color: #007bff; color: #fff !important; }
  
  /* GitHub doesn't need a background-color since the icon itself is black */
  .link-github { background-color: transparent; }

  /* 4. BibTeX Button Style Refined */
  .bib-btn {
    cursor: pointer;
    background: #f8f9fa;
    color: #444;
    padding: 0 10px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 400;
    border: 1px solid #ddd;
    /* Removed uppercase here */
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    line-height: 1;
    vertical-align: middle;
  }

  .pub-link:hover, .bib-btn:hover { 
    transform: scale(1.1); /* Scales the whole button up by 10% */
    filter: brightness(1.1); /* Optional: makes it slightly more vibrant on hover */
    z-index: 10; /* Ensures the scaling button stays on top of neighbors */
  }

  .link-paper:hover { 
    background-color: #d4d4d4 !important; 
  }

  /* Video: Stays Red */
  .link-video:hover { 
    background-color: #FF0000 !important; 
    filter: brightness(1.1); 
  }

  /* Web: Stays Blue */
  .link-web:hover { 
    background-color: #007bff !important; 
    filter: brightness(1.1); 
  }

  /* GitHub: Transparent (since the icon is the color) */
  .link-github:hover {
    background-color: transparent !important;
    filter: brightness(1.5); /* Makes the black icon look slightly glossy/grey on hover */
  }

  /* 5. Full-Width Popup & Copy Button */
  .cite-menu {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    z-index: 999;
    padding: 15px;
    margin-top: 8px;
    border-radius: 4px;
  }

  .cite-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .cite-header h4 {
    margin: 0;
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .copy-btn {
    font-size: 10px;
    color: #007bff;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
  }

  .copy-btn:hover { text-decoration: underline; }

  .cite-menu pre {
    font-size: 11px;
    background: #fdfdfd;
    padding: 12px;
    border: 1px solid #f0f0f0;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
    color: #333;
    font-family: Monaco, Consolas, "Courier New", monospace;
  }
</style>

**Yako, C. L.**, Yuan, S., & Salisbury, K. (2026). Two Degree-of-Freedom Vibratory Transport in a Grasp, *accepted for publication* in IEEE/RSJ International Conference on Robotics and Automation (ICRA).
<div class="pub-buttons">
  <a href="#" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <a href="https://youtu.be/8nA_QskC6nQ" class="pub-link link-video"><i class="fa-solid fa-play"></i></a>
  <a href="https://www.connoryako.com/projects/2-dof-vibrational-manipulation/" class="pub-link link-web"><i class="fas fa-globe"></i></a>
  <a href="https://github.com/clyako/2-DoF-vibrational-transport" class="pub-link link-github"><i class="fa-brands fa-square-github"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@inproceedings{yako2026two,
  title={Two Degree-of-Freedom Vibratory Transport in a Grasp},
  author={Yako, Connor L and Yuan, Shenli and Salisbury, Kenneth},
  booktitle={IEEE/RSJ International Conference on Robotics and Automation (ICRA)},
  year={2026}
}</pre>
    </div>
  </div>
</div>

**Yako, C. L.** (2025, December). Good vibrations: toward vibration-based robotic in-hand manipulation. PhD dissertation, Stanford University.
<div class="pub-buttons">
  <a href="https://searchworks.stanford.edu/view/in00000868324" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@phdthesis{yako2025good,
  title={Good vibrations: toward vibration-based robotic in-hand manipulation},
  author={Yako, Connor L},
  year={2025},
  school={Stanford University}
}</pre>
    </div>
  </div>
</div>

Yuan, S., Wang, S., Patel, R., Tippur, M., **Yako, C. L.**, Cutkosky, M. R., Adelson, E., Salisbury, K. (2025). Tactile-Reactive Roller Grasper. IEEE Transactions on Robotics (T-RO).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/10892188" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <a href="https://www.youtube.com/watch?v=D0rJH6yloR8" class="pub-link link-video"><i class="fa-solid fa-play"></i></a>
  <a href="https://yuanshenli.com/tactile_reactive_roller_grasper.html" class="pub-link link-web"><i class="fas fa-globe"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@article{yuan2025tactile,
  title={Tactile-Reactive Roller Grasper},
  author={Yuan, Shenli and Wang, Siyuan and Patel, Raj and Tippur, Maneesh and Yako, Connor L and Cutkosky, Mark R and Adelson, Edward and Salisbury, Kenneth},
  journal={IEEE Transactions on Robotics},
  year={2025}
}</pre>
    </div>
  </div>
</div>

**Yako, C. L.**, Nowak, J., Yuan, S., & Salisbury, K. (2024, May). Vertical Vibratory Transport of Grasped Parts Using Impacts. In 2024 IEEE/RSJ International Conference on Robotics and Automation (ICRA) (pp. 1950 - 1956).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/10610769" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <a href="https://youtu.be/LyaEyWYwD4U" class="pub-link link-video"><i class="fa-solid fa-play"></i></a>
  <a href="https://www.connoryako.com/projects/vertical-vibratory-transport/" class="pub-link link-web"><i class="fas fa-globe"></i></a>
  <a href="https://github.com/clyako/vertical-vibratory-transport-of-grasped-parts-using-impacts" class="pub-link link-github"><i class="fa-brands fa-square-github"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@inproceedings{yako2024vertical,
  title={Vertical Vibratory Transport of Grasped Parts Using Impacts},
  author={Yako, Connor L and Nowak, Jeremi and Yuan, Shenli and Salisbury, Kenneth},
  booktitle={2024 IEEE International Conference on Robotics and Automation (ICRA)},
  pages={1950--1956},
  year={2024}
}</pre>
    </div>
  </div>
</div>

Yuan, S., Shao, L., Feng, Y., Sun, J., Xue, T., **Yako, C. L.**, Bohg, J., Salisbury, K. (2024). Design and Control of Roller Grasper V3 for In-Hand Manipulation. IEEE Transactions on Robotics (T-RO).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/10666738" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <a href="https://www.youtube.com/watch?v=eP53rhPG7W4" class="pub-link link-video"><i class="fa-solid fa-play"></i></a>
  <a href="https://yuanshenli.com/roller_grasper_v3.html" class="pub-link link-web"><i class="fas fa-globe"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@article{yuan2024design,
  title={Design and Control of Roller Grasper V3 for In-Hand Manipulation},
  author={Yuan, Shenli and Shao, Lin and Feng, Yutong and Sun, Jialiang and Xue, Timothy and Yako, Connor L and Bohg, Jeannette and Salisbury, Kenneth},
  journal={IEEE Transactions on Robotics},
  year={2024}
}</pre>
    </div>
  </div>
</div>

Pacaud, P., Chassaing, E., Cai, Y., **Yako, C. L.**, & Salisbury, K. (2023, July). Identifying Human Grasp Properties During Robot-to-Human Handovers. In 2023 IEEE World Haptics Conference (WHC) (pp. 432-438).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/10224405" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@inproceedings{pacaud2023identifying,
  title={Identifying Human Grasp Properties During Robot-to-Human Handovers},
  author={Pacaud, Pierre and Chassaing, Etienne and Cai, Yize and Yako, Connor L and Salisbury, Kenneth},
  booktitle={2023 IEEE World Haptics Conference (WHC)},
  pages={432--438},
  year={2023}
}</pre>
    </div>
  </div>
</div>

**Yako, C. L.**, Yuan, S., & Salisbury, J. K. (2022, October). Designing underactuated graspers with dynamically variable geometry using potential energy map based analysis. In 2022 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) (pp. 4638-4645).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/9982148" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@inproceedings{yako2022designing,
  title={Designing underactuated graspers with dynamically variable geometry using potential energy map based analysis},
  author={Yako, Connor L and Yuan, Shenli and Salisbury, J Kenneth},
  booktitle={2022 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  pages={4638--4645},
  year={2022}
}</pre>
    </div>
  </div>
</div>

Yuan, S., Shao, L., **Yako, C. L.**, Gruebele, A., & Salisbury, J. K. (2020, October). Design and control of roller grasper v2 for in-hand manipulation. In 2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) (pp. 9151-9158).
<div class="pub-buttons">
  <a href="https://ieeexplore.ieee.org/document/9340953" class="pub-link link-paper"><i class="fa-regular fa-file-lines"></i></a>
  <a href="https://www.youtube.com/watch?v=r_HaJfANyT8" class="pub-link link-video"><i class="fa-solid fa-play"></i></a>
  <a href="https://yuanshenli.com/roller_grasper_v2.html" class="pub-link link-web"><i class="fas fa-globe"></i></a>
  <div class="citation-container">
    <button class="bib-btn" onclick="toggleCite(event, this)">BibTeX</button>
    <div class="cite-menu">
      <div class="cite-header">
        <span class="copy-btn" onclick="copyCitation(event, this)">Copy</span>
      </div>
      <pre>@inproceedings{yuan2020design,
  title={Design and control of roller grasper v2 for in-hand manipulation},
  author={Yuan, Shenli and Shao, Lin and Yako, Connor L and Gruebele, Andrew and Salisbury, J Kenneth},
  booktitle={2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  pages={9151--9158},
  year={2020}
}</pre>
    </div>
  </div>
</div>

<script>
  function toggleCite(e, btn) {
    e.stopPropagation(); // Prevents the 'window.onclick' from firing immediately
    const currentMenu = btn.nextElementSibling;
    const isOpen = currentMenu.style.display === 'block';
    
    // Close all menus
    document.querySelectorAll('.cite-menu').forEach(m => m.style.display = 'none');
    
    // Toggle the clicked one
    currentMenu.style.display = isOpen ? 'none' : 'block';
  }

  function copyCitation(e, span) {
    e.stopPropagation(); // Keeps the menu open when clicking copy
    const pre = span.parentElement.nextElementSibling;
    const text = pre.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = span.textContent;
      span.textContent = "Copied!";
      span.style.color = "#28a745";
      setTimeout(() => {
        span.textContent = originalText;
        span.style.color = "#007bff";
      }, 2000);
    });
  }

  window.onclick = function(event) {
    // Only close if the click is outside any citation container
    if (!event.target.closest('.citation-container')) {
      document.querySelectorAll('.cite-menu').forEach(m => {
        m.style.display = 'none';
      });
    }
  }
</script>