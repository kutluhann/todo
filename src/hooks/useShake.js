import { useEffect } from "react";

export default function useShake(onShake) {
  const threshold = 40;
  
  useEffect(() => {
    let lastX = null, lastY = null, lastZ = null;
    let lastTime = 0;

    function handleMotion(event) {
      const { accelerationIncludingGravity } = event;
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;
      const now = Date.now();

      if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if ((deltaX + deltaY + deltaZ) > threshold) {
          if (now - lastTime > 3000) {
            if (navigator.vibrate) {
              navigator.vibrate(100);
            }
            onShake();
            lastTime = now;
          }
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [threshold, onShake]);
}
