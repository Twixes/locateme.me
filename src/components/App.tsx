/** @jsxImportSource @emotion/react */

import { Global } from '@emotion/react'
import { motion } from 'framer-motion'
import posthog from 'posthog-js'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { ActionButton } from './ui/ActionButton'
import { EnhancedGlobe } from './ui/EnhancedGlobe'
import { buttonContainer, globalStyles, globeContainer, main } from './ui/GlobeStyles'
import { ResultContent } from './ui/ResultContent'

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

export const WAIT_TOTAL_MS = Math.round(
    (INITIAL_WAIT_MS * (1 - WAIT_EXPONENT ** loadingMessages.length)) / (1 - WAIT_EXPONENT)
)

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
        return
    }, [waitIteration])

    useEffect(() => {
        // Preload point.png
        new Image().src = '/point.png'
    }, [])

    history.listen(() => {
        posthog.capture('$pageview')
    })

    const handlePlayClick = () => {
        posthog.capture('locate_me_now_clicked')
        setWaitIteration(0) // Start the loading sequence
    }

    return (
        <>
            <Global styles={globalStyles} />
            <main css={main}>
                <EnhancedGlobe
                    phiRef={phiRef}
                    waitIteration={waitIteration}
                    waitIterationRef={waitIterationRef}
                    waitExponent={WAIT_EXPONENT}
                />

                {waitIteration === -1 ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                        style={{
                            position: 'absolute',
                        }}
                    >
                        <ResultContent />
                    </motion.div>
                ) : (
                    <div css={buttonContainer}>
                        <ActionButton
                            waitIteration={waitIteration}
                            loadingMessages={loadingMessages}
                            waitTotalMs={WAIT_TOTAL_MS}
                            onClick={handlePlayClick}
                        />
                    </div>
                )}
            </main>
        </>
    )
}
