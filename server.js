const bodyParser=require('body-parser');
const express = require("express");
const bcrypt=require('bcryptjs');
const session = require ("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
const  mongoose  = require("mongoose");
const UserModel=require("./src/model/User");
const Bookdata = require('./src/model/Bookdata');

const app =express();

const mongoURI ="mongodb+srv://userone:userone@ictakfiles.tqdqiuh.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority";

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then((res) =>{
    console.log("MongoDB connected");
});

const store=new MongoDBSession({
    uri: mongoURI,
    collection:"mySessions",
});

const nav = 
[
    {
        link:'/books',name:'Books'
    },
    // {
    //     link:'/main',name:'Admin'
    // },
    {
        link:'/admin',name:'Add Book'
    },
    {
        link:'/author',name:'Author'
    },
    {
        link:'/addauthor',name:'Add Author'
    },
    
];

const booksRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
// const Main = require('./src/routes/main')(nav)
const update = require('./src/routes/update')(nav)
const indexRouter = require('./src/routes/indexRouter')(nav)
const authorRouter = require('./src/routes/authorRouter')(nav)
const addAuthor = require('./src/routes/addAuthor')(nav)




app.set("view engine","ejs");
app.set('views','./src/views');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use('/books',booksRouter);
app.use('/admin',adminRouter);
// app.use('/main',Main);
app.use('/update',update);
app.use('/users',booksRouter);
app.use('/index',indexRouter);
app.use('/author',authorRouter);
app.use('/addauthor',addAuthor);




app.use(
    session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
    store:store,
})
);

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/login')
    }
}
app.get("/",(req,res)=>{
    
    res.render("landing");
});

app.get("/login",(req,res)=>{
    
    res.render("login");
});
app.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){
        return res.redirect('/login');
    }
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.redirect('/login');

}
req.session.isAuth=true;
res.redirect('/index');
    }
);

app.get("/register",(req,res)=>{
    
    res.render("register");
});
app.post("/register",async(req,res)=> {
    const{username,email,password}=req.body;
    
        let user=await UserModel.findOne({email})
        if(user){
            return res.redirect('/register');
        }
        const hashedPsw=await bcrypt.hash(password,12);
        user=new UserModel({
            username,
            email,
            password:hashedPsw
        });
        await user.save();
        res.redirect('/login');
    });
    app.get("/dashboard",isAuth,(req,res)=>{
        res.render("dashboard");

    });
    app.get("/index",isAuth,(req,res)=>{
        res.render("index");

    });
    app.post('/logout',(req,res)=>{
        req.session.destroy((err)=>{
            if(err)throw err;
            res.redirect("/");

        
    });
    
});



app.listen(6007);