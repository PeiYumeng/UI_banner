var $ban = (function(){
    var   cfg = {
                container:'body',//容器
                num:6,//循环时间
                img:['img/b1.png'],//图片
                page:1,//轮播个数
            },
            html = '<div class="slider" id="slider">'
                    +'</div>'
                    +'	<span id="left"><</span>'
                    +'	<span id="right">></span>'
                    +'	<ul class="nav" id="navs">'
                    +'	</ul>',
            $banner = $(html),
            timer,
            index_all=1;
    $(cfg.container).mouseover(function(){
        $('#left').css('opacity',0.5);
        $('#right').css('opacity',0.5);
    })
    $(cfg.container).mouseout(function(){
        $('#left').css('opacity',0);
        $('#right').css('opacity',0);
    })
    function show(conf){
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
                index_all = index;
                clearInterval(timer)
                move();
            })
        })
        //左按钮点击事件
        $('#left').click(function(){
            clearInterval(timer)
            index_all=index_all-1;
            console.log(index_all)
            left_limit()
            move();
        })
        //右按钮点击事件
        $('#right').click(function(){
            clearInterval(timer)
            index_all=index_all+1;
            move();
        })
        move();
    }
    function move(){
        timer = setInterval(function(){
            active(index_all)
            if(index_all == 6){
                index_all = 1;
                $("#slider").css('left','-1200px');
            }
            if(index_all == 5){
                active(0)
            }
            var begin = parseInt($("#slider").css('left'));//-1200
            var flag = -wid*(index_all+1);//-2400
            var speed = (flag - begin)/8 //-2400+1200/8
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            if(speed == 0){
                index_all++;
            }
            $("#slider").css('left',begin+speed+'px');
        },cfg.num)
    }

    function active(i){
        $("#navs").children().removeClass('active')
        $("#navs").children().eq(i).addClass('active')
    }
    function left_limit(){
        if(index_all===-1){
            $("#slider").css('left',-1200*(cfg.page+1)+'px');
            index_all=4
        }
    }
    return {
        show:show
    }
}())