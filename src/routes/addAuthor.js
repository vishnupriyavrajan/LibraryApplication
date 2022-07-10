const express =require('express');
const addAuthor=express.Router();
const Authordata=require('../model/Authordata');
function router(nav){
    addAuthor.get('/',function(req,res){
        res.render('addAuthor' ,{
            nav,
            title:'Library'
    
        })
    })

    addAuthor.post('/add',function(req,res){

        var item={
            name: req.body.name,
            book: req.body.book,
            genre:req.body.genre,
            image:req.body.image,
        }
        var author = Authordata(item);
        author.save();
        res.redirect('/author');
        
    });
    return addAuthor;
}
module.exports=router;