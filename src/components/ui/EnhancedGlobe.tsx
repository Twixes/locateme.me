/** @jsxImportSource @emotion/react */
import { useRef } from 'react'

import { Globe } from '../COBE'
import { globeWrapper, orbitBody1, orbitBody2, orbitBody3, orbitPath1, orbitPath2, orbitPath3 } from './GlobeStyles'

type EnhancedGlobeProps = {
    phiRef: React.MutableRefObject<number>
    waitIteration: number | undefined
    waitIterationRef: React.MutableRefObject<number | undefined>
    waitExponent: number
}

export const EnhancedGlobe: React.FC<EnhancedGlobeProps> = ({
    phiRef,
    waitIteration,
    waitIterationRef,
    waitExponent,
}) => {
    const glowRef = useRef<HTMLDivElement>(null)

    return (
        <>
            {/* Orbit paths */}
            <div css={orbitPath1}></div>
            <div css={orbitPath2}></div>
            <div css={orbitPath3}></div>

            {/* Orbit bodies */}
            <div css={orbitBody1}></div>
            <div css={orbitBody2}></div>
            <div css={orbitBody3}></div>

            <div css={globeWrapper} ref={glowRef}>
                <Globe
                    devicePixelRatio={2}
                    width={1000}
                    height={1000}
                    phi={0}
                    theta={0}
                    dark={1}
                    diffuse={1.3}
                    mapSamples={20000}
                    mapBrightness={8}
                    baseColor={[0.1, 0.1, 0.25]}
                    markerColor={[0.4, 0.9, 1.0]}
                    glowColor={[0.5, 0.5, 0.9]}
                    markers={[
                        { location: [37.7595, -122.4367], size: 0.05 },
                        { location: [40.7128, -74.006], size: 0.15 },
                    ]}
                    scale={typeof waitIteration === 'number' ? 0.1 : 1}
                    onRender={(state) => {
                        if (waitIterationRef.current === undefined) {
                            // Before clicking "Play"
                            phiRef.current += 0.002 // Slow constant rotation
                        } else if (typeof waitIterationRef.current === 'number' && waitIterationRef.current !== -1) {
                            // During loading
                            // Speed up based on loading progress
                            phiRef.current += 0.02 / waitExponent ** waitIterationRef.current
                        }
                        // If waitIterationRef.current === -1 (completed), phiRef.current stops updating, globe freezes.
                        state.phi = phiRef.current
                    }}
                />
            </div>
        </>
    )
}
