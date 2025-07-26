
# 📡 Latency Topology Visualizer

A 3D web application that visualizes real-time and historical latency data between global crypto exchanges. Built as part of the GoQuant technical assignment.

## 🔗 Live Project & Code

- 🌍 **Live App:** [https://latency-visualizer-sigma.vercel.app](https://latency-visualizer-sigma.vercel.app)
- 💻 **Source Code:** [GitHub Repository](https://github.com/aqduswarsi/latency-visualizer)

---

## 🎯 Project Overview

This visualizer simulates global network latency between cryptocurrency exchange servers in real-time, using an interactive 3D globe. Users can observe:
- Blinking red dots for active locations
- Animated arcs representing latency flow
- A historical latency graph that cycles through exchange pairs

This project demonstrates strong fundamentals in WebGL, animation, data representation, and UI responsiveness.

---

## 🚀 Key Features

### 🌐 Globe Visualization
- 3D Earth using **React Three Fiber**
- Realistic rendering with **4K textures** (color, bump, and specular maps)
- Atmospheric lighting and orbital camera controls

### 📡 Real-Time Latency Mode
- Live simulation of packets between exchange nodes
- Animated arcs and blinking pings
- Real-time location transitions

### 📈 Historical Mode
- Time-series charts showing past latency trends between pairs
- Chart automatically cycles through pairs every 6 seconds
- Smooth transitions between views

### ⚙️ Interactions
- Hovering over charts pauses the auto-cycle
- Responsive layout for both desktop and mobile
- Clean UI transitions using **Framer Motion**

---

## 🧱 Tech Stack

| Layer          | Tools Used                             |
|----------------|-----------------------------------------|
| Frontend       | React.js (via Next.js)                 |
| Visualization  | Three.js + React Three Fiber            |
| Animation      | Framer Motion                           |
| Charts         | Recharts                                |
| Styling        | Tailwind CSS                            |
| Deployment     | Vercel                                  |
| Assets         | 4K Earth textures from planetpixelemporium.com |

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/aqduswarsi/latency-visualizer.git
cd latency-visualizer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌟 Bonus Enhancements

- ✅ Used 4K Earth maps for photorealism
- ✅ Smooth camera transitions and atmosphere effect
- ✅ Cycle delay reset on hover for better UX
- ✅ Clear project structure with modular components

---

## 📌 Final Notes

This project was developed in response to GoQuant’s assignment to showcase strong frontend capabilities, 3D rendering skills, and real-time data visualization.  

Please feel free to explore the [GitHub repo](https://github.com/aqduswarsi/latency-visualizer) or test the [live deployment](https://latency-visualizer-sigma.vercel.app).

---
