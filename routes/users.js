var express = require('express');
var router = express.Router();
var mongoose=require('./mongoose');

var adminSachema=mongoose.Schema({
    username:String,
    password:String
})

var adminModel=mongoose.model('admin',adminSachema,'admin');



router.post('/checkadmin', function(req, res) {

    var username=req.body.username;
    var password=req.body.password;
    adminModel.find({'username':username,'password':password}).exec(function (err,data) {
        if(err){
            res.send({'status':'400',megs:'读取数据失败'});
        }else{
            if(data.length){
                var username=data[0].username;
                var intime=new Date().toLocaleString();
                res.cookie('user',username+'--'+intime);
                res.send({'status':'100',megs:'登录成功'});

            }else{
                res.send({'status':'401',megs:'账户密码错误'});
            }

        }
    })

});

router.get('/checkcookie',function (req,res) {


    var cookie=req.cookies.user;
    if(!cookie){
        res.send('alert("请登录");location.href="/admin/login.html"');
    }else{
        res.send("");
    }

})

router.get('/logout',function (req,res) {
    res.clearCookie('user');
    res.send("<script>location.href='/admin/login.html'</script>");
})

module.exports = router;
