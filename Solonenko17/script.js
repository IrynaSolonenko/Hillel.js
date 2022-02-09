'use strict';
!(function (){
    function App(){
        let _body = document.querySelector('body');
        let _nameField;
        let _descriptionField;
        let _cardsBlock;


        function _getCards(){

        }

        function _createElement({tagName = 'div', classes = [], dataAttributes = {}, textContent = ''}){
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

        dataAttributes = {
            prop1: 'value1',
            prop2: 'value1'
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

        function _init(){
            let appBlock = _createElement({classes: ['container']});
            let title = _createElement({tagName: 'h1', textContent: 'Awesome TODO app'});
            let createCardButton = _createElement({tagName: 'button', textContent: 'create card', classes: ['btn', 'btn-primary']});
            _cardsBlock = _createElement({classes: ['container', 'cards-block']});
            _nameField = _createElement({tagName: 'input', textContent: '', classes: ['form-control'], dataAttributes: {placeholder: 'Name', autocomplete: 'autocomplete'}});
            _descriptionField = _createElement({tagName: 'textarea', classes: ['form-control'], dataAttributes: {placeholder: 'Description', autocomplete: 'autocomplete'}});


            appBlock.append(title, _nameField, _descriptionField, createCardButton, _cardsBlock);
            _body.append(appBlock);


            createCardButton.addEventListener('click', _createCard)
        }

        function _createCard(){
        let cardName = _nameField.value;
        let cardDescription = _descriptionField.value;

        let textFieldState = [];
            textFieldState.push(_validateTextField(_nameField));
            textFieldState.push(_validateTextField(_descriptionField));

            if (textFieldState.some(state => state === false)){
                return;
            }
            let card = _createElement({classes: ['card']});
            let cardTitle = _createElement({tagName: 'h5', classes: ['card-title'], textContent: cardName})
            let cardText = _createElement({tagName: 'p', classes: ['card-text'], textContent: cardDescription})

            card.append(cardTitle, cardText);
            _cardsBlock.append(card)
            console.log(card)
        }

        function _validateTextField(field){
            if (field.value === ''){
                field.classList.add('is-invalid');
                return false;
            } else {
                field.classList.remove('is-invalid');
                return true;
            }
        }



        return {
            init() {
                _init();
            },

        }
    }


function Card(){

}
let app = App();
    app.init()



}());