import { css, keyframes } from '@emotion/react'

// Animations
export const glow = keyframes`
  0% {
    box-shadow: 0 0 10px oklch(0.75 0.15 230 / 0.6), 0 0 20px oklch(0.75 0.15 230 / 0.4);
  }
  50% {
    box-shadow: 0 0 15px oklch(0.8 0.12 225 / 0.8), 0 0 30px oklch(0.8 0.12 225 / 0.6);
  }
  100% {
    box-shadow: 0 0 10px oklch(0.75 0.15 230 / 0.6), 0 0 20px oklch(0.75 0.15 230 / 0.4);
  }
`

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`

export const loading = keyframes`
  from {
    width: 0%;
  } to {
    width: 100%;
  }
`

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Global styles
export const globalStyles = css`
    html,
    body,
    #root {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        background: oklch(0.13 0.01 240);
        font-family: 'DM Sans', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    body > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

// Layout styles
export const main = css({
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    h1: {
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: '700',
        fontSize: '2rem',
        margin: '1rem 0',
        color: 'oklch(1 0 0)',
    },
})

export const globeContainer = css({
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
})

export const buttonContainer = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
})

export const resultContent = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'oklch(1 0 0)',
    zIndex: 10,
    textAlign: 'center',
})

// Button styles
export const playButton = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'oklch(0.55 0.2 250)',
    background: 'linear-gradient(180deg, oklch(0.65 0.18 245) 0%, oklch(0.55 0.2 250) 100%)',
    color: 'oklch(1 0 0)',
    font: '700 1.25rem "DM Sans", sans-serif',
    width: '20rem',
    height: '3.5rem',
    borderRadius: '8px',
    padding: '0 2rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 25px oklch(0.6 0.18 245 / 0.5)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    ':hover': {
        background: 'linear-gradient(180deg, oklch(0.72 0.15 240) 0%, oklch(0.65 0.18 245) 100%)',
        boxShadow: '0 0 30px oklch(0.6 0.18 245 / 0.7)',
        animation: `${glow} 2s infinite ease-in-out`,
        transform: 'scale(1.05)',
    },
})

export const loadingButton = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'oklch(0.55 0.2 250)',
    background: 'linear-gradient(180deg, oklch(0.65 0.18 245) 0%, oklch(0.55 0.2 250) 100%)',
    color: 'oklch(1 0 0)',
    font: '700 italic 1.25rem "DM Sans", sans-serif',
    borderRadius: '8px',
    padding: '0.375rem',
    border: 'none',
    cursor: 'progress',
    boxShadow: '0 0 25px oklch(0.6 0.18 245 / 0.5)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.5px',
})

export const loadingButtonInside = css({
    position: 'relative',
    lineHeight: '1.5rem',
    borderRadius: '0.25rem',
    padding: '0.5rem 0.75rem',
    overflow: 'hidden',
    background: 'transparent',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '::before': {
        content: '""',
        transition: 'width 200ms ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '0',
        height: '100%',
        background: 'oklch(1 0 0 / 0.2)',
        boxShadow: 'inset 0 0 15px oklch(1 0 0 / 0.2)',
    },
})

export const loadingButtonInsideProgress = (waitTotalMs: number): ReturnType<typeof css> =>
    css({
        '::before': {
            animation: `${loading} ${waitTotalMs}ms cubic-bezier(.2,.4,.9,.4) forwards`,
        },
    })

export const loadingButtonText = css({
    position: 'relative',
    color: 'oklch(1 0 0)',
    fontWeight: '700',
    textShadow: '0 1px 10px oklch(1 0 0 / 0.8)',
    letterSpacing: '1px',
    zIndex: 2,
})

// Globe styles
export const globeWrapper = css({
    position: 'relative',
    '::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background:
            'radial-gradient(circle at 30% 30%, oklch(0.6 0.2 300 / 0.4) 0%, oklch(0.65 0.18 245 / 0.2) 50%, oklch(0.45 0.1 250 / 0) 70%)',
        filter: 'blur(40px)',
        zIndex: -1,
    },
    '::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background:
            'radial-gradient(circle at 70% 70%, oklch(0.72 0.15 240 / 0.3) 0%, oklch(0.4 0.15 270 / 0.15) 50%, oklch(0.45 0.1 250 / 0) 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
    },
})

// Additional orbital elements
export const orbit1 = keyframes`
  from { transform: rotate(0deg) translateX(312.5px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(312.5px) rotate(-360deg); }
`

export const orbit2 = keyframes`
  from { transform: rotate(0deg) translateX(375px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(375px) rotate(-360deg); }
`

export const orbit3 = keyframes`
  from { transform: rotate(0deg) translateX(250px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(250px) rotate(-360deg); }
`

// Orbit paths
export const orbitPath1 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '625px', // 312.5px radius * 2
    height: '625px', // 312.5px radius * 2
    borderRadius: '50%',
    border: '1px solid oklch(0.7 0.15 240 / 0.2)',
    boxShadow: '0 0 15px oklch(0.7 0.15 240 / 0.1)',
    zIndex: 1,
})

export const orbitPath2 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '750px', // 375px radius * 2
    height: '750px', // 375px radius * 2
    borderRadius: '50%',
    border: '1px solid oklch(0.7 0.25 350 / 0.2)',
    boxShadow: '0 0 15px oklch(0.7 0.25 350 / 0.1)',
    zIndex: 1,
})

export const orbitPath3 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', // 250px radius * 2
    height: '500px', // 250px radius * 2
    borderRadius: '50%',
    border: '1px solid oklch(0.85 0.18 160 / 0.2)',
    boxShadow: '0 0 15px oklch(0.85 0.18 160 / 0.1)',
    zIndex: 1,
})

// Orbit bodies
export const orbitBody1 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, oklch(0.7 0.15 240) 0%, oklch(0.7 0.15 240 / 0) 70%)',
    boxShadow: '0 0 15px oklch(0.7 0.15 240), 0 0 30px oklch(0.7 0.15 240 / 0.5)',
    // Middle orbit (250px radius) - reference orbit
    transform: 'translate(-50%, -50%)',
    animation: `${orbit1} 15.8s linear infinite`,
    zIndex: 5,
})

export const orbitBody2 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, oklch(0.7 0.25 350) 0%, oklch(0.7 0.25 350 / 0) 70%)',
    boxShadow: '0 0 15px oklch(0.7 0.25 350), 0 0 30px oklch(0.7 0.25 350 / 0.5)',
    // Outer orbit (300px radius) - slower according to Kepler's Third Law
    transform: 'translate(-50%, -50%)',
    animation: `${orbit2} 26.0s linear infinite reverse`,
    zIndex: 5,
})

export const orbitBody3 = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, oklch(0.85 0.18 160) 0%, oklch(0.85 0.18 160 / 0) 70%)',
    boxShadow: '0 0 15px oklch(0.85 0.18 160), 0 0 30px oklch(0.85 0.18 160 / 0.5)',
    // Inner orbit (200px radius) - faster according to Kepler's Third Law
    transform: 'translate(-50%, -50%)',
    animation: `${orbit3} 10.4s linear infinite`,
    zIndex: 5,
})
