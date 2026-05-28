---
title: "Theory"
layout: single
permalink: /projects/vertical-vibratory-transport/theory/
sidebar:
  nav: vertical-vibratory-transport-nav
---

Here we discuss the high-level strategy, define that strategy using dynamics and an assumed friction model, and how that model was validated.

## High-Level Strategy
Given a controllable moving surface, and a part that is to be transported, the operating principle is relatively simple and similar to that of horizontal transport {% include cite.html id="quaid1999miniature" %}. First, the part is transported upwards against gravity by _sticking_ to the moving surface. The moving surface then quickly accelerates downward in order to _slip_ relative to the part, catching the part at a lower position. This sticking-slipping cycle repeats to have net motion of the part upwards, as shown below.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/vertical-vibratory-transport/vibrational-strategy.gif){: .align-center}
<!-- <span class="figure-caption"><strong>Fig. 1</strong>: Alternating sticking and slipping phases achieve net part transport against gravity.</span> -->

<!-- [^1]: Quaid, A. E. (1999, May). A miniature mobile parts feeder: Operating principles and simulation results. In Proceedings 1999 IEEE International Conference on Robotics and Automation (Cat. No. 99CH36288C) (Vol. 3, pp. 2221-2226). IEEE. -->

## Dynamics
While many friction models exist, we used the well-known Coulomb friction model. The equations of motion are shown below:

$$
\begin{align}
\quad \text{sticking:} \quad \dot{z}_P &= \dot{z}_S, \quad -\frac{\mu_s F_n}{m_P} -g \leq \ddot{z}_S \leq \frac{\mu_s F_n}{m_P} - g \label{eq:sticking}\\
\quad \text{slipping:} \quad  \quad \dot{z}_P &\neq \dot{z}_S, \quad \ddot{z}_P = \frac{\mu_k F_n}{m_P} \text{sgn}(\dot{z}_S - \dot{z}_P) - g \label{eq:slipping}
\end{align}
$$

### Vertical Vibratory Transport Is Difficult

From $\eqref{eq:sticking}$, the mimimun required normal force to prevent the part from accelerating downwards when the surface is stationary ($\dot{z}_S = 0$) is the following:

$$
\begin{equation}
F_n > \frac{m_p g}{\mu_s} \label{eq:minimum_normal}
\end{equation}
$$

From $\eqref{eq:sticking}$ and $\eqref{eq:minimum_normal}$ the minimum required peak acceleration from the surface actuator, $a_{max}$, is the following:

$$
\begin{equation}\label{eq:a_max_lower_bound}
    a_{max} > \mu_s F_n/m_P + g > 2g
\end{equation}
$$

The above equations detail the challenges which upward vertical vibratory transport presents compared to horizontal transport. In most practical cases, we have $\mu_s < 1$, so \eqref{eq:minimum_normal} means that the part $P$ must be squeezed with a force $F_n$ exceeding its own weight. Equation $\eqref{eq:sticking}$ shows that gravity reduces the maximum upward part acceleration during sticking, and that overcoming this limitation requires squeezing the part harder still. However, from \eqref{eq:a_max_lower_bound}, squeezing with higher normal forces requires more powerful actuators to reach higher surface accelerations, which already need to exceed $2g$ (compared to $a_{max} > \mu_s g$ for the horizontal case). Finally, \eqref{eq:slipping} shows that during slipping, the part accelerates faster down than up.

### Try It: Explore the Squeeze Force Requirement

Use the sliders below to see how the friction coefficient and part mass determine the minimum squeeze force and required actuator acceleration.

<div class="physics-widget">
  <h4>Vertical Vibratory Transport — Dynamics Explorer</h4>

  <div class="slider-row">
    <label>Static friction coefficient <em>μ<sub>s</sub></em></label>
    <input type="range" id="mu-slider" min="0.15" max="1.5" step="0.05" value="0.5">
    <span class="slider-value" id="mu-val">0.50</span>
  </div>

  <div class="slider-row">
    <label>Part mass <em>m<sub>p</sub></em> (grams)</label>
    <input type="range" id="mass-slider" min="1" max="200" step="1" value="50">
    <span class="slider-value" id="mass-val">50 g</span>
  </div>

  <div class="results">
    <div class="result-box">
      <span class="result-label">Min. squeeze force F<sub>n</sub></span>
      <span class="result-value" id="fn-val">—</span>
      <span class="result-unit">N</span>
    </div>
    <div class="result-box">
      <span class="result-label">Squeeze ratio F<sub>n</sub> / (m<sub>p</sub>·g)</span>
      <span class="result-value" id="ratio-val">—</span>
      <span class="result-unit">× weight</span>
    </div>
    <div class="result-box">
      <span class="result-label">Min. peak acceleration</span>
      <span class="result-value" id="accel-val">>&nbsp;2g</span>
      <span class="result-unit">always, regardless of μ<sub>s</sub></span>
    </div>
  </div>

  <div class="insight" id="physics-insight"></div>
</div>

<script>
(function () {
  const muSlider   = document.getElementById('mu-slider');
  const massSlider = document.getElementById('mass-slider');
  const muVal      = document.getElementById('mu-val');
  const massVal    = document.getElementById('mass-val');
  const fnVal      = document.getElementById('fn-val');
  const ratioVal   = document.getElementById('ratio-val');
  const insight    = document.getElementById('physics-insight');
  const g          = 9.81;

  function update() {
    const mu   = parseFloat(muSlider.value);
    const mp   = parseFloat(massSlider.value) / 1000; // kg
    const Fn   = (mp * g) / mu;
    const ratio = 1 / mu;

    muVal.textContent   = mu.toFixed(2);
    massVal.textContent = massSlider.value + ' g';
    fnVal.textContent   = Fn.toFixed(3);
    ratioVal.textContent = ratio.toFixed(2);

    let note = '';
    if (mu < 0.5) {
      note = `Low friction (μ = ${mu.toFixed(2)}) means the gripper must squeeze ${ratio.toFixed(1)}× the part's weight just to hold it — before any transport motion begins.`;
    } else if (mu < 1.0) {
      note = `With μ = ${mu.toFixed(2)}, the gripper still needs to squeeze ${ratio.toFixed(1)}× the part's weight. Increasing to μ > 1 would bring that below the weight itself.`;
    } else {
      note = `With μ = ${mu.toFixed(2)} > 1, the required squeeze force (${ratio.toFixed(2)}× weight) is less than the part's weight — still substantial, but achievable with softer contact materials.`;
    }
    note += ` Regardless of μ or mass, the surface actuator must exceed <strong>2g peak acceleration</strong> — a fundamental challenge unique to vertical transport.`;
    insight.innerHTML = note;
  }

  muSlider.addEventListener('input', update);
  massSlider.addEventListener('input', update);
  update();
})();
</script>

## Experimental Validation

To validate our dynamics model described by $\eqref{eq:sticking}$ and $\eqref{eq:slipping}$ we recorded the interaction of a moving surface and a transported part. The recording was then processed by the free software [Tracker](https://opensourcephysics.github.io/tracker-website/) in order to extract surface and part motion. The surface motion was then used as input to a Simulink model to predict the resulting part motion, which was compared with the experimentally observed part motion. A sample trial (Trial #5) is shown below (there were 10 total trials).

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/vertical-vibratory-transport/part-position-comparison.png){: .align-center}
<!-- <span class="figure-caption"><strong>Fig. 2</strong>: Simulated (red) and experimental (black) part positions, along with the periodic surface motion (blue).</span> -->
