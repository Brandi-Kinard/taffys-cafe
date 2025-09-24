import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Matter from 'matter-js';

const edibleImages = [
  '/edibles/avocado-1.png',
  '/edibles/bread-1.png',
  '/edibles/cheese-1.png',
  '/edibles/cheese-2.png',
  '/edibles/cheese-3.png',
  '/edibles/cheese-4.png',
  '/edibles/cheese-5.png',
  '/edibles/cheese-6.png',
  '/edibles/crackers-1.png',
  '/edibles/fruit-1.png',
  '/edibles/meat-1.png',
  '/edibles/meat-2.png',
  '/edibles/pastry-1.png',
  '/edibles/pastry-2.png',
  '/edibles/pastry-3.png',
  '/edibles/pastry-4.png',
  '/edibles/spread-1.png',
  '/edibles/spread-2.png',
];

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Locations', href: '#locations' },
  { label: 'Catering', href: '#catering' },
  { label: 'Order', href: '#order' },
];

export const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentEdible, setCurrentEdible] = useState(null);
  const [showCTA, setShowCTA] = useState(true);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const worldRef = useRef(null);
  const containerRef = useRef(null);
  const bodiesRef = useRef({});
  
  // Initialize Matter.js physics engine
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { Engine, Render, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;
    
    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 1.2; // Realistic gravity
    engineRef.current = engine;
    worldRef.current = engine.world;
    
    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        showAngleIndicator: false
      }
    });
    renderRef.current = render;
    
    // Create boundaries - floor at the very bottom
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 25,
      window.innerWidth,
      50,
      { 
        isStatic: true,
        render: { visible: false }
      }
    );
    
    const leftWall = Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, {
      isStatic: true,
      render: { visible: false }
    });
    
    const rightWall = Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, {
      isStatic: true,
      render: { visible: false }
    });
    
    // Create charcuterie board collision box - positioned closer to floor
    const boardWidth = 900;
    const boardHeight = 50;
    const boardY = window.innerHeight - 80; // Physics collision at actual bottom
    const board = Bodies.rectangle(
      window.innerWidth / 2,
      boardY,
      boardWidth,
      boardHeight,
      { 
        isStatic: true,
        friction: 1.0,  // Maximum friction for sticky surface
        render: { 
          visible: false
        },
        label: 'board'
      }
    );
    
    World.add(engine.world, [ground, leftWall, rightWall, board]);
    
    // Run the engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    
    // Run the renderer
    Render.run(render);
    
    // Handle window resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      
      // Update ground position
      Body.setPosition(ground, { 
        x: window.innerWidth / 2, 
        y: window.innerHeight - 25 
      });
      
      // Update walls
      Body.setPosition(rightWall, { 
        x: window.innerWidth + 25, 
        y: window.innerHeight / 2 
      });
      
      // Update board
      Body.setPosition(board, { 
        x: window.innerWidth / 2, 
        y: window.innerHeight - 80 
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
      render.canvas.remove();
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create new edible
  const createNewEdible = useCallback(() => {
    const randomImage = edibleImages[Math.floor(Math.random() * edibleImages.length)];
    setCurrentEdible({
      id: Date.now(),
      image: randomImage,
      rotation: Math.random() * 360
    });
  }, []);
  
  // Drop edible with physics
  const dropEdible = useCallback((x, y) => {
    if (!worldRef.current || !currentEdible) return;
    
    const { Bodies, World, Body } = Matter;
    
    // Create physics body for the edible - larger sizes to match design
    const size = 80 + Math.random() * 40; // Random size between 80-120px
    const body = Bodies.circle(x, y, size / 2, {
      restitution: 0.2, // Less bouncy
      friction: 0.9,    // Much more friction to stick to board
      density: 0.001,
      render: {
        sprite: {
          texture: currentEdible.image,
          xScale: size / 100,
          yScale: size / 100
        }
      },
      label: `edible_${currentEdible.id}`
    });
    
    // Add rotation
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    
    // Add to physics world
    World.add(worldRef.current, body);
    bodiesRef.current[currentEdible.id] = body;
    
    // Add to visual items
    setDroppedItems(prev => [...prev, {
      ...currentEdible,
      x,
      y,
      size,
      body
    }]);
    
    // Create new edible
    createNewEdible();
  }, [currentEdible, createNewEdible]);
  
  // Handle click
  const handleClick = (e) => {
    e.preventDefault();
    
    if (showCTA) {
      setShowCTA(false);
      createNewEdible();
      return;
    }
    
    if (currentEdible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dropEdible(x, y);
    }
  };
  
  // Update dropped items positions from physics engine
  useEffect(() => {
    if (!engineRef.current) return;
    
    const updatePositions = () => {
      setDroppedItems(prev => 
        prev.map(item => {
          const body = bodiesRef.current[item.id];
          if (body) {
            return {
              ...item,
              x: body.position.x,
              y: body.position.y,
              rotation: body.angle * (180 / Math.PI)
            };
          }
          return item;
        })
      );
    };
    
    const interval = setInterval(updatePositions, 16); // 60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-hidden cursor-pointer bg-cream mx-4 md:mx-8 lg:mx-16"
      onClick={handleClick}
    >
      {/* Hidden physics canvas */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      />
      
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-6">
        <div className="flex justify-between items-center">
          <div className="text-black font-medium">
            TAFFY'S
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-black hover:text-black/60 transition-colors pointer-events-auto" style={{ pointerEvents: 'auto', zIndex: 40 }}>MENU</a>
            <a href="#about" className="text-black hover:text-black/60 transition-colors pointer-events-auto" style={{ pointerEvents: 'auto', zIndex: 40 }}>ABOUT</a>
            <a href="#contact" className="text-black hover:text-black/60 transition-colors pointer-events-auto" style={{ pointerEvents: 'auto', zIndex: 40 }}>CONTACT</a>
            <button className="bg-black text-white px-6 py-2 font-medium hover:bg-black/80 transition-colors pointer-events-auto" style={{ pointerEvents: 'auto', zIndex: 40 }}>
              ORDER
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <h1 className="text-7xl md:text-9xl font-black text-pink-600 mb-2 leading-[0.8] transform -rotate-2 relative z-10">
                Taffy's
              </h1>
              <div className="absolute -top-4 -right-8 text-6xl animate-bounce">🍫</div>
              <div className="absolute -bottom-2 -left-6 text-4xl animate-pulse">✨</div>
            </div>
            
            <div className="bg-yellow-300 text-black px-8 py-3 inline-block transform rotate-1 text-2xl font-bold mb-6 shadow-lg">
              CHOCOLATES FOR BREAKFAST!
            </div>
            
            <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
              Because who says you can't have dessert at 8am? 
              <br/>
              <span className="text-pink-600 font-bold">Life's too short for boring breakfast!</span>
            </p>
          </motion.div>

          {/* Interactive CTA */}
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pointer-events-none mt-8"
              >
                <div className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold inline-block transform -rotate-1 shadow-xl animate-pulse">
                  🎯 Click anywhere to build your dream board! 🎯
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Current edible following cursor */}
      {currentEdible && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{ 
            left: mousePos.x - 40,
            top: mousePos.y - 40
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 0.5,
            rotate: currentEdible.rotation
          }}
        >
          <img 
            src={currentEdible.image}
            alt="edible"
            style={{ width: '80px', height: '80px' }}
            className="object-contain filter drop-shadow-sm"
          />
        </motion.div>
      )}

      {/* Dropped edibles visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {droppedItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: item.x - item.size / 2,
              top: item.y - item.size / 2,
              width: item.size,
              height: item.size,
              transform: `rotate(${item.rotation || 0}deg)`,
              zIndex: Math.floor(item.y)
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img 
              src={item.image}
              alt="dropped edible"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </motion.div>
        ))}
      </div>

      {/* Charcuterie Board - AT THE VERY BOTTOM */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{ bottom: '-50px' }}
      >
        <img 
          src="/edibles/board.png"
          alt="charcuterie board"
          className="w-[900px] h-auto"
          style={{ 
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
            transform: 'perspective(1000px) rotateX(8deg)'
          }}
        />
      </div>
    </div>
  );
};