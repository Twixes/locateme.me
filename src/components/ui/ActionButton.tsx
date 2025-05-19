/** @jsxImportSource @emotion/react */
import { capitalize } from '../../utils'
import {
    loadingButton,
    loadingButtonInside,
    loadingButtonInsideProgress,
    loadingButtonText,
    playButton,
} from './GlobeStyles'

type ActionButtonProps = {
    waitIteration: number | undefined
    loadingMessages: string[]
    waitTotalMs: number
    onClick: () => void
}

export const ActionButton: React.FC<ActionButtonProps> = ({ waitIteration, loadingMessages, waitTotalMs, onClick }) => {
    if (waitIteration === undefined) {
        return (
            <button css={playButton} onClick={onClick}>
                <div css={loadingButtonInside}>
                    <span css={loadingButtonText}>LOCATE ME NOW</span>
                </div>
            </button>
        )
    }

    if (typeof waitIteration === 'number' && waitIteration < loadingMessages.length) {
        return (
            <button css={loadingButton} disabled>
                <div css={[loadingButtonInside, loadingButtonInsideProgress(waitTotalMs)]}>
                    <span css={loadingButtonText}>{`${capitalize(
                        loadingMessages[waitIteration]
                    ).toUpperCase()}…`}</span>
                </div>
            </button>
        )
    }

    return null
}
