var express = require('express');
var router = express.Router();
var mongoose=require('./mongoose');


var typeSchema=mongoose.Schema({
    name:String,
    code:Number,
    pcode:Number
})

var typeModel=mongoose.model('type',typeSchema,'type');

/*var type=new typeModel();
type.name='React';
type.code=10;
type.pcode=1;
type.save(function (err) {
    if(!err){
        console.log('成功');
    }
})*/


router.get('/getype',function (req,res) {

    typeModel.find({}).exec(function (err,data) {
        if(!err){
            res.send(data);
        }
    })
})

router.get('/getnextype',function (req,res) {
    var name=req.query.name;
    typeModel.find({'name':name}).exec(function (err,data) {
        var code=data[0].code;
        typeModel.find({'pcode':code}).exec(function (err,data) {
            res.send(data);
        })
    })
});




var artSchema=mongoose.Schema({
    type:String,
    art:{
        title:String,
        digest:String,
        setime:String,
        artype:String,
        content:String
    }
});

var artModel=mongoose.model('art',artSchema,'art');

/*显示信息*/
router.get('/showinfo',function (req,res) {



    /*获取当前页面*/
    var thispage=req.query.thispage?req.query.thispage:1;


    artModel.find({}).exec(function (err,data) {
        if(!err){
            /*分页*/
            var num=data.length;
            var pagesize=5;
            var pagecount=Math.ceil(num/pagesize);
            artModel.find({}).skip((thispage-1)*pagesize).limit(pagesize).exec(function (err,data) {
                data.push({'pagecount':pagecount});
                res.send(data);
            })
        }
    })
})


/*根据id显示信息*/
router.get('/showid',function (req,res) {
    var id=req.query.id;
    artModel.findById(id).exec(function (err,data) {
        if(!err){
            res.send({'data':data,'status':'100'});
        }

    })
});

/*新增数据*/
router.post('/addart',function (req,res) {
    var art=new artModel();
    art.type=req.body.type;
    art.art.title=req.body.title;
    art.art.digest=req.body.digest;
    art.art.artype=req.body.artype;
    art.art.content=req.body.con;
    art.art.setime=new Date().toLocaleString();
    art.save(function (err) {
        if(err){
            res.send({'status':'401','megs':'添加数据失败'})
        }else{
            res.send({'status':'100','megs':'添加数据成功'})
        }
    })
});

/*删除数据*/
router.get('/del',function (req,res) {
    var id=req.query.id;
    artModel.findById(id).exec(function (err,data) {
        if(!err){
            data.remove();
           res.send({'status':'100'});
        }else{
            res.send({'status':'401'})
        }
    })
});

/*修改数据*/
router.post('/edit',function (req,res) {
    var id=req.body.id;

    artModel.findById(id).exec(function (err,data) {
        data.art.title=req.body.title;
        data.art.digest=req.body.digest;
        data.art.artype=req.body.artype;
        data.art.content=req.body.con;
        data.save(function (err) {
            if(err){
                res.send({'status':'401','megs':'修改失败'})
            }else{
                res.send({'status':'100','megs':'修改成功'})
            }
        })

    })
});

router.get('/showart',function (req,res) {

       if(req.query.conditions){
           conditions=JSON.parse(req.query.conditions);
           artModel.find(conditions).exec(function (err,data) {
               res.send(data);
           })
       }else{
           artModel.find({}).exec(function (err,data) {
               res.send(data);
           })
       }



});

module.exports = router;