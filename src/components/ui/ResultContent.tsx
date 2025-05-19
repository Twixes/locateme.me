/** @jsxImportSource @emotion/react */
import { resultContent } from './GlobeStyles'

export const ResultContent: React.FC = () => {
    return (
        <div css={resultContent}>
            <h1
                style={{
                    fontFamily: '"Funnel Display", sans-serif',
                    fontSize: '3rem',
                    fontWeight: 800,
                    textShadow: '0 2px 10px oklch(1 0 0 / 0.3)',
                }}
            >
                YOU ARE
            </h1>
            <img src="/point.png" style={{ maxWidth: '16rem', filter: 'drop-shadow(0 0 20px oklch(1 0 0 / 0.5))' }} />
            <h1
                style={{
                    fontFamily: '"Funnel Display", sans-serif',
                    fontSize: '3rem',
                    fontWeight: 800,
                    textShadow: '0 2px 10px oklch(1 0 0 / 0.3)',
                }}
            >
                RIGHT THERE
            </h1>
        </div>
    )
}
