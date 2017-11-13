/*分页*/
var pageObj={
    init:function (options) {
        this.pageId=options.pageId;
        this.curpage=1;
        this.btnId=options.btnId;
        this.pagesize=options.pagesize;
        this.DATA=options.data;
        this.pagenum=Math.ceil(this.DATA.length/options.pagesize);
        this.callback=options.callback;
        this.addPageNum();
        this.clickNum();
        this.clickNext();
        this.viewPage();
        this.clickEnd();
    },
    /*加载分页按钮*/
    addPageNum:function () {
        var pagebtn=document.querySelector(this.btnId);
        console.log(this.pagenum);
        pagebtn.innerHTML+='<a id="endBtn">'+this.pagenum+'</a>';
        for(var i=0;i<this.pagenum;i++){
            /*选中页面对应按钮*/
            if(i==this.curpage-1){
                pagebtn.innerHTML+='<a class="curpage numBtn">'+(i-0+1)+'</a>';
            }else{
                pagebtn.innerHTML+='<a class="numBtn">'+(i-0+1)+'</a>'
            }
        }
        pagebtn.innerHTML+='<a id="nextBtn">&gt;</a>'
    },
    /*数字按钮点击*/
    clickNum:function(){
        var _this=this;
        $('.numBtn').on('click',function () {
            $('#nextBtn').fadeTo(500,1);
            $(this).siblings().removeClass('curpage');
            $(this).addClass('curpage');
            _this.curpage=this.innerHTML;
            _this.viewPage();
        })
    },
    /*下一页*/
    clickNext:function () {
        var _this=this;
        $('#nextBtn').on('click',function () {
            $(this).siblings().removeClass('curpage');
            if(_this.curpage<_this.pagenum){
                $('.numBtn').eq(_this.curpage).addClass('curpage')
                _this.viewPage();
                _this.curpage++;
            }else {
                $('.numBtn').eq(_this.curpage-1).addClass('curpage');
                $('#nextBtn').fadeTo(500,.4);
            }

        })
    },
    /*尾页*/
    clickEnd:function () {
        var _this=this;
        $('#endBtn').on('click',function () {
            _this.curpage=_this.pagenum;
            $(this).siblings().removeClass('curpage');
            $('.numBtn').eq(_this.pagenum-1).addClass('curpage');
            _this.viewPage();
        })
    },
    /*分割数据*/
    viewPage:function () {
        var strat=(this.curpage-1)*this.pagesize;
        var end=(strat+this.pagesize);
        console.log(strat,end)
        var pagedata=this.DATA.slice(strat,end);
        this.callback(pagedata);
    }
};