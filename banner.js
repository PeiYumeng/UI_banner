var $ban = (function(){
    var   cfg = {
                container:'body',//容器
                num:6,//循环时间
                img:['img/b1.png'],//图片
                page:1,//轮播个数
            },
            html = '<div class="slider" id="slider">'//轮播结构
                    +'</div>'
                    +'	<span id="left"><</span>'
                    +'	<span id="right">></span>'
                    +'	<ul class="nav" id="navs">'
                    +'	</ul>',
            $banner = $(html),
            timer,//定时器
            flag = false,
            index_all = 1;
    //左右效果
    $(cfg.container).mouseenter(function(){
        $('#left').css('opacity',0.5);
        $('#right').css('opacity',0.5);
        clearInterval(timer)
    })
    $(cfg.container).mouseleave(function(){
        $('#left').css('opacity',0);
        $('#right').css('opacity',0);
        move();
    })
    function show(conf){
        //扩展cfg
        $.extend(cfg,conf);
        $(cfg.container).append($banner);
        // img和nav
        $('#slider').append($(`<div class="slide"><img src=${cfg.img[cfg.page-1]} alt=""></div>`))
        for(var i = 0;i<cfg.page;i++){
            var $img = $(`<div class="slide"><img src=${cfg.img[i]} alt=""></div>`)
            $('#slider').append($img);
            $('#navs').append($(`<li>${i+1}</li>`))
        }
        $('#slider').append($(`<div class="slide"><img src=${cfg.img[0]} alt=""></div>`))
        wid = -Number($("#slider").css('left').split('p')[0]);
        //nav点击事件
        $("#navs").children().each(function(index){
            $(this).click(function(){
                // console.log(index_all,index+1)
                if(index_all==6){
                    index_all=1;
                }
                if(index_all>index+1){
                    // console.log(index_all)
                    clearInterval(timer);
                    console.log(index)
                    index_all = index+2;
                    pre();
                    index_all--;
                }else{
                    clearInterval(timer);
                    index_all = index;
                    next();
                    index_all++;
                }
            })
        })
        //左按钮点击事件
        $('#left').click(function(){
            if(flag) return;
            clearInterval(timer);
            pre();
            index_all --;
            flag = true;
        })
        //右按钮点击事件
        $('#right').click(function(){
            if(flag) return;
            clearInterval(timer);
            next();
            index_all++;
            flag = true;
        })
        move()
    }
    function active(i){//navs样式
        $("#navs").children().removeClass('active')
        $("#navs").children().eq(i).addClass('active')
    }
    function action(){
        if(index_all>cfg.page){
            active(1)
        }
        if(index_all == 5){
            active(0)
        }else{
            active(index_all)
        }
    }
    function move(){//向右轮播
        clearInterval(timer)
        timer = setInterval(function(){
            if(index_all>cfg.page){
                index_all = 1;
                $("#slider").css('left','-1200px');
            }
            action();
            //变一页
            // console.log(index_all)
            var width = -wid*(index_all+1);//-2400
            $('#slider').animate({'left':width+'px'},500)
            index_all++
        },cfg.num)
    }
    function next(){//向右一页
        if(flag) return;
        flag = true;
        clearInterval(timer);
        if(index_all>cfg.page){
            index_all = 1;
            $("#slider").css('left','-1200px');
        }
        action();
        var width = -wid*(index_all+1);//-2400
        $('#slider').animate({'left':width+'px'},()=>{
            500;
            flag = false;
        })
    }
    function pre(){//向左一页
        if(flag) return;
        flag = true;
        clearInterval(timer);     
        console.log(index_all)
        if(index_all<=0){
            $("#slider").css('left',-wid*cfg.page+'px');
            index_all=5
            active(3)
        }else{
            active(index_all-2)
        }
        var width = -wid*(index_all-1);//-2400
        $('#slider').animate({'left':width+'px'},()=>{
            500;
            flag = false;
        })
    }
    return {
        show:show
    }
}())
