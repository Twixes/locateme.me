import createGlobe, { COBEOptions } from 'cobe'
import React, { useEffect, useRef } from 'react'

export function Globe(props: COBEOptions): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const globe = createGlobe(canvasRef.current!, props);

      return () => {
        globe.destroy();
      };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: props.width /2, height: props.height/2 }} />
    );
  }
