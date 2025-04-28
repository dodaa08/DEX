import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [cubes, setCubes] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    // Generate initial positions for cubes
    const newCubes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50, // Random size between 50 and 150
      duration: Math.random() * 20 + 10 // Random duration between 10 and 30 seconds
    }));
    setCubes(newCubes);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          initial={{ 
            x: `${cube.x}%`,
            y: `${cube.y}%`,
            rotate: 0,
            opacity: 0.1
          }}
          animate={{
            x: [
              `${cube.x}%`,
              `${cube.x + Math.random() * 20 - 10}%`,
              `${cube.x}%`
            ],
            y: [
              `${cube.y}%`,
              `${cube.y + Math.random() * 20 - 10}%`,
              `${cube.y}%`
            ],
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: cube.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: cube.size,
            height: cube.size,
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '20%',
            transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)'
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground; 