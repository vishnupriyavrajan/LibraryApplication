const express = require('express');
const authorRouter =express.Router();
const Authordata = require('../model/Authordata');
function Router(nav){
   
    
    authorRouter.get('/',function(req,res){

        Authordata.find()
        .then(function(author){
            res.render("author",{
                nav,
            title:'Library',
            author
        
            });
            
        })
       
    });
    authorRouter.get('/:id',function(req,res){
        const id = req.params.id;
        Authordata.findOne({_id: id})
        .then(function(authors){
            res.render('authors',{
                nav,
                title:'Library',
                authors
            });
        })
        
    });

    authorRouter.get("/delete/:no",(req,res)=>{
        const no=req.params.no;
        Authordata.deleteOne({"_id":no})
        .then(()=>{
            res.redirect('/src/views/author');
        })
    })
    return authorRouter;
}

module.exports = Router;