/**
 * Created by 小小莫先森 on 2017/2/22.
 */

    //弹幕信息窗口居中js 开始
$(window).resize(function(){
    tc_center();
});

function tc_center(){
    var _top=($(window).height()-$("#barrager_Content").height())/2;
    var _left=($(window).width()-$("#barrager_Content").width())/2;

    $("#barrager_Content").css({top:_top,left:_left});
}
//弹幕信息窗口居中js 结束

//弹幕信息窗口可移动 js开始
$(document).ready(function(){

    $(".b_Content_title").mousedown(function(e){
        $(this).css("cursor","move");//改变鼠标指针的形状
        var offset = $(this).offset();//DIV在页面的位置
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
        $(document).bind("mousemove",function(ev){ //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件

            $("#barrager_Content").stop();//加上这个之后

            var _x = ev.pageX - x;//获得X轴方向移动的值
            var _y = ev.pageY - y;//获得Y轴方向移动的值

            //$("#barrager_Content").animate({left:_x+"px",top:_y+"px"},5);

            if(_y>$(window).height()-40||_y<100){
                tc_center();
                $(this).unbind("mousemove");
            }
            else{
                $("#barrager_Content").animate({left:_x+"px",top:_y+"px"},1);
            }

        });

    });
    $(document).mouseup(function() {
        $("#barrager_Content").css("cursor","default");
        $(this).unbind("mousemove");
    });
})
//弹幕信息窗口可移动 js结束

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments;
    if (arguments.length == 1 && typeof (args) == "object") {
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
    }
    return result;
}
var  barrager_code=
        'var item={\n'+
        "   img:'{img}', //图片 \n"+
        "   info:'{info}', //文字 \n"+
        "   href:'{href}', //链接 \n"+
        "   close:{close}, //显示关闭按钮 \n"+
        "   speed:{speed}, //延迟,单位秒,默认6 \n"+
        "   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n"+
        "   color:'{color}', //颜色,默认白色 \n"+
        "   old_ie_color:'{old_ie_color}', //ie低版兼容色,不能与网页背景相同,默认黑色 \n"+
        " }\n"+
        "$('body').barrager(item);"
    ;

function  run(){

    var  info=$('input[name=info]').val();
    (info == '' ) ?  info='请填写弹幕文字' : info=info;
    var  href=$('input[name=href]').val();
    //var  speed=parseInt($('input[name=speed]').val());
    var  speed=6;
    //var  bottom=parseInt($('input[name=bottom]').val());
    var  bottom=0;
    var  code=barrager_code;
    if($('input:radio[name=bottomradio]:checked').val() == 0){
        var  window_height=$(window).height()-150;
        bottom=Math.floor(Math.random()*window_height+40);
        code=code.replace("   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n",'');

    }

    //var  img=$('input:radio[name=img]:checked').val();
    var img="barrager.gif";
    if(img == 'none' ){
        code=code.replace("   img:'{img}', //图片 \n",'');
    }
    var  item={
        'img':'images/'+img,
        'info':info,
        'href':href,
        'close':true,
        'speed':speed,
        'bottom':bottom,
        'color':'#'+$('input[name=color]').val(),
        'old_ie_color':'#'+$('input[name=color]').val()
    };

    //if(!$('input[name=close]').is(':checked')){
    //    item.close=false;
    //}
    code=code.format(item);
    eval(code);
}


//用于判断是否已经开启了新纪元 0为未开启 1为开启
var openLoadingNew=0;
//用于判断是否已经打开了弹幕发布窗口
var barragerShow=0;



function ShowMiniInfoCar() {

    //右边浮动资料卡显示事件
    $("#aboutXiaoMo").css({"right": "0px", "box-shadow": "0px 0px 6px rgba(255,255,255,0.8)"});
    $("#aboutXiaoMoMini").css({"right": "-40px"})

    //右侧迷你资料卡 js代码结束
}

$(function(){

    //$("").css({"":"","":"","":"",});

    //发个弹幕试试 js代码开始

    //显示
    $("#barrager_Hidden").click(function(){
        $("#barrager_Botton").css({"width":"155px","transition":"width 0.8s"});
        $("#barragerShow").css({"width":"100%","transition":"width 1s"});
        $("#barragerShow img").css({"left":"5px","transition":"left 1.3s"});
        $("#barrager_Show").css({"display":"block"});
        $("#barrager_Hidden").css({"display":"none"});
    })

    //隐藏
    $("#barrager_Botton").mouseleave(function(){
        $("#barrager_Botton").css({"width":"10px","transition":"width 0.8s"});
        $("#barragerShow").css({"width":"10px","transition":"width 1s"});
        $("#barragerShow img").css({"left":"-50px","transition":"left 1.3s"});
        $("#barrager_Show").css({"display":"none"});
        $("#barrager_Hidden").css({"display":"block"});
    })

    //图片360度Y轴旋转
    $("#barragerShow img").mouseenter(function(){
        $("#barragerShow img").css({"transform":"rotateY(360deg)","transition":"transform 1s"});
    })
    $("#barragerShow img").mouseleave(function(){
        $("#barragerShow img").css({"transform":"rotateY(0deg)","transition":"transform 1s"});
    })

    //显示填弹幕信息页面
    $("#barragerShow").click(function(){
        if(openLoadingNew==1){
           if( barragerShow==0) {
               barragerShow=1;
               //弹幕信息窗口居中显示
               $("#barrager_Content").css({"opacity": "1","z-index":"999","transition": "opacity 1s"});
               tc_center();
               return false;
           }
           else{
               alert("弹幕窗口已经打开！");
               return false;
           }
        }
        else{
            alert("很抱歉，请开启新纪元后再尝试操作！");
            return false;
        }
    })
    //关闭填弹幕信息页面
    $("#b_Content_title_close").click(function(){
        barragerShow=0;
        $("#barrager_Content").css({"opacity": "0","z-index":"-1", "transition": "opacity 1s"});
    })


    //发个弹幕试试 js代码结束


    //开发中 默认隐藏新纪元遮罩层
    //$("#loadMain").css({"top":"-980px"});
    //$("#main").css({"opacity":"1","-moz-opacity":"1"});

    var loadingAudio= $("#loadingAudio")[0];
    //鼠标经过默认遮罩的时候文字上滑
    $("#loading").mouseenter(function(){
        loadingAudio.play();
        $("#loadingMark").css({"top":"0px","transition":"top 0.2s"});
        $(".loadingNow").css({"transform":"rotateY(360deg)","transition":"transform 0.5s"});
    })
    //反之 则隐藏
    $("#loading").mouseleave(function(){
        loadingAudio.pause();
        loadingAudio.currentTime = 0
        $("#loadingMark").css({"top":"100px","transition":"top 0.5s"});
        $(".loadingNow").css({"transform":"rotateY(-360deg)","transition":"transform 0.5s"});
    })


    //main主页内容浮动的云朵js代码开始
    function runCloud(){
        setInterval(function () {
            $(function () {
                $(".main_yun1")
                    .css({"z-index":"0"})
                    .fadeIn('1000')
                    .animate({left: '860'}, 20000, 'linear')
                    .animate({left: '0'}, 20000, 'linear')
            })
        }, 0);

        setInterval(function () {
            $(function () {
                $(".main_yun2")
                    .css({"z-index":"0"})
                    .fadeIn('1000')
                    .animate({right: '750'}, 20000, 'linear')
                    .animate({right: '0'}, 20000, 'linear')
            })
        }, 0);

        setInterval(function () {
            $(function () {
                $(".main_yun3")
                    .css({"z-index":"0"})
                    .fadeIn('1000')
                    .animate({left: '660'}, 15000, 'linear')
                    .animate({left: '0'}, 15000, 'linear')
            })
        }, 0);
    }
    //main主页内容浮动的云朵js代码结束

    //点击初始化的遮罩层 进入主页面
    $(".loadingNow").click(function(){
        openLoadingNew=1;
        $("#main").css({"opacity":"1","-moz-opacity":"1"});
        $("#loadMain").css({"top":"-980px","transition":"top 1s"});
        //var url="TimeLine/index.html";
        //$("#right_iframe").attr("src",url);
        runCloud();
    })

    //1.Ajax加载html页面(暂时没用)

    //2.用iframe加载html页面
    $("#nav ul li a").click(function(){
        if(openLoadingNew==1){
            var url=$(this).attr("_link");
            $("#right_iframe").attr("src",url);
        }
        else{
            if(confirm("很抱歉，请开启新纪元后再尝试操作！\n\n请问您确定现在开启站长的新纪元吗？"))
            {
                openLoadingNew=1;
                $("#main").css({"opacity":"1","-moz-opacity":"1"});
                $("#loadMain").css({"top":"-980px","transition":"top 1s"});
                runCloud();
                alert("新纪元成功开启！");
                return false;
            }else{
                alert("您选择了未立即开启站长的新纪元，\n\n请确认后再屏幕正中间点击开启！");
                return false;
            }
        }

    });

    //changeBannerHeight();

    //右侧迷你资料卡 js代码开始
    //右边浮动资料卡日期
    var $dateNow=new Date();
    var $year=$dateNow.getFullYear();
    var $month=$dateNow.getMonth()+1;
    var $day=$dateNow.getDate();
    var $week=$dateNow.getDay();
    var $weekday='';
    if($week==0) $weekday='星期日';
    else if($week==1)$weekday='星期一';
    else if($week==2)$weekday='星期二';
    else if($week==3)$weekday='星期三';
    else if($week==4)$weekday='星期四';
    else if($week==5)$weekday='星期五';
    else if($week==6)$weekday='星期六';
    $("#aTimeNow").html('今天是:  '+$year+'年'+$month+'月'+$day+'日'+' '+$weekday);

    //右边浮动资料卡显示事件
    $("#aboutXiaoMoMini").click(function(){
        $("#aboutXiaoMo").css({"right":"0px","box-shadow":"0px 0px 6px #ccc"});
        $("#aboutXiaoMoMini").css({"right":"-40px"})
    })

    //右边浮动资料卡关闭事件
    $("#aClose").click(function(){
        $("#aboutXiaoMo").css({"right":"-300px","box-shadow":"none"});
        $("#aboutXiaoMoMini").css({"right":"0px"})
    })

    //右侧迷你资料卡 js代码结束

    //用户头像和迷你资料卡的头像旋转效果360度js代码开始
    $("#userAvatarDeg").mouseenter(function(){
        $(this).css({"transform":"rotate(360deg)","transition":"all 0.8s"})
    });
    $("#userAvatarDeg").mouseleave(function(){
        $(this).css({"transform":"rotate(0deg)","transition":"all 1s"})
    })

    $("#miniAvatarDeg").mouseenter(function(){
        $(this).css({"transform":"rotate(360deg)","transition":"all 0.8s"})
    });
    $("#miniAvatarDeg").mouseleave(function(){
        $(this).css({"transform":"rotate(0deg)","transition":"all 1s"})
    })

    //用户头像和迷你资料卡的头像旋转效果360度js代码结束


    //顶部导航栏特效


    //留言板提交内容
    $("#message-submit").click(function(){
        if(confirm("确认要提交留言吗？")){
            alert("提交成功，请等待回复...");
            return false;
        }
        else{
            alert("你已经取消了留言提交，将不会收到回复！");
            return false;
        }
    })


    //$(".nav ul li a").each(function(){
    //    $(this).mouseover(function(){
    //        $(this).addClass(".navNodeBefore:before").siblings().removeClass(".navNodeBefore:before");
    //        $(".navNodeBefore:before").css({"transition":"all 0.5s"});
    //        $(this).addClass(".navNodeAfter:after").siblings().removeClass(".navNodeAfter:after");
    //        $(".navNodeAfter:after").css({"transition":"all 0.5s"});
    //    })
    //})


    //foot底部版权日期js代码开始
    $("#copyDate").html($year);

    //foot底部版权日期js代码结束


    //main主页内容左侧 Y轴旋转模块
    //切换到用户的的信息 单击事件
    $("#tabMenu_User").click(function(){
            $("#media").get(0).play();
            $("#main-left").css({"border-radius":"0px 5px 5px 0px","transform":"rotateY(180deg)","transition":"all 0.5s"});
            $("#xiaoMoShow").css({"opacity":"0","display":"none","transition":"all 1s"});
            $("#userShow").css({"opacity":"1","display":"block","transition":"all 1s"});
    });

    //点击切换到站长信息后 显示广告
    //视频广告默认隐藏
    $(".skip").hide();
    var guangGaoVideo=$("#media").get(0);
    guangGaoVideo.volume=0.3;
    guangGaoVideo.addEventListener('play',function(){
        $(".skip").hide();
    })
    guangGaoVideo.addEventListener('pause',function(){
        $(".skip").show();
    })

    //切换到站长的信息 单击事件
    $("#tabMenu_XiaoMo").click(function(){

        //点击切换到站长信息后 暂停视频的播放
        $("#media").get(0).pause();


        //旋转回站长的信息卡
        $("#main-left").css({"border-radius":"5px 0px 0px 5px","transform":"rotateY(0deg)","transition":"all 0.5s"});
        $("#xiaoMoShow").css({"opacity":"1","display":"block","transition":"all 1s"});
        $("#userShow").css({"opacity":"0","display":"none","transition":"all 1s"});
    });


    //时间轴  公告设置
    $("#notice_link").click(function(){
        var url="TimeLine/index.html";
        $("#right_iframe").attr("src",url);
    })

});