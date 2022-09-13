const path = require('path');
const express = require('express')
const app = express();

const products = require("./products.json");

const PORT = process.env.PORT || 4444

const {engine} = require('express-handlebars')

// статика регистрируеться перед всеми запросами
app.use( express.static(path.join(__dirname, '/public')))  

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

console.log(__dirname)



//перенастраиваем для нового шаблона
app.get('/', (req, res)=>{
    res.render('home', {
        pageTitle: 'Главная страница',
        cssFileName: 'home'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        pageTitle: "О нас"
    })
})

app.get('/products', (req, res) =>{
    res.render('products', {
        products, 
        pageTitle: 'Наши продукты',
        cssFileName: 'products'
      
    })
});

app.get('/products/:productId', (req, res)=>{
    console.log(req.params);
    const productFind = products.find(item => item.id === req.params.productId);
   if(!productFind ){
    res.send('sorry, page not faund')
   }
   res.render('product', {
    productFind, 
    cssFileName: 'oneProduct',
    pageTitle: "страница одного продукта",
    })
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${4444}`)
} )