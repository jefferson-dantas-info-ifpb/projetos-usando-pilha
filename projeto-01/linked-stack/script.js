import { LinkedStack } from "./linked-stack.js";

const $stack = document.querySelector("#stack");
const $value = document.querySelector("#value");
const $result = document.querySelector("#result");
const $pushAction = document.querySelector("#push-action");
const $popAction = document.querySelector("#pop-action");
const $peekAction = document.querySelector("#peek-action");
const $isEmptyAction = document.querySelector("#isEmpty-action");
const $sizeAction = document.querySelector("#size-action");

$pushAction.addEventListener("click", () => executePush());
$popAction.addEventListener("click", () => executePop());
$peekAction.addEventListener("click", () => executePeek());
$isEmptyAction.addEventListener("click", () => executeIsEmpty());
$sizeAction.addEventListener("click", () => executeSize());

const stack = new LinkedStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

renderizeStack();

function renderizeStack() {
  $stack.innerHTML = "";

  let top = stack.topo;
  while (top !== null) {
    const $item = document.createElement("div");
    $item.classList.add(
      "bg-slate-50",
      "p-2",
      "rounded-md",
      "shadow-sm",
      "min-w-10",
      "text-center"
    );
    $item.innerText = top.valor;
    $stack.appendChild($item);
    top = top.proximo;
  }
}

function executePush() {
  stack.push(+$value.value);
  $result.innerText = "push: " + +$value.value;
  renderizeStack();
}

function executePop() {
  $result.innerText = "pop: " + stack.pop();
  renderizeStack();
}

function executePeek() {
  $result.innerText = "peek: " + stack.peek();
  renderizeStack();
}

function executeIsEmpty() {
  $result.innerText = "isEmpty: " + (stack.isEmpty() ? "Sim" : "Não");
  renderizeStack();
}

function executeSize() {
  $result.innerText = "size: " + stack.size();
  renderizeStack();
}
