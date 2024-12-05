import { LinkedStack } from './linked-stack.js'

const $value = document.querySelector('#value')
const $verify = document.querySelector('#verify')
const $preview = document.querySelector('#preview')
const $result = document.querySelector('#result')

$verify.addEventListener('click', () => verify())

const COLORS = ['text-red-500', 'text-amber-500', 'text-green-500', 'text-sky-500', 'text-violet-500', 'text-pink-500']
let lastColorUsed = 0

const OPEN_CHARACTERS = ['(', '[', '{']
const CLOSE_CHARACTERS = [')', ']', '}']

const stack = new LinkedStack()

async function verify() {
  stack.clear()
  $preview.innerHTML = ''
  $result.innerText = '-----'

  const expression = $value.value
  let balanceado = true

  for (const char of expression) {
    const $char = document.createElement('span')
    $char.innerText = char

    if (OPEN_CHARACTERS.includes(char)) {
      const color = COLORS[lastColorUsed++ % COLORS.length]
      stack.push(char, color)
      $char.classList.add(color)
    }

    if (CLOSE_CHARACTERS.includes(char)) {
      if (stack.isEmpty()) {
        $char.classList.add('bg-red-500')
        balanceado = false
      } else {
        const { chave, cor } = stack.peek()
        if (OPEN_CHARACTERS.indexOf(chave) !== CLOSE_CHARACTERS.indexOf(char)) {
          $char.classList.add('bg-red-500')
          balanceado = false
        } else {
          stack.pop()
          $char.classList.add(cor)
        }
      }
    }

    $preview.appendChild($char)
    await sleep(40)
  }

  if (!stack.isEmpty()) {
    balanceado = false
  }

  $result.innerText = balanceado ? 'Balanceado' : 'Desbalanceado'
}

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
