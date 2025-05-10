/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import posthog from 'posthog-js'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { capitalize } from '../utils'
import { Globe } from './COBE'

const INITIAL_WAIT_MS = 1000
const WAIT_EXPONENT = 0.85

const loadingMessages = [
    'intercepting DNS queries',
    'consulting IP databases',
    'analyzing signal strength',
    'straightening elliptic curves',
    'checking available fonts',
    'triangulating based on latency',
    'demolishing the firewall',
    'subpoenaing your ISP',
    'calculating block hash',
    'munching on browser cookies',
    'pulling satellite imagery',
    'combing through tax records',
    'throwing darts',
    'cross-matching Interpol warrants',
    'tossing a coin',
    'inspecting nudes',
]

// Randomize messages just a little
for (let i = 0; i < loadingMessages.length - 1; i++) {
    if (Math.random() >= 0.5) {
        const temp = loadingMessages[i]
        loadingMessages[i] = loadingMessages[i + 1]
        loadingMessages[i + 1] = temp
    }
}

const waitTotalMs = Math.round((INITIAL_WAIT_MS * (1 - WAIT_EXPONENT ** loadingMessages.length)) / (1 - WAIT_EXPONENT))

const loading = keyframes`
    from {
        width: 0%;
    } to {
        width: 100%;
    }
`

const main = css({
    margin: '1rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
})

const loadingButton = css({
    background: 'linear-gradient(90deg, var(--color-brand-start), var(--color-brand-end))',
    color: '#000',
    font: '600 1.25rem Inter, sans-serif',
    width: '24rem',
    height: '3rem',
    borderRadius: '0.5rem',
    padding: '0.25rem',
    border: 'none',
})

const loadingButtonInside = css({
    position: 'relative',
    height: '100%',
    lineHeight: '2.5rem',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    cursor: 'pointer',
    '::before': {
        content: '""',
        transition: 'width 200ms ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '0',
        height: '100%',
        background: '#fff',
    },
})

const loadingButtonInsideProgress = css({
    '::before': {
        animation: `${loading} ${waitTotalMs}ms cubic-bezier(.2,.4,.9,.4) forwards`,
    },
})

const loadingButtonInsideDone = css({
    '::before': {
        width: '100%',
    },
})

const loadingButtonText = css({
    position: 'relative',
})

export default function App(): JSX.Element {
    const history = useHistory()
    const [waitIteration, setWaitIteration] = useState<number | undefined>(undefined)
    const waitIterationRef = useRef<number | undefined>(waitIteration)
    const phiRef = useRef(0.0) // For accumulating globe rotation

    useEffect(() => {
        waitIterationRef.current = waitIteration

        // Only proceed if waitIteration is a number, not undefined (initial) and not -1 (completed)
        if (typeof waitIteration === 'number' && waitIteration !== -1) {
            if (waitIteration < loadingMessages.length) {
                const timer = setTimeout(() => {
                    setWaitIteration((prev) => (typeof prev === 'number' ? prev + 1 : 0)) // Increment if number
                }, INITIAL_WAIT_MS * WAIT_EXPONENT ** waitIteration)
                return () => clearTimeout(timer)
            } else {
                // All messages have been shown, transition to completed state
                setWaitIteration(-1)
            }
        }
        // No cleanup needed if not in an active loading iteration, so no explicit return is necessary for undefined.
        // ESLint might prefer omitting the return entirely or returning undefined explicitly.
        // To be safe and explicit for React's useEffect, we can return nothing or an empty function.
        // The previous `return () => {};` is valid, but if the linter complains, let's try omitting it or returning undefined.
        // For now, let's stick to the previous explicit empty function as it's a common pattern for no-op cleanups.
        // If the linter specifically complained about `() => {}`, it might want `() => undefined` or just no return.
        // Let's remove the explicit return for the no-op case.
        return
    }, [waitIteration])

    history.listen(() => {
        posthog.capture('$pageview')
    })

    // const loadingMessage = loadingMessages[waitIteration] // No longer needed here
    // let phi = 0.0; // Replaced by phiRef

    return (
        <main css={main}>
            {waitIteration === -1 ? ( // Loading complete: Show results
                <>
                    <h1>You are</h1>
                    <img src="/point.png" style={{ maxWidth: '12rem' }} />
                    <h1>right there</h1>
                </>
            ) : (
                <Globe
                    devicePixelRatio={2}
                    width={500 * 2}
                    height={500 * 2}
                    phi={0} // Initial phi, onRender will drive changes
                    theta={0}
                    dark={1}
                    diffuse={1.2}
                    mapSamples={16000}
                    mapBrightness={6}
                    baseColor={[0.3, 0.3, 0.3]}
                    markerColor={[0.1, 0.8, 1]}
                    glowColor={[1, 1, 1]}
                    markers={[
                        { location: [37.7595, -122.4367], size: 0.03 },
                        { location: [40.7128, -74.006], size: 0.1 },
                    ]}
                    onRender={(state) => {
                        if (waitIterationRef.current === undefined) {
                            // Before clicking "Locate me"
                            phiRef.current += 0.002 // Slow constant rotation
                        } else if (typeof waitIterationRef.current === 'number' && waitIterationRef.current !== -1) {
                            // During loading
                            // Speed up based on loading progress
                            phiRef.current += 0.01 / WAIT_EXPONENT ** waitIterationRef.current
                        }
                        // If waitIterationRef.current === -1 (completed), phiRef.current stops updating, globe freezes.
                        state.phi = phiRef.current
                    }}
                />
            )}
            {waitIteration === undefined && ( // Initial state: "Locate me now" button
                <button
                    css={loadingButton}
                    onClick={() => {
                        posthog.capture('locate_me_now_clicked')
                        setWaitIteration(0) // Start the loading sequence
                    }}
                >
                    <div css={loadingButtonInside}>
                        {' '}
                        {/* No progress animation initially */}
                        <span css={loadingButtonText}>Locate me now</span>
                    </div>
                </button>
            )}

            {typeof waitIteration === 'number' &&
                waitIteration < loadingMessages.length && ( // Loading in progress
                    <button css={loadingButton} disabled>
                        {/* Button is not interactive during loading */}
                        <div css={[loadingButtonInside, waitIteration === -1 ? loadingButtonInsideDone : loadingButtonInsideProgress]}>
                            <span css={loadingButtonText}>{waitIteration !== -1 ? `${capitalize(loadingMessages[waitIteration])}…` : 'Done'}</span>
                        </div>
                    </button>
                )}
        </main>
    )
}
