function goFullscreen() {
    return `<svg class="fullscreen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="4 9 4 4 9 4" />
                    <polyline points="15 4 20 4 20 9" />
                    <polyline points="4 15 4 20 9 20" />
                    <polyline points="20 15 20 20 15 20" />
                </svg>`
}

function goSmallScreen() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" width="24" height="24">
                    <polyline points="9 4 9 9 4 9" />
                    <polyline points="15 4 15 9 20 9" />
                    <polyline points="9 20 9 15 4 15" />
                    <polyline points="15 20 15 15 20 15" />
                </svg>`
}

function muteSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" width="24" height="24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>`
}

function unmuteSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" width="24" height="24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>`
}