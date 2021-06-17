class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems() {
    this._items.array.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

// Создание объекта класса
// const cardsList = new Section({
//   data: messageList,
//   renderer: (cardItem) => { // Обратите внимание на параметр cardItem
//     const card = cardItem.isOwner
//       ? new UserCard(cardItem, '.card-template_type_user')
//       : new DefaultCard(cardItem, '.card-template_type_default');

//     const cardElement = card.generateCard();

//     cardsList.setItem(cardElement);
//   }
// },
// cardListSection
// );

// cardsList.renderItems(); 