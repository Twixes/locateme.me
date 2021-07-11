export function capitalize(text: string): string {
    text = text.trim()
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function updatePageTitle(title: string): void {
    const titleElement = document.querySelector('title')
    titleElement!.innerText = title
}
