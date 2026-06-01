---
title: "Theory"
layout: single
permalink: /projects/vibrating-parallel-gripper/theory/
sidebar:
  nav: parallel-gripper-nav
---

Here we discuss the high-level transport strategy, the dynamical model and Quaid waveform used to drive the system, how waveform parameters affect average part velocity, and how that model was validated experimentally.

## High-Level Strategy

The operating principle is the same stick-slip strategy as in our [prior work]({{ site.baseurl }}/projects/vertical-vibratory-transport/theory/): the part sticks to the moving surface and is carried upward, then the surface rapidly accelerates downward to slip relative to the part, catching it at a lower position. This sticking-slipping cycle repeats to produce net upward transport.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/vertical-vibratory-transport/vibrational-strategy.gif){: .align-center style="max-width: 80%;"}

The key difference from the impact-based version is that we replaced unpredictable impact motors with controllable voice coil actuators (VCAs) running closed-loop position control. This lets us precisely prescribe the surface motion waveform and systematically study how its parameters affect transport velocity — something that was not possible with impact motors.

## Dynamics

We model the part-surface interaction using Coulomb friction. The equations of motion are the same as derived in the prior work:

$$
\begin{align}
\quad \text{sticking:} \quad \dot{z}_P &= \dot{z}_S, \quad -\frac{\mu_s F_n}{m_P} - g \leq \ddot{z}_S \leq \frac{\mu_s F_n}{m_P} - g \\
\quad \text{slipping:} \quad \dot{z}_P &\neq \dot{z}_S, \quad \ddot{z}_P = \frac{\mu_k F_n}{m_P} \text{sgn}(\dot{z}_S - \dot{z}_P) - g
\end{align}
$$

where $z_P$ and $z_S$ are the part and surface positions, $F_n$ is the normal (squeeze) force, $m_P$ is the part mass, $g$ is gravitational acceleration, and $\mu_s$, $\mu_k$ are the static and kinetic friction coefficients.

### The Quaid Waveform

Rather than use an optimal but complex and contact dependent vibratory waveform, we opted for the simpler two-phase waveform proposed by Quaid {%include cite.html id="quaid1999miniature"%}. The surface acceleration profile consists of a sticking phase at acceleration $a_s$ followed by a slipping phase at $-a_{max}$:

$$
\ddot{z}_S = \begin{cases} a_s, & 0 \leq t \leq t_1 \\ -a_{max}, & t_1 < t \leq T - t_1 \\ a_s, & T - t_1 < t \leq T \end{cases}
$$

where $t_1 = \frac{T \cdot a_{max}}{2(a_s + a_{max})}$ is chosen so the surface has zero net displacement per cycle. Use the sliders below to see how the sticking acceleration and slipping accelerations change the resulting vibratory surface position, velocity, and acceleration profiles.

<div class="physics-widget">
  <h4>Quaid Waveform</h4>

  <div id="quaid-plots" style="display:flex; gap:10px; margin-bottom:1rem;">
    <div style="flex:1; min-width:0;">
      <div style="font-family:'IBM Plex Mono',monospace; font-size:0.60rem; text-transform:uppercase; letter-spacing:0.07em; color:#595349; text-align:center; margin-bottom:3px;">Position</div>
      <canvas id="qpos" style="display:block; width:100%;"></canvas>
    </div>
    <div style="flex:1; min-width:0;">
      <div style="font-family:'IBM Plex Mono',monospace; font-size:0.60rem; text-transform:uppercase; letter-spacing:0.07em; color:#595349; text-align:center; margin-bottom:3px;">Velocity</div>
      <canvas id="qvel" style="display:block; width:100%;"></canvas>
    </div>
    <div style="flex:1; min-width:0;">
      <div style="font-family:'IBM Plex Mono',monospace; font-size:0.60rem; text-transform:uppercase; letter-spacing:0.07em; color:#595349; text-align:center; margin-bottom:3px;">Acceleration</div>
      <canvas id="qacc" style="display:block; width:100%;"></canvas>
    </div>
  </div>

  <div class="slider-row">
    <label>Sticking acceleration <em>a<sub>s</sub></em></label>
    <input type="range" id="qas" min="0.4" max="1.0" step="0.01" value="0.7">
    <span class="slider-value">g</span>
  </div>
  <div class="slider-row">
    <label>Slipping acceleration <em>a<sub>max</sub></em></label>
    <input type="range" id="qamax" min="5" max="20" step="0.25" value="20">
    <span class="slider-value">g</span>
  </div>
</div>

<script>
(function () {
  var G          = 9.81;
  var N_PTS      = 600;
  var C_H        = 160;
  var DPR        = window.devicePixelRatio || 1;
  var PAD        = { t: 8, r: 8, b: 18, l: 8 };
  var TIME_SCALE = 0.15 / 8; // simulated seconds per real second

  var AXES = {
    pos: { lo: 0,    hi: 3.5, ticks: [0, 1, 2, 3] },
    vel: { lo: -300, hi: 300, ticks: [-300, -150, 0, 150, 300] },
    acc: { lo: -22,  hi: 2,   ticks: [-20, -10, 0] }
  };

  var simTime  = 0;
  var lastRT   = null;
  var canvases = {};

  var FREQ = 20; // fixed frequency (Hz)

  // Smoothed (rendered) parameters — ease toward slider targets each frame
  var curAs = 0.7, curAmax = 20;
  var LERP = 8; // exponential rate per real second (~95% there in ~0.4 s

  function initCanvases() {
    ['qpos', 'qvel', 'qacc'].forEach(function(id) {
      var c = document.getElementById(id);
      canvases[id] = c;
      var cssW = c.parentElement.clientWidth || 200;
      c.width  = Math.round(cssW * DPR);
      c.height = Math.round(C_H * DPR);
      c.style.height = C_H + 'px';
    });
  }

  // Evaluate waveform at a single (possibly negative / wrapped) time t
  function sample(t, T, t1, t2, as, amax) {
    var pt = ((t % T) + T) % T;
    var p, v, a;
    if (pt <= t1) {
      a = as;    v = as * pt;          p = 0.5 * as * pt * pt;
    } else if (pt <= t2) {
      a = -amax;
      v = as * t1 - amax * (pt - t1);
      p = as * t1 * (pt - 0.5 * t1) - 0.5 * amax * (pt - t1) * (pt - t1);
    } else {
      a = as;    v = as * (pt - T);    p = 0.5 * as * (pt - T) * (pt - T);
    }
    return { p: p * 1000, v: v * 1000, a: a / G };
  }

  function drawCanvas(canvas, pts, key, color, axis) {
    var cssW = Math.round(canvas.width / DPR);
    var ctx  = canvas.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var pw = cssW - PAD.l - PAD.r, ph = C_H - PAD.t - PAD.b;
    var span = axis.hi - axis.lo;
    var n = pts.length;

    function fy(v) { return PAD.t + ph * (1 - (v - axis.lo) / span); }

    ctx.clearRect(0, 0, cssW, C_H);
    ctx.fillStyle = '#F8F5EF';
    ctx.fillRect(PAD.l, PAD.t, pw, ph);

    // y = 0 reference line
    if (axis.lo <= 0 && axis.hi >= 0) {
      ctx.strokeStyle = '#9A9490'; ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(PAD.l, fy(0)); ctx.lineTo(PAD.l + pw, fy(0));
      ctx.stroke();
    }

    // data line clipped to plot area
    ctx.save();
    ctx.beginPath(); ctx.rect(PAD.l, PAD.t, pw, ph); ctx.clip();
    ctx.strokeStyle = color; ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (var i = 0; i < n; i++) {
      var x = PAD.l + pw * i / (n - 1);
      var y = fy(pts[i][key]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    // border
    ctx.strokeStyle = '#595349'; ctx.lineWidth = 1;
    ctx.strokeRect(PAD.l, PAD.t, pw, ph);

    // x-axis label
    ctx.fillStyle = '#595349';
    ctx.font = '10px IBM Plex Mono, monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('Time', PAD.l + pw / 2, PAD.t + ph + 3);
  }

  function frame(realTime) {
    if (lastRT === null) lastRT = realTime;
    var realDt = Math.min((realTime - lastRT) / 1000, 0.1);
    lastRT = realTime;
    simTime += realDt * TIME_SCALE;

    // Exponentially smooth toward slider targets to avoid discontinuous jumps
    var a = 1 - Math.exp(-LERP * realDt);
    curAs   += (parseFloat(document.getElementById('qas').value)   - curAs)   * a;
    curAmax += (parseFloat(document.getElementById('qamax').value) - curAmax) * a;

    var as   = curAs   * G;
    var amax = curAmax * G;
    var T    = 1 / FREQ;
    var t1   = amax / (amax + as) * T / 2;
    var t2   = T - t1;
    var win  = 2 * T; // display window = 2 periods

    // Build sample array spanning [simTime - win, simTime]
    var pts = [];
    for (var i = 0; i < N_PTS; i++) {
      var t = simTime - win + win * i / (N_PTS - 1);
      pts.push(sample(t, T, t1, t2, as, amax));
    }

    drawCanvas(canvases['qpos'], pts, 'p', '#3f5a36', AXES.pos);
    drawCanvas(canvases['qvel'], pts, 'v', '#5A7A8C', AXES.vel);
    drawCanvas(canvases['qacc'], pts, 'a', '#9A7A55', AXES.acc);

    requestAnimationFrame(frame);
  }

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCanvases, 120);
  });

  function start() {
    initCanvases();
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { requestAnimationFrame(start); });
  } else {
    requestAnimationFrame(start);
  }
})();
</script>

### Effect of Waveform Parameters on Average Part Velocity

Given the constraints for sustained sticking and reliable slip initiation, the average part velocity over one period is:

$$
v_{avg} = \frac{a_s}{2f}\left(\frac{1}{1+\dfrac{a_s}{a_{max}}} - \frac{1}{1+\dfrac{a_s}{a_k}}\right)
$$

where $f = 1/T$ is the oscillation frequency and $a_k = \frac{\mu_k F_n}{m_P} + g$ is the effective deceleration during slip. The effect of each acceleration parameter follows directly from the partial derivatives:

$$
\frac{\partial v_{avg}}{\partial a_{max}} = \frac{a_s^2}{2f(a_{max}+a_s)^2}
$$

$$
\frac{\partial v_{avg}}{\partial a_s} = \frac{a_s(a_{max}-a_k)\bigl(a_s(a_{max}+a_k)+2a_k a_{max}\bigr)}{2f(a_k+a_s)^2(a_{max}+a_s)^2}
$$

The first equation shows $v_{avg}$ grows monotonically with $a_{max}$: a higher slipping acceleration extends the sticking interval, letting the surface carry the part upward longer while shortening the slip phase where the part falls back. The second shows that increasing $a_s$ also increases $v_{avg}$, as the stronger upward acceleration during sticking more than compensates for the shorter sticking window, provided $a_{max} > a_k$, which holds whenever $\mu_s \geq \mu_k$.

## Experimental Validation

To validate the two above trends, we built a single-finger test setup and transported a gray cast iron part against gravity across a range of waveform parameters and normal forces. The finger is constrained to move linearly by low-friction bearing blocks and rails on either side, a highly geared DC motor pushes the moving surface into the part through a stiff spring and ball joint to apply a prescribed normal force, and the part assembly — gray cast iron contact surface, aluminum backplate, load cell, and resin-printed stiffening components — is constrained to move vertically along a rail with position recorded by a non-contact encoder.

![image-center]({{ site.baseurl }}/assets/images/vibrating-parallel-gripper/experimental_setup.png){: .align-center style="max-width: 80%;"}

The moving surface was gray cast iron (same material as the part), selected for its high reported static coefficient of friction. Our measured values were $\mu_s = 0.44 \pm 0.04$ and $\mu_k = 0.34 \pm 0.03$ — notably different from the textbook values of $\mu_s = 1.10$ and $\mu_k = 0.15$, which we traced back to 19th-century hand-scraped surfaces and 1940s lathed cast iron respectively.

### Sample Data

A representative trial (Experiment 3, $F_n$ = 50 N) is shown below. Part position $z_P$ (blue, with the darkened region used for $v_{avg}$ calculation) climbs in a characteristic staircase pattern as sticking phases carry it upward, with small drops during each slip. The normal force $F_n$ (red) oscillates around the 50 N target due to bending in the load cell from the periodic surface vibrations, with the average $\bar{F}_n$ shown as a dashed line. Average velocity is calculated from the slope over the range where the contact area is fully within the moving surface's bearing.

![image-center]({{ site.baseurl }}/assets/images/vibrating-parallel-gripper/sample_experiment_plot.png){: .align-center style="max-width: 80%;"}

### Effect of $a_{max}$

Experiments 1–4 fixed $f$ = 20 Hz and $a_s$ = 0.7$g$ and varied $a_{max}$ from 5$g$ to 20$g$ across 11 normal force values from 30–50 N. Higher $a_{max}$ generally produced higher average part velocity, consistent with the model. The exception was at the lowest normal forces, particularly for $a_{max} = 20g$, where we believe structural vibrations at high accelerations worsened plane-on-plane contact between the moving surface and the part, reducing effective friction. The expected trend becomes more clearly visible at higher normal forces where plane-on-plane contact is better enforced.

![image-center]({{ site.baseurl }}/assets/images/vibrating-parallel-gripper/varying_amax_plot.png){: .align-center style="max-width: 80%;"}

### Effect of $a_s$

Experiments 5–8 fixed $f$ = 15 Hz and $a_{max}$ = 10$g$ and varied $a_s$ from 0.4$g$ to 1.0$g$ at three normal force values (30, 40, and 50 N). Higher sticking accelerations consistently produced higher average part velocities, again matching the model. The exception was at 30 N for $a_s = 1.0g$, where the increased surface momentum led to greater out-of-plane motion of the cantilevered moving surface, reducing the effective contact area.

![image-center]({{ site.baseurl }}/assets/images/vibrating-parallel-gripper/varying_amin_plot.png){: .align-center style="max-width: 80%;"}
