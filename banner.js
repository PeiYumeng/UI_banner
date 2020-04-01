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
    $(cfg.container).mouseover(function(){
        $('#left').css('opacity',0.5);
        $('#right').css('opacity',0.5);
    })
    $(cfg.container).mouseout(function(){
        $('#left').css('opacity',0);
        $('#right').css('opacity',0);
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
                index_all = index
                console.log(index_all,index)
                if(index_all < index){//点的前面的序号
                    pre();
                    console.log(index_all)
                }else{
                    move()
                }
            })
        })
        //左按钮点击事件
        $('#left').click(function(){
            index_all = index_all-2;
            move()
        })
        //右按钮点击事件
        $('#right').click(function(){
            move()
        })
        move()
    }
    function active(i){//navs样式
        $("#navs").children().removeClass('active')
        $("#navs").children().eq(i).addClass('active')
    }
    function move(){//向右
        clearInterval(timer);
        timer = setInterval(function(){
            //navs变红
            if(index_all>cfg.page){
                index_all = 1;
                $("#slider").css('left','-1200px');
                active(1)
            }
            if(index_all == 5){
                active(0)
            }else{
                active(index_all)
            }
            //变一页
            var width = -wid*(index_all+1);//-2400
            $('#slider').animate({'left':width+'px'},500)
            index_all++
        },cfg.num)
    }
    function pre(){//向左
        if(flag)return
        if(!flag){
            clearInterval(timer);
            timer = setInterval(function(){       
                if(index_all<1){
                    index_all=5
                    $("#slider").css('left',-wid*cfg.page+'px');
                    active(3)
                }else{
                    active(index_all-2)
                }
                var width = -wid*(index_all-1);//-2400
                $('#slider').animate({'left':width+'px'},()=>{
                    500;
                    flag = false;
                })
                index_all--;
            },cfg.num)
        }
    }
    return {
        show:show
    }
}())
