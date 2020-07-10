export class CardList {
  constructor(list, addCardFunction) {
    this.list = list;
    this.addCardFunction = addCardFunction;
  }

  addCard(element) {
    this.list.append(element);
  }

  render(initial) {
    initial.forEach((card) => {
      this.addCard(this.addCardFunction(card))
    })
  }
}

