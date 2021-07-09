export default class Section {
  constructor({items, renderer}, containerSelector, config) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);

    this._url = config.url + '/cards';
    this._headers = config.headers;
  }

  getCards() {
    return fetch(this._url, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw res.status;
      })
  }

  addCard(title, description) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: description
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw res.status;
      })
  }

  rendererItems() {
    this.getCards()
      .then(items => {
        items.forEach(item => {
          this._renderer(item);
        });
      })
  }

  addItem(element) {
    this._container.prepend(element);


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