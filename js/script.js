$(document).ready(function () {

    // NOTE: STYLE

    let history_1_height = 72 + (25 * $("#history > div > div > div:nth-child(1) p").length)
    let history_2_height = 72 + (25 * $("#history > div > div > div:nth-child(2) p").length)
    $("#history").css({"height":"calc(79px + " + history_1_height + history_2_height + ")"});
    
    $("#history > div > div > div:nth-child(1)").css({"height":history_1_height})
    $("#history > div > div > div:nth-child(2)").css({"height":history_2_height})

    let teammate_height_pc = 43 * (($(".student").length + 1) + 3) + 79;
    let teammate_height_mobile = 31 * (($(".student").length + 1) + 3) + 79;
    
    if($("body").width() <= 600){
        $("#teammate").css({"height":teammate_height_mobile})
    }else{
        $("#teammate").css({"height":teammate_height_pc})
    }
    
    // NOTE: 로딩창
    $('#loading, #pop').on('scroll touchmove mousewheel', function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    $(window).load(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1);
        setTimeout(function () {
            $('#loading').hide();
            $('#loading').off('scroll touchmove mousewheel');
        }, 1000)
    });
    // NOTE: 팝업

    // if(new Date().getMonth()+1 >= 6 && new Date().getDate()+1 >= 22 && new Date().getHours() >= 24){
    //     $("#pop").css({"display":"none"})
    // }

    // setInterval(function(){
    //     let today = new Date()
    //     let hours = addZeros(today.getHours(), 2); 
    //     let minute = addZeros(today.getMinutes(), 2);
    //     let seconds =  addZeros(today.getSeconds(), 2);
    //     function addZeros(num, digit) { // 자릿수 맞춰주기
    //         let zero = '';
    //         num = num.toString();
    //         if (num.length < digit) {
    //             for (i = 0; i < digit - num.length; i++) {
    //             zero += '0';
    //             }
    //         }
    //         return zero + num;
    //     }
    
    //     let rH = 21 - hours;
    //     let rM = 59 - minute;
    //     if (rM == 60){
    //         rM = 0;
    //     }
    //     let rS = 60 - seconds;
    //     if (rS == 60){
    //         rS = 0;
    //     }

    //     if(hours >= 22){
    //         $("#pop").css({ "display": "none" })
    //     }
        
    //     $("#pop").html("최종발표까지 " + rH + "시간 " +  rM + "분 " +  rS + "초 남았습니다.");
    // })

    // $("#pop").click(function () {
    //     $(this).css({ "display": "none" })
    // })
    // $("#pop p").click(function () {
    //     $(this).css({ "display": "none" })
    // })

    // NOTE: header안 움직이기 버튼
    $("#move > ul > li:nth-child(1)").click(function () {
        $('html, body').animate({
            scrollTop: $("#about").offset().top - (getHeight / 2) + 200
            // scrollTop: $("#about").offset().top - (getHeight / 2) + ($("#about").height() / 2)
        }, 200);
    })
    $("#move > ul > li:nth-child(2)").click(function () {
        $('html, body').animate({
            scrollTop: $("#activity").offset().top - (getHeight / 2) + 200
            // scrollTop: $("#activity").offset().top - (getHeight / 2) + ($("#activity").height() / 2)
        }, 200);
    })
    $("#move > ul > li:nth-child(3)").click(function () {
        $('html, body').animate({
            scrollTop: $("#teammate").offset().top - (getHeight / 2) + 200
            // scrollTop: $("#teammate").offset().top - (getHeight / 2) + ($("#teammate").height() / 2)
        }, 200);
    })
    $("#move > ul > li:nth-child(4)").click(function () {
        $('html, body').animate({
            scrollTop: $("#project").offset().top - (getHeight / 2) + 200
            // scrollTop: $("#project").offset().top - (getHeight / 2) + ($("#project").height() / 3)
        }, 200);
    })

    let jehan = 0;
    let getHeight = $("body").height();
    let com_position = parseInt($("body > div#move_top").css('top'));
    let test = $("#result").offset().top;
    let main_img_h = $("body").height() * 0.7;
    $("#main_img").css({ "height": main_img_h })
    $("#result > div:nth-child(2) > div").css({ "height": getHeight + 200 + "px" })
    $(window).scroll(function () {
        let scrollTop = $(window).scrollTop();

        $("#main_img > div:first-child").css({"bottom":-scrollTop/2})
        // NOTE: 현재 페이지 위치 알림
        let currentPercentage = ($(window).scrollTop() / ($(document).outerHeight() - $(window).height())) * 100;
        $('#progress').width(currentPercentage + '%');

        let newPosition = scrollTop + com_position + "px";
        $("#move_top").stop().animate({
            "top": newPosition
        }, 10);
        // NOTE: header 색 변화
        if (scrollTop > getHeight * 0.7 - 80) {
            $("header").css({
                "background": "rgba(0,0,0,0.8)"
            })
        } else {
            $("header").css({
                "background": "rgba(0,0,0,0)"
            })
        }
        // NOTE: header 표현 변화
        if (scrollTop > 65) {
            $("#move_top").css({
                "opacity": "1"
            })
        } else {
            $("#move_top").css({
                "opacity": 0
            })
        }
        if (jehan == 0) {
            if (scrollTop > test) {
                result_cnt_plus();
            }
        }
    })

    // NOTE: #move_top을 눌렀을 때 맨 위로 이동
    $("#move_top").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 200);
    });

    // NOTE: #main_img 눌렀을 때 맨 위로 이동
    $("#main_img").click(function () {
        $('html, body').animate({
            scrollTop: getHeight * 0.7 - 75
        }, 200);
    });

    // NOTE: #informatio의 수 자동증가
    function result_cnt_plus() {
        jehan = 1;
        let cnt1 = 0;
        let cnt2 = 0;
        let cnt3 = 0;
        let cnt_m = $(".student").length + 1;
        let cnt_c = $("#num_com").attr("value");
        let cnt_v = $("#num_vol").attr("value");
        setInterval(function () {
            if (cnt1 < cnt_m) { //현재 활동 멤버
                cnt1++
            }
            if (cnt2 < cnt_c) { //참여한 대회 개수
                cnt2++
            }
            if (cnt3 < cnt_v) { //봉사활동 시간
                cnt3++
            }
            $("#result > div:nth-child(1) > div > div:nth-child(1) .num").text(cnt1);
            $("#result > div:nth-child(1) > div > div:nth-child(2) .num").text(cnt2);
            $("#result > div:nth-child(1) > div > div:nth-child(3) .num").text(cnt3);

        }, 100);
    }

    // gallary 테이블 변경
    $("#gallary_menu > ul > li:nth-child(1)").click(function () {
        $("#gallary_menu > ul > li:nth-child(1)").css({
            "border": "1px solid grey",
            "border-bottom": 0
        });
        $("#gallary_menu > ul > li:nth-child(2)").css({
            "border": "1px solid grey",
            "border-left": 0
        });
        $("#competition_list").css({
            "display": "block"
        });
        $("#gallary").css({
            "display": "none"
        });

        $("#project").css({ "height": "1230px" })
    });

    $("#gallary_menu > ul > li:nth-child(2)").click(function () {
        $("#gallary_menu > ul > li:nth-child(1)").css({
            "border": "1px solid grey"
        });
        $("#gallary_menu > ul > li:nth-child(2)").css({
            "border-bottom": 0
        });
        $("#competition_list").css({
            "display": "none"
        });
        $("#gallary").css({
            "display": "block"
        });
        $("#project").css({ "height": "930px" });
        cnt = max;
        next();
    })

    // NOTE: 갤러리 이미지 변경
    let img = $("#gallary_img img");
    let cnt = 0;
    let max = img.length - 1;
    $("#slide_btn_1 > div:nth-child(1)").click(prev);
    $("#slide_btn_1 > div:nth-child(2)").click(next);
    setInterval(next, 10000);
    $("#gallary_exp > span:nth-child(1)").text("(" + (cnt + 1) + "/" + (max + 1) + ")");
    $("#gallary_exp > span:nth-child(2)").text($("#gallary_img > img:nth-child(" + (cnt + 1) + ")").attr("alt"));



    function next() {
        if (img.is(":animated")) return false;
        $(img[cnt]).animate({
            "left": "-150%"
        }).siblings().css({
            "left": "150%"
        });
        cnt++;
        if (cnt > max) cnt = 0;
        $("#gallary_exp > span:nth-child(1)").text("(" + (cnt + 1) + "/" + (max + 1) + ")");
        $("#gallary_exp > span:nth-child(2)").text($("#gallary_img > img:nth-child(" + (cnt + 1) + ")").attr("alt"));
        // $("#gallary_exp > span").text("("+(cnt+1)+"/"+max+")");
        $(img[cnt]).animate({
            "left": "50%"
        });
    }

    function prev() {
        if (img.is(":animated")) return false;
        $(img[cnt]).animate({
            "left": "150%"
        }).siblings().css({
            "left": "-150%"
        });
        cnt--;
        if (cnt < 0) cnt = max;
        $("#gallary_exp > span:nth-child(1)").text("(" + (cnt + 1) + "/" + (max + 1) + ")");
        $("#gallary_exp > span:nth-child(2)").text($("#gallary_img > img:nth-child(" + (cnt + 1) + ")").attr("alt"));
        $(img[cnt]).animate({
            "left": "50%"
        });
    }
})