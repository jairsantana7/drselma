$(document).ready(function(){
$Body=$("body");
$Intro=$("#introducao");
/* carregamento da página */
$Body.queryLoader2({barColor:"#046c7f",backgroundColor:"#fff",percentage:true,barHeight:1,completeAnimation:"fade",minimumTime:100});

/* Scroll animation keyboard */
$Body.pageScroller({keyboardControl:true,scrollOffset:-50,HTML5mode:true});

$("#logo").bind("click",function(){pageScroller.goTo(1)});
$("#clickProjetos").bind("click",function(){pageScroller.goTo(2)});
$("#clickServicos").bind("click",function(){pageScroller.goTo(3)});
$("#clickAcompanhe").bind("click",function(){pageScroller.goTo(4)});
$("#clickSobreMim").bind("click",function(){pageScroller.goTo(5)});
$("#clickContato").bind("click",function(){pageScroller.goTo(6)});
$("#clickOrcamento").bind("click",function(){pageScroller.goTo(7)});
//$Work.bind("click",function(){pageScroller.goTo(2)});
$(".va-nav-next").bind("click",function(){ $(".va-nav-next").removeClass('gifOn'); });


/* Mini menu & responsive */
$(window).scroll(function(){miniMenu()});
$(window).resize(function(){responsive()});

$("#contactForm").one("submit",function(){var e=$("#subject").val();if(e!=""){$.ajax({type:"POST",data:$(this).serialize(),url:"contato.php",success:function(e){$("#result").html(e);$("#envoyer").addClass("disable"); $('#envoyer').click(function(){return false});},error:function(){$("#post").html("Une erreur est survenue.")}})}return false})	
})

/* Protect email */
$('.nospam').each(function(){
var email = $(this).html();
email = email.replace("[arobase]","@");
email = email.replace("[point]",".");
$(this).html("<a href=\"mailto:"+email+"?subject=Oi%20Jair\"><strong>"+email+"</strong></a>");


/* Parralax */
    $(document).scroll(function(){
        var $document = $(document),
            $documentScroll = $document .scrollTop();
        if ($documentScroll <= 650 ) {    
            $Intro.css({top:-(($documentScroll)/1.65)});
        } /*opacity*/
    });
	
});