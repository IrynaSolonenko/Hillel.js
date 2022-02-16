'use strict';
!(function (){
    function createElement({tagName = 'div', classes = [], dataAttributes = {}, textContent = ''}){
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


        if (typeof dataAttributes === 'object' && dataAttributes){
            Object.entries(dataAttributes).forEach(pair =>{
                if (pair[0] !== 'string' || pair[1] !== 'string') {
                    element.setAttribute(pair[0], pair[1]);
                } else {
                    console.warn('classes element of App _createElement method must be a string')
                }
            })
        }
        return element;

    }

    function App(){
        this.cardsArr = [];
        this.init = function (){
            _init();
        }
        let LS = localStorage;
        let _body = document.querySelector('body');
        let _nameField;
        let _descriptionField;
        let _cardsBlock;


        let _getCards = () => {
        let cardsJSON = LS.getItem('cards');
        if (cardsJSON){
            let cardsData = JSON.parse(cardsJSON);

            this.cardsArr = cardsData.map(cardData =>{
                return new Card({cardTitle: cardData.title, cardText: cardData.text})
            })
            this.cardsArr.forEach(card =>{
                _cardsBlock.append(card.element)
            })
        }
        }


        let _init = () => {
            let appBlock = createElement({classes: ['container']});
            let title = createElement({tagName: 'h1', textContent: 'Awesome TODO app'});
            let createCardButton = createElement({tagName: 'button', textContent: 'create card', classes: ['btn', 'btn-primary']});
            _cardsBlock = createElement({classes: ['container', 'cards-block']});
            _nameField = createElement({tagName: 'input', textContent: '', classes: ['form-control'], dataAttributes: {placeholder: 'Name', autocomplete: 'autocomplete'}});
            _descriptionField = createElement({tagName: 'textarea', classes: ['form-control'], dataAttributes: {placeholder: 'Description', autocomplete: 'autocomplete'}});


            appBlock.append(title, _nameField, _descriptionField, createCardButton, _cardsBlock);
            _body.append(appBlock);


            createCardButton.addEventListener('click', _createCard.bind(this))

            _getCards();
        }

        let _createCard = () =>{
        let cardTitle = _nameField.value;
        let cardText = _descriptionField.value;

        let textFieldState = [];
            textFieldState.push(_validateTextField(_nameField));
            textFieldState.push(_validateTextField(_descriptionField));

            if (textFieldState.some(state => state === false)){
                return;
            }


            let isExist = this.cardsArr.some(card => card.title === cardTitle)

            let isCreate;
            if (isExist){
                 isCreate = confirm('You have a card with current title. Do you want ad one more?')
            if (!isCreate) return;
            }


            let card = new Card({cardTitle, cardText})
            this.cardsArr.push(card);
            let cardsStates = this.cardsArr.map(card => {
                return{
                    title: card.title,
                    text: card.text
                }
            })
            LS.setItem('cards', JSON.stringify(this.cardsArr));

            _cardsBlock.append(card.element);
        }

        let _validateTextField = (field) =>{
            if (field.value === ''){
                field.classList.add('is-invalid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                return true;
            }
        }

    }


    function Card({cardTitle = '', cardText = ''}) {
        let _deleteButton;
        let _createElement = () => {
            let cardElement = createElement({classes: ['card']});
            let cardTitleElement = createElement({tagName: 'h5', classes: ['card-title'], textContent: cardTitle})
            let cardTextElement = createElement({tagName: 'p', classes: ['card-text'], textContent: cardText})

            let controlsContainer = createElement({classes: ['controls-container']})
            let updateButton = createElement({
                tagName: 'button',
                textContent: 'Update card',
                classes: ['btn', 'btn-primary']
            })
            _deleteButton = createElement({
                tagName: 'button',
                textContent: 'Delete card',
                classes: ['btn', 'btn-primary']
            })
            let importanceCheckbox = createElement({
                tagName: 'input',
                classes: ['form-check-input'],
                dataAttributes: {type: 'checkbox', id: 'importanceCheckbox'}
            });
            let importanceCheckboxLabel = createElement({
                tagName: 'label',
                classes: ['form-check-label'],
                dataAttributes: {for: 'importanceCheckbox'},
                textContent: 'Important'
            })

            controlsContainer.append(updateButton, _deleteButton, importanceCheckbox, importanceCheckboxLabel)
            cardElement.append(cardTitleElement, cardTextElement, controlsContainer);
            return cardElement;
        }
        let _element = _createElement();
        this.title = cardTitle;
        this.text = cardText;
        this.element = _element;


        let attachEvents = () => {
            _deleteButton.addEventListener('click', _deleteCard);
        }

        let _deleteCard = () => {
            _element.remove();
        }

        attachEvents();

    }

let app = new App();
    app.init();


}());