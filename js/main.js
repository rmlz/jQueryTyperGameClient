var tempoInicial = 5
var campo = $(".campoDigitacao");

$(function(){
	atualizarPlacar()
	inicializaFrase();
	inicializaContadores();
	inicializaMarcadores();
	inicializaCronometro();
	$("#botaoReiniciar").click(reiniciaJogo)

});

function inicializaFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanhoFrase");

	tamanhoFrase.text(numPalavras);

};


function inicializaContadores(){
	campo.on("input", function(){
	var qtdPalavras = campo.val().split(/\S+/).length - 1;
	$("#contador-palavras").text(qtdPalavras);

	var qtdCaracteres = campo.val().length;
	$("#contador-caracteres").text(qtdCaracteres);
	});

};


function inicializaCronometro() {
	var tempo = tempoInicial
	$("#tempo").text(tempo);
	campo.one("focus", function(){
		$("#botaoReiniciar").attr("disabled", true)

		var cronometroID = setInterval(function(){
			tempo--;
			$("#tempo").text(tempo);
			if(tempo < 1){
				clearInterval(cronometroID);
				finalizaJogo();
				}
			}, 1000);
	});
}
function finalizaJogo(){
	campo.attr("disabled", true)
	$("#gameover").show()
	$("#botaoReiniciar").attr("disabled", false)
	campo.addClass("campoDesativado")
	inserePlacar()
}

function inicializaMarcadores(){
	var frase = $(".frase").text();

	campo.on("input", function(){
	var digitado = campo.val();

	var comparavel = frase.substr(0, digitado.length)

	if(comparavel != digitado){
		campo.addClass("campoDigitacaoErrado")
	}else{
		campo.removeClass("campoDigitacaoErrado")
	}
});	
		
	}


function reiniciaJogo(){
	$("#gameover").hide()
	campo.attr("disabled", false)
	$("#contador-caracteres").text(0)
	$("#contador-palavras").text(0)
	tempo = tempoInicial
	$("#tempo").text(tempo)
	$(".campoDigitacao").val("")
	campo.removeClass("campoDesativado")
	inicializaCronometro()
	campo.removeClass("campoDigitacaoErrado")

}