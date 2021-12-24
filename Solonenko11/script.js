let productsList = [
    {
        name: 'pen',
        price: 2,
        category: 'pencil'
    },
    {
        name: 'book',
        price: 6,
        category: 'book'
    },
    {
        name: 'pencil',
        price: 1,
        category: 'pencil'
    },
    {
        name: 'notebook',
        price: 4,
        category: 'notebook'
    },
    {
        name: 'notebook-pink',
        price: 3,
        category: 'notebook'
    },
    {
        name: 'book',
        price: 6,
        category: 'book'
    }
]

// 1-------------------------------------------
// Функиция принимает название товара, его цену и категорию и добавляет этот товар в массив
function products(name, price, category) {
    let product = {
        name: name,
        price: price,
        category: category
    }
    productsList.push(product)
    console.log(productsList)
}
// Products('notebook', 10, 'book');


// 2-------------------------------------------
// Функция фильтрует товары по цене
function filterProductPrice(min, max, productArr){
return productArr.filter(product => product.price >=min && product.price <= max);
}
let filterByPrice = filterProductPrice(1, 3, productsList)
// console.log(filterByPrice)


// 3-------------------------------------------
// Функция-фильтр товаров по категории;
let arrCategoryNameFilter = [];
function filterByNameCategoryArr(filter,productArr) {
        return productArr.filter(product => product.name === filter);
}
// arrCategoryNameFilter = filterByCategoryArr('book', productsList);
// console.log(arrCategoryNameFilter)


let arrCategoryFilter = [];
function filterByCategoryArr(filter,productArr) {
    return productArr.filter(product => product.category === filter);
}
// arrCategoryFilter = filterByCategoryArr('notebook', productsList);
// console.log(arrCategoryFilter)


// 4-------------------------------------------
// Функция возвращает количество товаров в категории
function arrLength(key){
    filterByCategoryArr(key)
    return console.log(arrCategoryFilter.length);
}
// arrLength('price');


// 5-------------------------------------------
//Функция удаляет товар по имени.
let remote = productsList.slice();
function deleteByName(nameProduct) {
    remote = remote.filter(function( item ) {
        return item.name !== nameProduct;
    });
    console.log(remote)
}
// deleteByName('book')


// 6-------------------------------------------
//Функция сортируют товары по цене от меньшего к большему и возвращают новый массив.
let minToMax = productsList.slice();
function sortByMinToMaxPrice() {
    minToMax.sort((a, b) => (a.price > b.price) ? 1 : -1)
    console.log(minToMax)
}
// sortByMinToMaxPrice();
//Функция сортируют товары по цене от большго к меньшему и возвращают новый массив.
let maxToMin = productsList.slice();
function sortByMaxToMinPrice() {
    maxToMin.sort((a, b) => (a.price < b.price) ? 1 : -1)
    console.log(maxToMin)
}
// sortByMaxToMinPrice();


// 7-------------------------------------------
//Функция принимает вид сортировки (от большего к меньшему или наоборот)
// и фильтра (диапазон цены или категория) и возвращает новый массив товаров определённой
// выборки, отсортированные как указал пользователь.
function getFilterType() {
    let filterType;
    do {
        filterType = +prompt(`Выберите тип сортировки:
    1 - По цене от большего к меньшему
    2 - По цене от меньшего к большему
    3 - Фильтр по диапазону цен
    4 - Фильтр по категории 'name'
    5 - Фильтр по категории 'category'`);
    } while (filterType !== filterType || !(filterType >= 1 && filterType <= 4.3));
    if (filterType === 1){
        sortByMinToMaxPrice();
    } else if(filterType === 2){
        sortByMaxToMinPrice();
    }else if(filterType === 3){
        a = +prompt(`Введите диапазон цен от:`);
        b = +prompt(`Введите диапазон цен до:`);
        filterProductPrice(a, b, productsList)
        console.log(filterByPrice)
    }else if(filterType === 4){
       let nameFilter = prompt(`Введите имя продукта`);
        let nameValue = filterByCategoryArr(`${nameFilter}`, productsList);
        console.log(nameValue)
    }else if(filterType === 5){
        let categoryFilter = +prompt(`Введите категорию продукта`);
        let categoryValue = filterByCategoryArr(`${categoryFilter}`, productsList);
        console.log(categoryValue)
    }
}
// getFilterType()


// 8-------------------------------------------
// Функция-фильт сумма по диапазону цены
function filterPriceSum(min, max, productArr){
    let filterResult = filterProductPrice(min, max, productArr);
        return filterResult.reduce((sum, current) => sum + current.price, 0);
}
let filterPriceSumResult1 = filterPriceSum(5, 6, productsList)
// console.log(filterPriceSumResult1)

// Функция-фильт сумма по категории "name"
function filterByNamePriceSum(filter,productArr){
    let filterResult = filterByNameCategoryArr(filter,productArr);
        return filterResult.reduce((sum, current) => sum + current.price, 0);
}
let filterPriceSumResult2 = filterByNamePriceSum('notebook', productsList)
// console.log(filterPriceSumResult2)

// Функция-фильт сумма по категории "category"
function filterByCategoryPriceSum(filter,productArr){
    let filterResult = filterByCategoryArr(filter,productArr);
    return filterResult.reduce((sum, current) => sum + current.price, 0);
}
let filterPriceSumResult3 = filterByCategoryPriceSum('pencil', productsList)
// console.log(filterPriceSumResult3)

let checkGitProject;
