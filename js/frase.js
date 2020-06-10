$("#botaoFrase").click(fraseAleatoria);
$("#botaoFraseid").click(buscaFrase)

function fraseAleatoria() {
	$("#spinner").show();

	$.get("http://localhost:3000/frases", trocaFrase)
	.always(function(){
		$("#spinner").hide();
	})
	.fail(function(){
			console.log("DEU ERRO")
			$("#erro").show();
			setTimeout(function(){
				$("#erro").hide();
				}, 5000);
	});
	
	
	console.log("Clicou")
}
function trocaFrase(data){
	$("#gameover").hide()
	console.log("Fiz e deu certo!");
	var frase = $(".frase");
	var numAleatorio = Math.floor(Math.random()*data.length);
	frase.text(data[numAleatorio].texto)
	console.log(data[numAleatorio])
	inicializaFrase()
	inicializaMarcadores()
	atualizaTempo(data[numAleatorio].tempo)
	reiniciaJogo()
}

function atualizaTempo(tempo){
	tempoInicial = tempo;
	$("#tempo").text(tempo)
}

function buscaFrase(){
	$("#spinner").show();
	var fraseID = $("#fraseid").val();
	var dados = {id: fraseID}
	$.get("http://localhost:3000/frases", dados, trocaFraseId)
	.fail(function(){
		console.log("DEU ERRO")
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
			}, 5000);

	})
	.always(function(){
		$("#spinner").hide();
	})
}

function trocaFraseId(data){
	console.log(data)
	$("#gameover").hide()
	console.log("Fiz e deu certo!");
	var frase = $(".frase");
	frase.text(data.texto);
	inicializaFrase()
	inicializaMarcadores()
	atualizaTempo(data.tempo)
	reiniciaJogo()


}