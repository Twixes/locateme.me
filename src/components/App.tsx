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
        loadingMessages[i] = loadingMessages[i+1]
        loadingMessages[i+1] = temp
    }
}

const waitTotalMs = Math.round(INITIAL_WAIT_MS * (1 - WAIT_EXPONENT**loadingMessages.length) / (1 - WAIT_EXPONENT))

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
    textAlign: 'center'
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
    '::before': {
        content: '""',
        transition: 'width 200ms ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1rem',
        height: '100%',
        background: '#fff',
    }
})

const loadingButtonInsideProgress = css({
    '::before': {
        animation: `${loading} ${waitTotalMs}ms cubic-bezier(.2,.4,.9,.4) forwards`
    }
})

const loadingButtonText = css({
    position: 'relative'
})


export default function App(): JSX.Element {
    const history = useHistory()
    const [waitIteration, setWaitIteration] = useState(0)
    const waitIterationRef = useRef(waitIteration)

    useEffect(() => {
        waitIterationRef.current = waitIteration
        if (waitIteration < loadingMessages.length) {
            const timer = setTimeout(() => {
                setWaitIteration(prevState => prevState + 1)
            }, INITIAL_WAIT_MS * WAIT_EXPONENT ** waitIteration);
            return () => clearTimeout(timer)
        } else {
            setWaitIteration(-1)
            return () => null
        }
      }, [waitIteration]);

    history.listen(() => {
        posthog.capture('$pageview')
    })

    const loadingMessage = loadingMessages[waitIteration]
    let phi = 0.0;

    return (
        <main css={main}>
            {loadingMessage ? <button css={loadingButton}><div css={[loadingButtonInside, loadingButtonInsideProgress]}><span css={loadingButtonText}>{`${capitalize(loadingMessage)}…`}</span></div></button> : <><h1>You are</h1>
            <img src="/point.png" style={{maxWidth: '12rem'}} />
            <h1>right there</h1></>}
            <Globe
        devicePixelRatio={2}
        width={500 * 2}
        height={500 * 2}
        phi={0}
        theta={0}
        dark={1}
        diffuse={1.2}
        mapSamples={16000}
        mapBrightness={6}
        baseColor={[0.3, 0.3, 0.3]}
        markerColor={[0.1, 0.8, 1]}
        glowColor={[1, 1, 1]}
        markers={[
          { location: [37.7595, -122.4367], size: 0.03},
          { location: [40.7128, -74.006], size: 0.1 }
        ]}
        onRender={(state) => {
          state.phi = phi;
          phi += 0.01 / WAIT_EXPONENT ** waitIterationRef.current;
        }}
      />
        </main>
    )
}
