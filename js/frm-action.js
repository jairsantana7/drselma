function setAba(id){
	for(j = 1; j <= 4; j++){
		$('#step-'+j+'-container').hide();
		$('#step-'+j+'').removeClass("current");
	}
	$('#step-'+id+'-container').show();
	$('#step-'+id+'').addClass('current');
	if(isIgreja())
		$("#option-igreja").hide();

}

function setSegmento(segmento){

	$('input:radio[name=segmento][value='+segmento+']').prop('checked', true);
	
	$('#step-1-container').fadeOut(400,function(){
		$('#step-2-container').fadeIn(400);
	});

	$('#step-1').removeClass("current");
	$("#step-2").addClass('current');			

	$(".bloco-empresa").html('');
	$(".bloco-igreja").html('');
	$('.bloco-pessoa-fisica').html('');
	$(".bloco-empresa").hide();
	$(".bloco-igreja").hide();

	switch(segmento){
		case 1:
			$.ajax({
			  type: 'GET',
			  url: plugin_path+'/wporcamento/view/frm-cadastro.php',
			  data: { tipofrm:1},
			  success: function( results ) {
				$( '.bloco-pessoa-fisica' ).html( results );
				$(".bloco-pessoa-fisica").show();
			  }
			});
			break;
		case 2:
			$.ajax({
			  type: 'GET',
			  url: plugin_path+'/wporcamento/view/frm-cadastro.php',
			  data: { tipofrm:2},
			  success: function( results ) {
				$( '.bloco-empresa' ).html( results );
				$(".bloco-empresa").show();
			  }
			});

			break;
		case 4:
			$.ajax({
			  type: 'GET',
			  url: plugin_path+'/wporcamento/view/frm-cadastro.php',
			  data: { tipofrm:4},
			  success: function( results ) {
				$( '.bloco-igreja' ).html( results );
				$(".bloco-igreja").show();
			  }
			});
			break;
		default:
			$.ajax({
			  type: 'GET',
			  url: plugin_path+'/wporcamento/view/frm-cadastro.php',
			  data: { tipofrm:1},
			  success: function( results ) {
				$( '.bloco-pessoa-fisica' ).html( results );
				$(".bloco-pessoa-fisica").show();
			  }
			});			
			$(".bloco-pessoa-fisica").show();		
	}

	if(isIgreja())
		$("#option-igreja").hide();
}

function isIgreja(){
	if($('input:radio[name=segmento]:checked').val() == "4")
		return false;
	return true;
}    

function validade_form(type){
	
	if(isIgreja())
		$("#option-igreja").hide();

	if( type == 'section-servicos'){
		if($('input[name="section-orcamento"]:checked').length == 0)
			return alert("Por favor selecione um projeto!");
		
		var fields_section = $("input[name='section-orcamento']").serializeArray(); 
		if(fields_section.length == 0){  
			$("#wp-orc-erro").html('<p>Erro por favor selecione uma se&ccedil;&atilde;o');
		}else{
			$("#wp-orc-erro").html('');

			$("#step-2-container").fadeOut(400,function(){
				$("#step-3-container").fadeIn(400);
			});

			$("#step-2").removeClass('current');			
			$("#step-3").addClass('current');			

			$('#step-2-container input[type="checkbox"]').each(function() {
				   if($(this).attr("checked"))
				   		$(".section-orcamento-"+$(this).val()).show('fast');
					else
				   		$(".section-orcamento-"+$(this).val()).hide('fast');
			});

		}
	}

	if( type == 'section-opcoesservicos'){

		var exessao = true;
		if($('input[name="section-orcamento"]:checked').length == 1)
			if($('input[name="section-orcamento"]:checked')[0].value == "15")
				exessao = false;
				
		
		if(exessao){

			if($('#sec-projeto-grafico-para-dvd').is(':checked')){
				if($('input[name="pgdvd"]:checked').val() == undefined)
					return alert("Por favor selecione um item para seu projeto!");
				
			}else if($('#sec-projeto-grafico-para-cd').is(':checked')){
				if($('input[name="pgcd"]:checked').val() == undefined)
					return alert("Por favor selecione um item para seu projeto!");
			}else if($('#sec-midiasgraficas').is(':checked')){
				if($('input[name="midiafolder"]:checked').val() == undefined )
					return alert("Por favor selecione um item para seu projeto!");
			}else {
				if($('input[name="topicos[]"]:checked').length == 0)
					return alert("Por favor selecione um item para seu projeto!");
			}	
		}
		
		$("#step-3").removeClass('current');			
		$("#step-4").addClass('current');			

		$("#step-3-container").fadeOut(400,function(){
			$("#step-4-container").fadeIn(400);
		});
		
	}
}

verifica = 1;
function loadCity(){

	jQuery(document).ready(function($) {
		$( '#cidade_orc' ).html('<option value="">...carregando</option>');
		$('.out-cidade').text('Selecione a Cidade');
		var cidade = geoip_city();

		$.ajax({
		  type: 'GET',
		  url: plugin_path+'/wporcamento/ajax.php',
		  data: { codstate:$('#state_orc').val()},
		  success: function( results ) {
			$( '#cidade_orc' ).html( results );
			$('[name=cidade_orc] option').filter(function() { 
				if($(this).text() == cidade)
					return true;
			}).prop('selected', true);
		  }
		});

		if( verifica == 1 ){
			$('.out-cidade').text(cidade);
			verifica = 0;
		}

	});

}

function loadAdress(){
	
	jQuery(document).ready(function($) {

			var isopais = $('#pais_orc').val();
			
			if( isopais == 'BR' ){

				$('#state_orc :nth-child(1)').attr('value', '')

				$('#cidade_orc :nth-child(1)').attr('value', '')

				$(".adress-brazil").show("fast");
			}
			else{

				$('#state_orc :nth-child(1)').attr('value', 'null')

				$('#cidade_orc :nth-child(1)').attr('value', 'null')
				
				$(".adress-brazil").css("display", "none");

			}
	});

}

$("#sec-blog").change(function(event) {
		
	if($(this).is(':checked'))
		$('#blog-comp').attr('checked','checked');
	else
		$('#blog-comp').removeAttr('checked');

	});

$("#sec-ecommerce").change(function(event) {
		
	if($(this).is(':checked'))
		$('#ecommerce-site').attr('checked','checked');
	else
		$('#ecommerce-site').removeAttr('checked');

	}); 	