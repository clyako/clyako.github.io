---
layout: default
permalink: /projects/vertical-vibratory-transport/
sidebar:
  nav: vvt-nav
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/project_landing_page.css">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/background_video.css">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/text_below_video.css">

<!-- Full-page video -->
<div class="background-video-wrapper">
  <video class="background-video" muted autoplay loop playsinline controls preload="auto">
    <source src="{{ site.baseurl }}/assets/videos/gripper-demo-small.mp4" type="video/mp4">
    <source src="{{ site.baseurl }}/assets/videos/gripper-demo-small.webm" type="video/webm">
  </video>
</div>

<div class="initial-content">
    <div id="main" role="main">
      <div class="sidebar sticky">
        <nav class="nav__list">
          <input id="ac-toc" name="accordion-toc" type="checkbox">
          <label for="ac-toc">Toggle Menu</label>
          <ul class="nav__items">
            <li>
              <a href="{{ site.baseurl }}/projects/vertical-vibratory-transport/"><span
                  class="nav__sub-title">Overview</span></a>
            </li>
            <li>
              <a href="{{ site.baseurl }}/projects/vertical-vibratory-transport/paper/"><span class="nav__sub-title">Paper</span></a>
            </li>
            <li>
              <a href="{{ site.baseurl }}/projects/vertical-vibratory-transport/theory/"><span class="nav__sub-title">Theory</span></a>
            </li>
            <li>
              <a href="{{ site.baseurl }}/projects/vertical-vibratory-transport/implementation/"><span
                  class="nav__sub-title">Implementation</span></a>
            </li>
          </ul>
        </nav>
      </div>
      <article class="page" itemscope itemtype="https://schema.org/CreativeWork">
        <meta itemprop="headline" content="Overview">
        <meta itemprop="description" content="">
        <div class="page__inner-wrap">
          <header>
            <h1 id="page-title" class="page__title" itemprop="headline">
              <a href="http://localhost:4000/projects/vertical-vibratory-transport/Overview/"
                itemprop="url">Overview
              </a>
            </h1>
          </header>
          <section class="page__content" itemprop="text">
            <p>This work was presented at ICRA 2024, and is aimed towards creating a non-anthropomorphic
                    vibration-based method for robotic in-hand manipulation. Vibrational transport of objects is not
                    a new concept. In fact, many of the papers cited in our work go back decades. However, most of
                    this transport occurred in the plane or at a slight angle to the plane (think <a
                        href="https://www.youtube.com/watch?v=E0WLpJ0FyaU">vibratory part
                        feeders</a>). Our work focused on:
                </p>
                <ol>
                    <li>Defining the dynamics for vertical transport, and showing why it is more difficult than its horizontal counterpart</li>
                    <li>Experimentally verifying our dynamical model</li>
                    <li>Building a device that can demonstrate vertical vibratory transport</li>
                </ol>
                <p>
                    Details on the theory and implementation can be found on this website.
                </p>
          </section>
          <footer class="page__meta">
          </footer>
        </div>
      </article>
    </div>
  </div>


<!-- <div class="page-container">
    <aside class="sidebar sticky-sidebar">
        {% include sidebar.html nav=page.sidebar.nav %}
    </aside>
    <div id="main" role="main">
        <article class="page" itemscope itemtype="https://schema.org/CreativeWork">
            <meta itemprop="headline" content="About">
            <div class="page__inner-wrap">
                <header>
                    <h2 id="page-title" class="page__title" itemprop="headline">About
                    </h2>
                </header>
                <section class="page__content" itemprop="text">
                    <p>This work was presented at ICRA 2024, and is aimed towards creating a non-anthropomorphic
                        vibration-based method for robotic in-hand manipulation. Vibrational transport of objects is not
                        a new concept. In fact, many of the papers cited in our work go back decades. However, most of
                        this transport occurred in the plane or at a slight angle to the plane (think <a
                            href="https://www.youtube.com/watch?v=E0WLpJ0FyaU">vibratory part
                            feeders</a>). Our work focused on:
                    </p>
                    <ol>
                        <li>Defining the dynamics for vertical transport, and showing why it is more difficult than its
                            horizontal counterpart</li>
                        <li>Experimentally verifying our dynamical model</li>
                        <li>Building a device that can demonstrate vertical vibratory transport</li>
                    </ol>
                    <p>
                        Details on the theory and implementation can be found on this website.
                    </p>
                </section>
                <footer class="page__meta">
                </footer>
            </div>
        </article>
    </div>
</div> -->
