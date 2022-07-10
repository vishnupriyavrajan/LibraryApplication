// const axios = require('axios');
const express = require('express');
const update=express.Router();
// axios.get('http://localhost:5008/update/add')
// .then(function(response){
//     res.render('index',{users:response.data});
// })
const Bookdata=require('../model/Bookdata');
function router(nav){
    update.get('//:id',function(req,res){
        console.log(req.params.id);
        main.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
                if(err){
                  console.log("can't retrieve data and edit");
               }else{
                    res.render('update' ,{
                        main:docs,
                        nav,
                           title:'Library'
                   
                })
            }
                 })
                
        })
    

        // axios.get('http://localhost:5008/update/add',{params:{id:req.query.id}})
        // .then(function(userdata){
        
        // })
        // .catch(err=>{
        //     res.send(err);
        // })
        // res.render('update');
      
    //   })

    update.post('/add',function(req,res){

        var item={
            title: req.body.title,
            author: req.body.author,
            genre:req.body.genre,
            image:req.body.image,
        }
        var book = Bookdata(item);
        book.save();
        res.redirect('/books');
        res.redirect('/admin');
        
    });
    return update;
}
module.exports= router;