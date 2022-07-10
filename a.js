const express = require('express');
const bodyParser = require('body-parser')


const app=express();

const nav = 
[
    {
        link:'/books',name:'Books'
    },
    {
        link:'/main',name:'Admin'
    },
    {
        link:'/admin',name:'Add Book'
    },
    // {
    //     link:'/delete',name:'Delete'
    // },
    // {
    //     link:'/update',name:'update'
    // },
    
]
const booksRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
const Main = require('./src/routes/main')(nav)
const update = require('./src/routes/update')(nav)



app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/books',booksRouter);
app.use('/admin',adminRouter);
app.use('/main',Main);
app.use('/update',update);
app.get('/',function(req,res){
    
    // res.send("hello");
res.render("index",
{
   nav,
    title:'Library'
});
});
// app.get("/login",(req,res)=>{
//     res.render("login",{
//         nav,
//     title:'Library'
//     });
// });


app.listen(6001);