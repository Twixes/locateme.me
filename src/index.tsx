/** @jsxImportSource @emotion/react */

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import 'focus-visible'
import './index.css'

import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import App from './components/App'
import { scare } from './utils'

// Sentry.init({ dsn: 'https://eaa5d3bc32f640ceb2f8090656940497@o173795.ingest.sentry.io/5288711' })
// posthog.init('phc_jvDeCrz7SuaWXAQhmU2XcQTCWTqUpJUwg0wIA7KDIxW', { api_host: 'https://app.posthog.com' })

scare()

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <CookiesProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CookiesProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)
