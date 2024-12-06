import { Stack } from './stack.js'

const $stack = document.querySelector('#stack')
const $value = document.querySelector('#value')
const $result = document.querySelector('#result')
const $pushAction = document.querySelector('#push-action')
const $popAction = document.querySelector('#pop-action')
const $peekAction = document.querySelector('#peek-action')
const $isEmptyAction = document.querySelector('#isEmpty-action')
const $sizeAction = document.querySelector('#size-action')

$pushAction.addEventListener('click', () => executePush())
$popAction.addEventListener('click', () => executePop())
$peekAction.addEventListener('click', () => executePeek())
$isEmptyAction.addEventListener('click', () => executeIsEmpty())
$sizeAction.addEventListener('click', () => executeSize())

const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)

renderizeStack()

function renderizeStack() {
  $stack.innerHTML = ''

  for (const item of [...stack.stack].reverse()) {
    const $item = document.createElement('div')
    $item.classList.add('bg-slate-50', 'p-2', 'rounded-md', 'shadow-sm', 'min-w-10', 'text-center')
    $item.innerText = item
    $stack.appendChild($item)
  }

  $value.focus()
}

function executePush() {
  if ($value.value.trim() === '') {
    return
  }
  stack.push(+$value.value)
  $result.innerText = 'push: ' + +$value.value
  renderizeStack()
  $value.value = ''
}

function executePop() {
  try {
    $result.innerText = 'pop: ' + stack.pop()
  } catch (err) {
    $result.innerText = 'Erro: ' + err.message
  }
  renderizeStack()
}

function executePeek() {
  try {
    $result.innerText = 'peek: ' + stack.peek()
  } catch (err) {
    $result.innerText = 'Erro: ' + err.message
  }
  renderizeStack()
}

function executeIsEmpty() {
  $result.innerText = 'isEmpty: ' + (stack.isEmpty() ? 'Sim' : 'Não')
  renderizeStack()
}

function executeSize() {
  $result.innerText = 'size: ' + stack.size()
  renderizeStack()
}
