(function () {
    //  获取属性
    function getStyle(obj,name)
    {
        if(obj.currentStyle)
        {
            return obj.currentStyle[name]
        }
        else
        {
            return getComputedStyle(obj,false)[name]
        }
    }

    //  动画函数                      对象     属性   结束位置
    function startMove(obj,att,add)
    {
        //  清除当前
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            //  起始位置
            var cutt = 0 ;
            //  获取属性，如果是透明度返回浮点数，其余属性返回整数
            if(att=='opacity')
            {
                cutt = Math.round(parseFloat(getStyle(obj,att)));
            }
            else
            {
                // 周期性获得对象的属性
                cutt = Math.round(parseInt(getStyle(obj,att)));
            }
            // 速度
            var speed = (add-cutt)/4;

            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            //  当前位置等于结束位置，关闭计时器
            if(cutt==add)
            {
                clearInterval(obj.timer)
            }
            else
            {
                if(att=='opacity')
                {
                    obj.style.opacity = (cutt+speed)/100;
                    obj.style.filter = 'alpha(opacity:'+(cutt+speed)+')';
                }
                else
                {
                    obj.style[att] = cutt+speed+'px';
                }
            }

        },46)
    }

   Domoveobj={

       init:function (option) {

          this.index=0;
          this.imgW=0;
          this.imgnum=0;
          this.option=option;
          this.dealimg();
          this.nextclick();
          this.prevclick();
          this.autoplay();

       },
       dealimg:function () {
           var _this=this;
           this.banner=document.querySelector(this.option.bannerId);
           this.banner.querySelectorAll('li').forEach(function (v,i) {
              img=v.querySelector('img');
              img.style.width=_this.option.imgWidth;
              this.banner.height=getStyle(img,'height');
              _this.imgnum++;
          });
           this.imgW=this.banner.querySelectorAll('img')[0].offsetWidth;
           var img=this.banner.querySelectorAll('img');
           document.querySelector(this.option.bannerBgId).style.height=getStyle(img[this.index],'height')
       },
       nextclick:function () {
           var _this=this;
           this.r=document.querySelector(this.option.RbtnId);
           this.r.addEventListener('click',function () {
               _this.index++;
               _this.bannermove();
           })
       },
       prevclick:function () {
           var _this=this;
           this.l=document.querySelector(this.option.LbtnId);
           this.l.addEventListener('click',function () {
               _this.index--;
               _this.bannermove();
           })
       },
       bannermove:function () {
           if(this.index==this.imgnum){
               this.index=0;
           }
           else if(this.index==0){
               this.index=this.imgnum-1;
           }
           this.imgW=this.banner.querySelectorAll('img')[this.index].offsetWidth;
           startMove(this.banner,'left',-this.index*this.imgW);
       },
       autoplay:function () {
           var _this=this;
           var banerBg=document.querySelector(this.option.bannerBgId);
           playtimer=setInterval(function () {
               _this.index++;
               _this.bannermove();
           },2000);

           banerBg.addEventListener('mouseover',function () {
               clearInterval(playtimer);
           });
           banerBg.addEventListener('mouseout',function () {
               playtimer=setInterval(function () {
                   _this.index++;
                  _this.bannermove();
               },3000);
           });

       }
   }
})()