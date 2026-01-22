---
title: "Theory"
layout: single
permalink: /projects/vibrations-through-a-rotary-joint/theory/
sidebar:
  nav: transmission-nav
---

## Vibrational Transport Strategy

Given a controllable moving surface, and a part that is to be transported, the operating principle is relatively simple and identical to a strategy used in horizontal vibratory transport called the Quaid Waveform {% include cite.html id="quaid1999miniature" %}. First, the part is transported upwards against gravity by _sticking_ to the moving surface; both the surface and part accelerate while staying within the friction cone. Next, the moving surface quickly accelerates downward in order to exit the friction cone and _slip_ relative to the part, catching the part at a lower position. This sticking-slipping cycle repeats to have net motion of the part upwards, as shown in the below graphic. Note that in the demo video only transport against gravity is shown, as this is the most difficult case for vibratory transport as described [here]({{ site.url }}{{ site.baseurl }}/projects/vertical-vibratory-transport/theory/#vertical-vibratory-transport-is-difficult).

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/vertical-vibratory-transport/vibrational-strategy.gif){: .align-center}
<!-- <span class="figure-caption"><strong>Fig. 1</strong>: Alternating sticking and slipping phases achieve net part transport against gravity.</span> -->

<!-- [^1]: Quaid, A. E. (1999, May). A miniature mobile parts feeder: Operating principles and simulation results. In Proceedings 1999 IEEE International Conference on Robotics and Automation (Cat. No. 99CH36288C) (Vol. 3, pp. 2221-2226). IEEE. -->

## Mechanism Description

The prototype transmission and finger design is shown on the left side (A) of the below graphic. The dotted line indicates the axis around which the finger link (dark gray), which includes the moving surface, rotates relative to the base (light pink), which houses the VCA. Gearing in between these two parts transmits the VCA vibrations to the output surface while maintaining a constant transmission angle as the finger link rotates relative to the base. A close-up of the transmission is shown on the right side (B) of the below graphic. The input gear $A$ is connected to the VCA, $B$ is attached to the finger link, $C$ consists of a bevel and spur gear, $D$ is a compound gear, and $E$ is an output spur gear that is connected to the moving surface. Angular velocity of the finger link relative to the base is $\omega_F$. The world frame $N$ is fixed to the base, and the finger link frame $F$ is fixed to the finger. VCA input velocity is measured at point $A_o$ on input gear $A$ and $S_o$ is a point fixed to the moving surface.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/vibrations-through-a-rotary-joint/transmission_design.jpeg){: .align-center}

Bevel gears $A$--$C$ all have the same radius, $r_A=r_B=r_C$, and there is a 2:1 reduction ratio between the compound gear $D$ and output gear $E$ giving the following for the angular velocity of gear $E$ in frame $N$ dotted with $\hat{n}_z$:

$$
\begin{equation}
    \omega_E = -\left(\omega_F + \frac{1}{2}\omega_A\right)
\end{equation}
$$

Note that when the VCA is stationary ($\omega_A = 0$) the output gear rotates at the same angular speed as the finger. To have the input speed from the VCA equal the output speed relative to the finger frame, we require the ratio of the output arm on gear $E$ and input arm on gear $A$ to be $l_E/l_A=2$:

$$
\begin{align}
    \left|^N\vec{v}~^{A_o}\right| &= \left|^F\vec{v}~^{S_o}\right| \notag \\
    \left|\omega_A l_A\right| &= \left|\omega_El_E + \omega_Fl_E\right| \notag \\
    \left|\omega_A l_A\right| &= \left|-\frac{1}{2}\omega_A \cdot 2l_A\right| \notag \\
    \left|\omega_A l_A\right| &= \left|\omega_A l_A\right| \checkmark \notag
\end{align}
$$

This decoupled motion of moving surface vibration and changing transmission angle came from the idea of a variable angle bell-crank, which enables a constant transmission angle between the VCA input and the output to the moving surface. An alternative solution is to simply embed a highly-geared motor between the input link from the VCA and output link to the moving surface, but this adds both complexity and cost. In the design presented here, the motor that controls the finger link rotation also changes the effective bell-crank angle. Additionally, one could use the 3-pulley 4-cable differential in the WAM arm {% include cite.html id="salisbury1993compact" %}, though we did not pursue this design to avoid cable pretensioning, or possibly the cable transmission described in ADD LINK.