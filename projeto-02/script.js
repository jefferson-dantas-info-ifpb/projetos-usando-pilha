import { LinkedStack } from './linked-stack.js'

const stack = new LinkedStack()

const $value = document.querySelector('#value')
const $verify = document.querySelector('#verify')
const $preview = document.querySelector('#preview')
const $result = document.querySelector('#result')

$verify.addEventListener('click', () => verify())

// Cores para demarcar os caracteres de parênteses, colchetes e chaves
const COLORS = ['text-red-500', 'text-amber-500', 'text-green-500', 'text-sky-500', 'text-violet-500', 'text-pink-500']
// Índice da última cor usada para demarcar os caracteres de parênteses, colchetes e chaves
let lastColorUsed = 0

// Caracteres de abertura e fechamento
const OPEN_CHARACTERS = ['(', '[', '{']
const CLOSE_CHARACTERS = [')', ']', '}']

async function verify() {
  stack.clear() // Limpa a pilha
  $preview.innerHTML = '' // Limpa o preview
  $result.innerText = '-----' // Reseta o resultado

  let balanceado = true // Variável que guarda se a expressão está balanceada

  // Itera sobre cada letra da expressão
  for (const char of $value.value) {
    // Cria uma tag span para exibir o caractere
    const $char = document.createElement('span')
    $char.innerText = char

    // Adiciona o caractere à pilha se for um caractere de abertura ( [ {
    if (OPEN_CHARACTERS.includes(char)) {
      const color = COLORS[lastColorUsed++ % COLORS.length]
      stack.push(char, color)
      $char.classList.add(color)
    }

    // Verifica se o caractere é um caractere de fechamento ) ] }
    if (CLOSE_CHARACTERS.includes(char)) {
      // Se a pilha estiver vazia significa que há um caractere de fechamento a mais
      if (stack.isEmpty()) {
        $char.classList.add('bg-red-500')
        balanceado = false
      } else {
        const { chave, cor } = stack.peek()

        // Verifica se o caractere do topo da pilha corresponde ao caractere de fechamento
        if (OPEN_CHARACTERS.indexOf(chave) !== CLOSE_CHARACTERS.indexOf(char)) {
          $char.classList.add('bg-red-500')
          balanceado = false
        } else {
          // Remove o caractere da pilha
          stack.pop()
          $char.classList.add(cor)
        }
      }
    }

    // Adiciona o caractere ao preview
    $preview.appendChild($char)

    // Aguarda 50 ms para animar
    await sleep(50)
  }

  // Se a pilha não estiver vazia significa que há um caractere de abertura faltando fechar
  if (!stack.isEmpty()) {
    balanceado = false
  }

  // Mostra o resultado
  $result.innerText = balanceado ? 'Balanceado' : 'Desbalanceado'
}

// Cria uma promise que é resolvida quando passa algum tempo
async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
