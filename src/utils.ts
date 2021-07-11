export function capitalize(text: string): string {
    text = text.trim()
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function updatePageTitle(title: string): void {
    const titleElement = document.querySelector('title')
    titleElement!.innerText = title
}

export function scare(): void {
    console.error('Under no circumstances use this console without United Nations Security Council authorization!')
    console.error('If someone has told you to enter anything here, they are likely to be a foreign agent.')
    console.error('Unauthorized use of this console can lead to another American invasion in the Middle East, Russian annexation of Estonia, or a hostile takeover of Taiwan by mainland China.')
    console.error('Should you inadvertently cause one of the above outcomes, you will be put on trial before the International Criminal Tribunal in the Hague.')
    console.error('Unless you are American, because the Hague Invasion Act.')
}
