var mongoose=require('mongoose');    //加载数据库模块
/*连接数据库*/
mongoose.connect("mongodb://127.0.0.1:27017/myblog",function (err) {

    if(!err){
        console.log("数据库连接成功");
    }

})

/*暴露数据库*/
module.exports = mongoose;