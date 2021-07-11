/** @jsxImportSource @emotion/react */

import { ErrorBoundary } from '@sentry/react'
import { FallbackRender } from '@sentry/react/dist/errorboundary'
import posthog from 'posthog-js'
import { Route, useHistory } from 'react-router-dom'

export default function App(): JSX.Element {
    const history = useHistory()

    history.listen(() => {
        posthog.capture('$pageview')
    })

    return (
        <main style={{ margin: '0 auto', textAlign: 'center'}}>
            <h1>You are</h1>
            <img src="/point.png" style={{maxWidth: '12rem'}} />
            <h1>right there</h1>
        </main>
    )
}
