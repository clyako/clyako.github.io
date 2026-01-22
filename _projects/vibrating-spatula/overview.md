---
layout: default
permalink: /projects/vibrating-spatula/
sidebar:
  nav: spatula-nav
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/project_landing_page.css">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/background_video.css">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/text_below_video.css">

<!-- Full-page video -->
<div class="background-video-wrapper">
  <video class="background-video" muted autoplay loop playsinline preload="auto">
    <source src="{{ site.baseurl }}/assets/videos/vibrating-spatula-demo.mp4" type="video/mp4">
    <source src="{{ site.baseurl }}/assets/videos/vibrating-spatula-demo.webm" type="video/webm">
  </video>
</div>

<div class="initial-content">
    <div id="main" role="main">
      {% include sidebar.html %}
      <article class="page" itemscope itemtype="https://schema.org/CreativeWork">
        <meta itemprop="headline" content="Overview">
        <meta itemprop="description" content="">
        <div class="page__inner-wrap">
          <header>
            <h1 id="page-title" class="page__title" itemprop="headline">
              <a href="http://localhost:4000/projects/vibrating-spatula/"
                itemprop="url">Vibrating Spatula
              </a>
            </h1>
          </header>
          <section class="page__content" itemprop="text">
            <p>
              This vibrating spatula leverages position-controlled 1D asymmetric vibrations of a thin steel blade in order to draw parts out from tightly packed configurations. For 1D motion like this, a traditional conveyor system could also be used. However, the conveyor system will be at least several times thicker (mainly limited by the pulley diameter), and much more mechanically complex compared to the vibrating spatula. 
            </p>
          </section>
          <footer class="page__meta">
          </footer>
        </div>
      </article>
    </div>
  </div>