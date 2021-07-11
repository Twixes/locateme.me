/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ErrorBoundary } from '@sentry/react'
import { FallbackRender } from '@sentry/react/dist/errorboundary'
import posthog from 'posthog-js'
import { useState } from 'react'
import { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'

import { capitalize } from '../utils'

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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1rem',
        height: '100%',
        background: '#fff',
    }
})

const loadingButtonText = css({
    position: 'relative'
})

const loadingMessages = [
    'intercepting DNS queries',
    'consulting IP databases',
    'decrypting HTTPS traffic',
    'analyzing signal strength',
    'triangulating based on latency',
    'demolishing the firewall',
    'subpoenaing your ISP',
    'munching on browser cookies',
    'inspecting nudes',
    'combing through tax records',
    'cross-matching Interpol warrants',
    'tossing a coin'
]

const INITIAL_WAIT_MS = 1000
const WAIT_EXPONENT = 0.8

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
            {loadingMessage ? <button css={loadingButton}><div css={loadingButtonInside}><span css={loadingButtonText}>{`${capitalize(loadingMessage)}…`}</span></div></button> : <><h1>You are</h1>
            <img src="/point.png" style={{maxWidth: '12rem'}} />
            <h1>right there</h1></>}
        </main>
    )
}
