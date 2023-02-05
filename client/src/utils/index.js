import FileSaver from 'file-saver'

import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
    const randonIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randonIndex]

    if (randomPrompt === prompt) return getRandomPrompt(prompt)
    
    return randomPrompt
}

export async function downloadImage(_id, photo, prompt) {
    let desc = ''
    let wordsArr = prompt.split(' ')
    for (let i = 0; i < 3; i++) {
        if (i == 0) desc += wordsArr[i]
        else desc += ' ' + wordsArr[i]
    }
    FileSaver.saveAs(photo, `${desc} (...${_id.slice(20, _id.length)}).jpg`)
}