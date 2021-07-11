/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import posthog from 'posthog-js'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { capitalize } from '../utils'

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
    'inspecting nudes',
    'combing through tax records',
    'throwing darts',
    'cross-matching Interpol warrants',
    'tossing a coin',
]

// Randomize messages a little
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

    useEffect(() => {
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

    return (
        <main css={main}>
            {loadingMessage ? <button css={loadingButton}><div css={[loadingButtonInside, loadingButtonInsideProgress]}><span css={loadingButtonText}>{`${capitalize(loadingMessage)}…`}</span></div></button> : <><h1>You are</h1>
            <img src="/point.png" style={{maxWidth: '12rem'}} />
            <h1>right there</h1></>}
        </main>
    )
}
