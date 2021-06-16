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