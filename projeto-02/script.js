import { LinkedStack } from "./linked-stack.js";

const $value = document.querySelector("#value");
const $verify = document.querySelector("#verify");
const $preview = document.querySelector("#preview");
const $result = document.querySelector("#result");

$verify.addEventListener("click", () => verify());

const COLORS = [
  "text-red-500",
  "text-amber-500",
  "text-green-500",
  "text-sky-500",
  "text-violet-500",
  "text-pink-500",
];

const stack = new LinkedStack();

async function verify() {
  stack.clear();
  $preview.innerHTML = "";
  $result.innerText = "-----";

  const expression = $value.value;
  let balanceado = true;

  for (const char of expression) {
    const $char = document.createElement("span");
    $char.innerText = char;

    if (char === "(") {
      const color = COLORS[stack.size() % COLORS.length];
      stack.push(color);
      $char.classList.add(color);
    }

    if (char === ")") {
      if (stack.isEmpty()) {
        $char.classList.add("bg-red-500");
        balanceado = false;
      } else {
        const color = stack.peek();
        stack.pop();
        $char.classList.add(color);
      }
    }

    $preview.appendChild($char);
    await sleep(100);
  }

  if (!stack.isEmpty()) {
    balanceado = false;
  }

  $result.innerText = balanceado ? "Balanceado" : "Desbalanceado";
}

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
