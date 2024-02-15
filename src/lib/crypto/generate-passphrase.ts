import * as crypto from "crypto"
import { readFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const words = readFileSync(resolve(dirname(__filename),"./words.txt"),"utf8").split('\n')
let randomBytes: Buffer
let randomIndex: number

const getRandomValue = () => {
  if (randomIndex === undefined || randomIndex >= randomBytes.length) {
    randomBytes = crypto.randomBytes(256)
    randomIndex = 0
  }
  randomIndex += 1
  return randomBytes[randomIndex]
}

const getRandomNumber = (max: number) => {
  let rand = getRandomValue()
  while (rand === undefined || rand >= 256 - (256 % max)) rand = getRandomValue()
  return rand % max
}

const getRandomPattern = (length: number, numbers: boolean) => {
  const pool = (numbers) ? "NWW" : "WWW"
  let pattern = ""
  for (let i = 0; i < length; i++) pattern += pool[getRandomNumber(2)]
  return pattern
}

const getRandomWord = () => {
  const randomInt = crypto.randomInt(0, words.length)
  return words[randomInt]!
}

export const generatePassphrase = () => {
  const passphraseArray: string[] = [...getRandomPattern(12, false)].map(_ => getRandomWord());
  const passphrase = passphraseArray.join(" ")
  return passphrase
}
