   
function loginIdCheck(){
 $.ajax({  
    type : "post",
    url : "/loginIdc",
    dataType : "text",
    data: {u_id:$("#u_id").val()},
    error : function(data){
        alert('통신실패!!');
    },
    success : function(data){   
        var count = Object.keys(data).length;
        if (count > 2) {
            $(".loginCId .ty1").css("display","block")
            $(".loginCId .ty2").css("display","none")
            $(".loginBoxing .loginBtn").css("display","none")
        } else {
            $(".loginCId .ty1").css("display","none")
            $(".loginCId .ty2").css("display","block")
            $(".loginBoxing .loginBtn").css("display","block")
        }
    }
 });       
}

function typeList(listText){
 $(".dbSelerList").css("display","none");  
 $(".ajaxSelerList").empty();
 $.ajax({
    type : "post",
    url : "/typeList",
    dataType : "json",
    async: false,
    data: {cate:listText},
    error : function(data){
        alert('통신실패!!');
    },
    success : function(data){  
        var sellerList = "<ul>";
        for (var key in data){
            sellerList += "<li>"
            sellerList += '<a href=product_list_view?c='+data[key].c_idx+'&d='+data[key].de_idx+'>'
            sellerList += '<img src='+ data[key].c_id + '/' + data[key].de_main_img + '>'
            sellerList += '<p class=productTex>'+data[key].de_tit+'</p>'
            sellerList += "</a>"
            sellerList += '<div class=procuctPay>'
            sellerList += '<p></p>'
            sellerList += '<p>₩' + data[key].de_pay +'</p>'
            sellerList += '</div>'
            sellerList += '<div class=star>'
            sellerList += '<p class=user>' + data[key].c_id + '</p>'
            sellerList += '<p class=starNum>'+'</p>'
            sellerList += '</div>'
            sellerList += "</li>"
        }
        sellerList += "</ul>"
        $(".ajaxSelerList").append(sellerList);
    }
 });
}

function typeListC(totalResult){
 $(".dbSelerList").css("display","none");  
 $(".ajaxSelerList").empty();
    var cate01 = totalResult.cate01;
    console.log(cate01)
    var arr = [];
    for (var i = 0; i < totalResult.check.length; i++){
        arr[i] = totalResult.check[i].value;
    }
jQuery.ajaxSettings.traditional = true;
 $.ajax({
    type : "post",
    url : "/typeListCheck",
    dataType : "json",
    async: false,
    data: {
        arr : arr,
        cate01 : cate01
    },
    error : function(data){
        alert('통신실패!!');
    },
    success : function(data){  
        var sellerList = "<ul>";
        for (var key in data){
            sellerList += "<li>"
            sellerList += '<a href=product_list_view?c='+data[key].c_idx+'&d='+data[key].de_idx+'>'
            sellerList += '<img src='+ data[key].c_id + '/' + data[key].de_main_img + '>'
            sellerList += '<p class=productTex>'+data[key].de_tit+'</p>'
            sellerList += "</a>"
            sellerList += '<div class=procuctPay>'
            sellerList += '<p></p>'
            sellerList += '<p>₩' + data[key].de_pay +'</p>'
            sellerList += '</div>'
            sellerList += '<div class=star>'
            sellerList += '<p class=user>' + data[key].c_id + '</p>'
            sellerList += '<p class=starNum>'+'</p>'
            sellerList += '</div>'
            sellerList += "</li>"
        }
        sellerList += "</ul>"
        $(".ajaxSelerList").append(sellerList);
    }
 });
}



function typeListAll(totalResult){
 $(".dbSelerList").css("display","none");  
 $(".ajaxSelerList").empty();
    var listText = totalResult.listText;
    var arr = [];
    for (var i = 0; i < totalResult.check.length; i++){
        arr[i] = totalResult.check[i].value;
    }
    console.log(arr)
jQuery.ajaxSettings.traditional = true;
 $.ajax({
    type : "post",
    url : "/ListCheckT",
    dataType : "json",
    async: false,
    data: {
        arr : arr,
        listText : listText
       
    },
    error : function(data){
        alert('통신실패!!');
    },
    success : function(data){  
        var sellerList = "<ul>";
        for (var key in data){
            sellerList += "<li>"
            sellerList += '<a href=product_list_view?c='+data[key].c_idx+'&d='+data[key].de_idx+'>'
            sellerList += '<img src='+ data[key].c_id + '/' + data[key].de_main_img + '>'
            sellerList += '<p class=productTex>'+data[key].de_tit+'</p>'
            sellerList += "</a>"
            sellerList += '<div class=procuctPay>'
            sellerList += '<p></p>'
            sellerList += '<p>₩' + data[key].de_pay +'</p>'
            sellerList += '</div>'
            sellerList += '<div class=star>'
            sellerList += '<p class=user>' + data[key].c_id + '</p>'
            sellerList += '<p class=starNum>'+'</p>'
            sellerList += '</div>'
            sellerList += "</li>"
        }
        sellerList += "</ul>"
        $(".ajaxSelerList").append(sellerList);
    }
 });
}

/* 관심등록 */
    
$(document).on("click",'.procuctPay',function(){ 
    var d_idx = $(this).next().next().val();
    var thisC = $(this).children().first();
    /*$(this).children().first().addClass("aaaa")*/
    $.ajax({
        type : "post",
        url : "/interest",
        dataType : "text",
        data: {c_idx:$("#inteU_idx").val(),c_id:$("#inteU_id").val(),d_idx:d_idx},
        error : function(data){
            alert('통신실패!!');
        },
        success : function(data){    
            if (data == 0){
                $(thisC).removeClass("onStar")
            } else {
                $(thisC).addClass("onStar")
            }
        }
    });
});





