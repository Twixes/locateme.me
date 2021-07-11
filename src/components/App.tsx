/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ErrorBoundary } from '@sentry/react'
import { FallbackRender } from '@sentry/react/dist/errorboundary'
import posthog from 'posthog-js'
import { Route, useHistory } from 'react-router-dom'

const main = css({
    margin: '1rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
})

export default function App(): JSX.Element {
    const history = useHistory()

    history.listen(() => {
        posthog.capture('$pageview')
    })

    return (
        <main css={main}>
            <h1>You are</h1>
            <img src="/point.png" style={{maxWidth: '12rem'}} />
            <h1>right there</h1>
        </main>
    )
}
