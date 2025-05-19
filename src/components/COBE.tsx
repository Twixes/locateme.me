import createGlobe, { COBEOptions } from 'cobe'
import React, { useEffect, useRef } from 'react'

import { WAIT_TOTAL_MS } from './App'

export function Globe(props: { scale: number } & COBEOptions): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const globe = createGlobe(canvasRef.current!, props)

        return () => {
            globe.destroy()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: props.width / 2,
                height: props.height / 2,
                filter: 'saturate(1.2) brightness(1.1) contrast(1.1)',
                transform: `scale(${props.scale})`,
                transition: `transform ${WAIT_TOTAL_MS}ms ease-in`,
            }}
        />
    )
}
