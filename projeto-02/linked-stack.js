class Node {
  constructor(chave, cor) {
    this.chave = chave
    this.cor = cor
    this.proximo = null
  }
}

export class LinkedStack {
  constructor() {
    this.topo = null
    this.tamanho = 0
  }

  push(chave, cor) {
    const novoNo = new Node(chave, cor)
    novoNo.proximo = this.topo
    this.topo = novoNo
    this.tamanho++
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('A fila está vazia')
    }

    const noRemovido = this.topo
    this.topo = this.topo.proximo
    this.tamanho--
    return noRemovido
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('A fila está vazia')
    }

    return this.topo
  }

  isEmpty() {
    return this.tamanho === 0
  }

  size() {
    return this.tamanho
  }

  clear() {
    this.topo = null
    this.tamanho = 0
  }
}
