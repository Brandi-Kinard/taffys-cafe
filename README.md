# Taffy's Cafe - Interactive Charcuterie Experience

A playful, interactive cafe website featuring physics-based charcuterie board building with React, Matter.js, and Framer Motion.

## ✨ Features

- **Interactive Physics**: Click anywhere to drop edible items onto a charcuterie board with realistic physics
- **Matter.js Integration**: Realistic gravity, collision detection, and object interactions
- **Smooth Animations**: Beautiful transitions powered by Framer Motion
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, playful design with vibrant colors and engaging typography

## 🚀 Live Demo

Experience the magic of building your perfect charcuterie board with realistic physics!

**[👉 View Live Demo](https://brandi-kinard.github.io/taffys-cafe/)**

## 🛠 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and dev server
- **Matter.js** - 2D physics engine for realistic object interactions
- **Framer Motion** - Production-ready motion library for React
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/taffys-cafe.git
   cd taffys-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How It Works

The interactive charcuterie board uses Matter.js to create a realistic physics environment:

- **Physics Engine**: Matter.js handles gravity, collisions, and object dynamics
- **Cursor Tracking**: Edible items follow your cursor with smooth motion
- **Click to Drop**: Click anywhere to release items onto the board
- **Realistic Behavior**: Items bounce, roll, and settle naturally on the board
- **Collision Detection**: Perfect alignment between visual elements and physics bodies

## 📁 Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx    # Main interactive physics component
│   ├── MenuSection.jsx    # Menu display with categories
│   ├── AboutSection.jsx   # About and location info
│   ├── ContactSection.jsx # Order and contact section
│   └── HomePage.jsx       # Main page layout
├── assets/
├── public/
│   └── edibles/          # Food item images and charcuterie board
└── styles/
```

## 🎨 Physics Implementation

The core physics system is implemented in `HeroSection.jsx`:

- **Engine Setup**: Matter.js engine with custom gravity and world boundaries
- **Dynamic Bodies**: Each edible item becomes a physics body with realistic properties
- **Static Bodies**: Charcuterie board acts as a collision surface
- **Real-time Updates**: Physics positions sync with React component state at 60fps

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎯 Key Components

### HeroSection
- Matter.js physics engine initialization
- Interactive cursor following
- Click-to-drop functionality  
- Real-time position updates

### Physics Integration
- Collision detection with charcuterie board
- Realistic object properties (friction, restitution, density)
- Boundary walls to contain objects
- Smooth animation synchronization

## 🛡 Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📝 License

MIT License - feel free to use this project for your own cafe or creative endeavors!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ☕ About Taffy's

Taffy's Cafe celebrates the joy of having "Chocolates for Breakfast" - because life's too short for boring mornings! Our interactive experience lets you build the perfect charcuterie board while enjoying a playful, physics-based interface.

---

**Built with ❤️ and lots of coffee** ☕
