
$(document).ready(function(){
	// 공통 메인 슬라이드
	$('.bxslider').bxSlider({
	  auto: true,
	  autoControls: false,
	  stopAutoOnClick: true,
	  pager: false,
	  slideWidth: 1200,
	});
	

	/*메인 페이지 상단 메뉴*/
	$(".navi .firstUi > li").hover(function(){
		var result = $(".navi ul").hasClass('subtype');
		if (result === true){
			$(this).css("border-bottom","3px solid #ffd400");
			$(this).find('div').css("display","block");	
		} else {
			$(this).css("border-bottom","3px solid #4d4d4d");
			$(this).find('div').css("display","block");	
		}
	},function(){
		$(this).css("border-bottom","none");
		$(this).find('div').css("display","none");
	});


	$(".utill .boxing").hover(function(){
		$(".utillConts").css("display","block");
		$(".toparrow").css("display","block");
	},function(){
		$(".utillConts").css("display","none");
		$(".toparrow").css("display","none");
	});
    
	/*checkbox*/
	$(".check .checkInput").change(function(){
		if($(this).is(":checked")){
            $(this).next().css("display","none");
            $(this).next().next().css("display","block");   
            var realCheck = $(this).parent().next().children().text();
            $(this).next().next().next().attr("value",realCheck);  
        }else{
            $(this).next().css("display","block");
            $(this).next().next().css("display","none");
            $(this).next().next().next().attr("value","");  
        }
	})

	/* 상품등록 상위카테고리*/
    
	$("#upSelect").change(function(){
		var selVal = $("#upSelect option:selected").val();
		if (selVal =='디자인'){
			$(".category .downCate").css("display","block");
			$("#designSch").css("display","block");
            $("#designSch").attr("name","de_cate_02");
			$("#itSch").css("display","none");
            $("#itSch").attr("name","");
            $(".itHistory .checkRealTex").attr("name","");
            for (var i = 1; i<5; i++) {
                $(".deHistory .checkRealTex").eq(i-1).attr("name","de_type_0"+i)
            }
		} else {
			$(".category .downCate").css("display","block");
			$("#designSch").css("display","none");
			$("#itSch").css("display","block");
            $("#itSch").attr("name","de_cate_02");
            $("#designSch").attr("name","");
            $(".deHistory .checkRealTex").attr("name","");
            for (var i = 1; i<5; i++) {
                $(".itHistory .checkRealTex").eq(i-1).attr("name","de_type_0"+i)
            }
		}
	});
    
	/* 서비스 방식 */
	$("#designSch").change(function(){
		var selVal = $("#designSch option:selected").val();
		if (selVal =='로고디자인' || selVal =='명함 & 인쇄물' || selVal =='웹 & 모바일'){
			$(".designType").css("display","block");
			$(".itType").css("display","none");
		}
	});

	$("#itSch").change(function(){
		var selVal = $("#itSch option:selected").val();
		if (selVal =='워드프레스' || selVal =='웹사이트 개발' || selVal =='웹사이트 유지보수'){
			$(".itType").css("display","block");
			$(".designType").css("display","none");
		}
	});
    
    
	$(".btnStep01").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","block");
	});
	$(".btnStep02 .btnstp1").click(function(){
		$(".step01").css("display","block");
		$(".step02").css("display","none");
	});
	$(".btnStep02 .btnstp2").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","none");
		$(".step03").css("display","block");
	});
	$(".btnStep03 .btnstp1").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","block");
		$(".step03").css("display","none");
		$(".step04").css("display","none");
	});
	$(".btnStep03 .btnstp2").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","none");
		$(".step03").css("display","none");
		$(".step04").css("display","block");
	});
	$(".btnStep04 .btnstp1").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","none");
		$(".step03").css("display","block");
		$(".step04").css("display","none");
		$(".step05").css("display","none");
	});
	$(".btnStep04 .btnstp2").click(function(){
		$(".step01").css("display","none");
		$(".step02").css("display","none");
		$(".step03").css("display","none");
		$(".step04").css("display","none");
		$(".step05").css("display","block");
	});
    
    
    /* 크몽 결제금액 count변경*/
    var count = 1;
    var urlCount = 1;
    $(".plusM").click(function(){
        urlCount =  ++urlCount;
        var href= $(".realCdount").attr('href');
        var replaceHref = href.replace('count='+count,'count='+ urlCount);
        $(".realCdount").attr('href',replaceHref);
        count = ++count;
        var money = $(".totalMoney").text();
        $(".changeM").text(money*count);
        $(".countM").text(count)
        
    });
    
    $(".minusM").click(function(){
         urlCount =  --urlCount;
        if (urlCount <= 0){
            urlCount = 1;
        } else {
            var href= $(".realCdount").attr('href');
            var replaceHref = href.replace('count='+count,'count='+ urlCount);
            $(".realCdount").attr('href',replaceHref);
        }
        count = --count;
        if (count <= 0){
            count = 1;
            $(".countM").text(count)
        }else {
            var money = $(".totalMoney").text();
            $(".changeM").text(money*count);  
            $(".countM").text(count)
        } 
    });   
    
    
    
});