const express =require('express');
const indexRouter=express.Router();

function router(nav){
    indexRouter.get('/',function(req,res){
        res.render('index' ,{
            nav,
            title:'Library'
    
        })
    })
return indexRouter;
}
module.exports=router;