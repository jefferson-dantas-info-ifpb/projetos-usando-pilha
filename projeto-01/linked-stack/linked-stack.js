class Node {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

export class LinkedStack {
  constructor() {
    this.topo = null;
    this.tamanho = 0;
  }

  push(valor) {
    const novoNo = new Node(valor);
    novoNo.proximo = this.topo;
    this.topo = novoNo;
    this.tamanho++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }

    const noRemovido = this.topo;
    this.topo = this.topo.proximo;
    this.tamanho--;
    return noRemovido.valor;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }

    return this.topo.valor;
  }

  isEmpty() {
    return this.tamanho === 0;
  }

  size() {
    return this.tamanho;
  }
}
