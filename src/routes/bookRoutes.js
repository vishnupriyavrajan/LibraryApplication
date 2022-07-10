const express = require('express');
const booksRouter =express.Router();
const Bookdata = require('../model/Bookdata');
function Router(nav){
   
    
    booksRouter.get('/',function(req,res){

        Bookdata.find()
        .then(function(books){
            res.render("books",{
                nav,
            title:'Library',
            books
        
            });
            
        })
       
    });
    booksRouter.get('/:id',function(req,res){
        const id = req.params.id;
        Bookdata.findOne({_id: id})
        .then(function(book){
            res.render('book',{
                nav,
                title:'Library',
                book
            });
        })
        
    });

    booksRouter.get("/delete/:no",(req,res)=>{
        const no=req.params.no;
        Bookdata.deleteOne({"_id":no})
        .then(()=>{
            res.redirect('/src/views/books');
        })
    })
    return booksRouter;
}

module.exports = Router;