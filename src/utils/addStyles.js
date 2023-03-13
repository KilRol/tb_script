export function addStyles(source, styles) {
    for (const [key, value] of Object.entries(styles)) {
        source.style[key] = value
    }
}