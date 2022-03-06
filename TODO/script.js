'use strict';
!(function (){
    function createElement({tagName = 'div', classes = [], attributes: attributes = {}, textContent = ''}){
    if (typeof tagName !== 'string'){
        console.warn('tagName _createElement method of App must me string');
        let errorElement = document.createElement('div');
        errorElement.textContent = 'tagName _createElement method of App must be a string';
        return errorElement;
    }

    let element = document.createElement(tagName);

    if (typeof textContent === 'string'){
        element.textContent = textContent;
    } else {
        console.warn('tagName _createElement method of App must me string')

    }

    if (Array.isArray(classes)){
        classes.forEach(className =>{
            if (typeof className === 'string'){
                element.classList.add(className);
            } else {
                console.warn('classes element of App _createElement method must be a string')
            }
        })
    }


    if (typeof attributes === 'object' && attributes){
        Object.entries(attributes).forEach(pair =>{
            if (pair[0] !== 'string' || pair[1] !== 'string') {
                element.setAttribute(pair[0], pair[1]);
            } else {
                console.warn('classes element of App _createElement method must be a string')
            }
        })
    }
    return element;

    }

    class App {
        constructor() {
            this.cardsArr = [];
            this._LS = localStorage;
            this._body = document.querySelector('body');
            this._init();
        }

        _init() {
            this._createApp();
            this._getCards();
            this._attachEvents();
        }

        _attachEvents() {
            this.formButton.addEventListener('click', this._formAction.bind(this));

            this.sortButton.addEventListener('click', this.sortByName.bind(this));

            this.sortReverseButton.addEventListener('click', this.sortByNameReverse.bind(this));
        }

        _createApp() {
            this.appBlock = createElement({classes: ['container']});
            let title = createElement({tagName: 'h1', textContent: 'Awesome TODO app'});

            this.sortButton = createElement({
                tagName: 'button',
                textContent: 'A-Z',
                classes: ['btn', 'btn-primary', 'button-sort'],
                attributes: {'data-role': 'sort'}
            });

            this.sortReverseButton = createElement({
                tagName: 'button',
                textContent: 'Z-A',
                classes: ['btn', 'btn-primary', 'button-sort'],
                attributes: {'data-role': 'sort'}
            });

            this.formButton = createElement({
                tagName: 'button',
                textContent: 'create card',
                classes: ['btn', 'btn-primary'],
                attributes: {'data-role': 'create'}
            });
            this._cardsBlock = createElement({classes: ['container', 'cards-block']});
            this._nameField = createElement({
                tagName: 'input',
                textContent: '',
                classes: ['form-control'],
                attributes: {placeholder: 'Name', autocomplete: 'autocomplete'}
            });
            this._descriptionField = createElement({
                tagName: 'textarea',
                classes: ['form-control'],
                attributes: {placeholder: 'Description', autocomplete: 'autocomplete'}
            });

            this.appBlock.append(title, this._nameField, this._descriptionField, this.formButton, this._cardsBlock);
            this._body.append(this.appBlock);

            this._body.before(this.sortButton, this.sortReverseButton);
        }

        _getCards() {
            let cardsJSON = this._LS.getItem('cards');
            if (cardsJSON) {
                let cardsData = JSON.parse(cardsJSON);

                this.cardsArr = cardsData.map(cardData => {
                    return new Card({
                        cardTitle: cardData.title,
                        cardText: cardData.text,
                        isImportance: cardData.importance,
                        isDone: cardData.done
                    })
                })
                this.cardsArr.forEach(card => {
                    this._cardsBlock.append(card.element)
                })
            }
        }

        _getFormData() {
            let cardData = {}
            cardData.cardTitle = this._nameField.value;
            cardData.cardText = this._descriptionField.value;
            return cardData;
        }

        _validateForm() {
            let textFieldState = [];
            textFieldState.push(this._validateTextField(this._nameField));
            textFieldState.push(this._validateTextField(this._descriptionField));

            return !textFieldState.some(state => state === false)
        }

        _getExisting() {
            this.cardData = this._getFormData();
            return this.cardsArr.some(card => card.title === this.cardData.cardTitle);
        }

        _formAction() {
            if (!this._validateForm()) {
                return;
            }

            if (this._getExisting()) {
                let isCreate = confirm('You have a card with current title. Do you want ad one more?')
                if (!isCreate) return;
            }

            if (this.formButton.dataset.role === 'create') {
                let card = new Card(this.cardData);
                this.cardsArr.push(card);
                this._updateLS();
                this._cardsBlock.append(card.element);
            } else if (this.formButton.dataset.role === 'update') {
                this.editableCard.title = this._nameField.value;
                this.editableCard.text = this._descriptionField.value;

                this._updateLS();
                this.editableCard._updateCard();
                this._resetForm();
            }
        }

        _resetForm() {
            this._nameField.value = '';
            this._descriptionField.value = '';
            this.formButton.textContent = 'Create card';
            this.formButton.setAttribute('data-role', 'create');
        }

        _updateLS() {
            let cardsStates = this.cardsArr.map(card => {
                return {
                    title: card.title,
                    text: card.text,
                    importance: card.isImportance,
                    done: card.isDone
                }
            })
            this._LS.setItem('cards', JSON.stringify(cardsStates));


        }

        _validateTextField(field) {
            if (field.value === '') {
                field.classList.add('is-invalid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                return true;
            }
        }

        deleteCard(card) {
            this.cardsArr = this.cardsArr.filter(appCard => {
                return card !== appCard;
            })
            this._updateLS();
        }

        updateCard(card, importanceChange) {
            if (importanceChange) {
                this._updateLS();
                return;
            }

            this._nameField.value = card.title;
            this._descriptionField.value = card.text;
            this.formButton.textContent = 'Save card';
            this.formButton.setAttribute('data-role', 'update');
            this.editableCard = card;
        }

        //создаем метод, который обновляет все карточки
        _updateBlock() {
            this.cardsArr.forEach(card => {
                this._cardsBlock.append(card.element)
            })
        }

        //создаем методы для сортировки в алфавитном порядке по названию карточки
        sortByName() {
            this.cardsArr = this.cardsArr.sort(function (a, b) {
                return a.title > b.title ? 1 : -1;
            })
            this._updateLS();
            this._updateBlock();
        }

        sortByNameReverse() {
            this.cardsArr = this.cardsArr.reverse(function (a, b) {
                return a.title < b.title ? 1 : -1;
            })
            this._updateLS();
            this._updateBlock();
        }

        _sortByImportant() {
            this.cardsArr = this.cardsArr.sort(function (a, b) {
                return a.isImportance < b.isImportance ? 1 : -1;
            })
            this._updateLS();
            this._updateBlock();
        }

        _sortByNotImportant() {
            this.cardsArr = this.cardsArr.sort(function (a, b) {
                return a.isImportance > b.isImportance ? -1 : 1;
            })
            this._updateLS();
            this._updateBlock();
        }
    }

    class Card {
        constructor({cardTitle = '', cardText = '', isImportance = false, isDone = false}) {
            this.title = cardTitle;
            this.text = cardText;
            this.isImportance = isImportance;
            this.isDone = isDone;
            this._init();
        }

        _init(){
            this.element = this._createElement();
            this._attachEvents();
        }


        _attachEvents(){
            this._deleteButton.addEventListener('click', event =>{
                this._deleteCard();
            })

            this._updateButton.addEventListener('click', event =>{
                app.updateCard(this);
            })

            this._importanceCheckbox.addEventListener('change', event =>{
                this.isImportance = this._importanceCheckbox.checked;
                app.updateCard(this, true);
                if (this.isImportance){
                    this.element.classList.add('card--importance');
                    app._sortByImportant();
                } else {
                    this.element.classList.remove('card--importance');
                    app._sortByNotImportant();
                }
            })

            this._doneCheckbox.addEventListener('change', event =>{
                this.isDone = this._doneCheckbox.checked;
                app.updateCard(this, true);
                if (this.isDone){
                    this.element.classList.add('card--done');
                    this._importanceCheckbox.setAttribute('disabled', 'checked');
                    this._updateButton.setAttribute('disabled', 'checked');
                    app._sortByNotImportant();
                } else {
                    this.element.classList.remove('card--done');
                    this._importanceCheckbox.removeAttribute('disabled');
                    this._updateButton.removeAttribute('disabled');
                }
            })
        }

        _updateCard(){
            this.titleElement.innerText = this.title
            this.textElement.innerText = this.text;
        }

        _deleteCard(){
            this.element.remove()
            app.deleteCard(this)
        }

        _createElement(){
            let cardElement = createElement({classes: ['card']});
            this.titleElement = createElement({tagName: 'h5', classes: ['card-title'], textContent: this.title})
            this.textElement = createElement({tagName: 'p', classes: ['card-text'], textContent: this.text})

            let controlsContainer = createElement({classes: ['controls-container']})
             this._updateButton = createElement({
                tagName: 'button',
                textContent: 'Update card',
                classes: ['btn', 'btn-primary']
            })
            this._deleteButton = createElement({
                tagName: 'button',
                textContent: 'Delete card',
                classes: ['btn', 'btn-primary']
            })
            this._importanceCheckbox = createElement({
                tagName: 'input',
                classes: ['form-check-input'],
                attributes: {type: 'checkbox', id: 'importanceCheckbox'}
            });
            if (this.isImportance){
                this._importanceCheckbox.setAttribute('checked', 'checked');
                cardElement.classList.add('card--importance');
            }
            let importanceCheckboxLabel = createElement({
                tagName: 'label',
                classes: ['form-check-label', 'ps-1'],
                attributes: {for: 'importanceCheckbox'},
                textContent: 'Important'
            })
            this._doneCheckbox = createElement({
                tagName: 'input',
                classes: ['form-done-input'],
                attributes: {type: 'checkbox', id: 'doneCheckbox'}
            });
            if (this.isDone){
                this._doneCheckbox.setAttribute('checked', 'checked');
                cardElement.classList.add('card--done');

            }
            let doneCheckboxLabel = createElement({
                tagName: 'label',
                classes: ['form-done-label', 'ps-1'],
                attributes: {for: 'doneCheckbox'},
                textContent: 'Done'
            })

            controlsContainer.append(this._updateButton, this._deleteButton, this._importanceCheckbox, importanceCheckboxLabel, this._doneCheckbox, doneCheckboxLabel )
            cardElement.append(this.titleElement, this.textElement, controlsContainer);
            return cardElement;
        }


    }

        let app = new App();

}());