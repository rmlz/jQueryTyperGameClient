$("#botaoPlacar").click(function(){
	console.log("clicou");
	$(".placar").stop().slideToggle(600);
});



$("#botaoSync").click(function() {
	var placar = [];
	var linhas = $("tbody>tr");

	linhas.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavras = $(this).find("td:nth-child(2)").text();
		
		var score ={
			usuario: usuario,
			pontos: palavras
		};
		placar.push(score);
	});
	var dados = {
		placar: placar
	}
	$.post("http://localhost:3000/placar", dados, function(){
		console.log("Salvo")
	})
})

function inserePlacar() {
	var tabela = $('.placar').find("tbody");
	var usuario = "Ramon";
	var score = $("#contador-palavras").text();
	var linha = novaLinha(usuario, score);

	linha.find(".botaoRemover").click(removeLinha)
	tabela.append(linha)
	
	$(".placar").slideDown(300);
	scrollPlacar()

}

function scrollPlacar(){
	var posicaoPlacar = $(".placar").offset().top;
	$("body").animate({
		scrollTop: posicaoPlacar+"px"
	}, 1000);
}

function novaLinha(usuario, score){
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario)
	var colunaScore = $("<td>").text(score)
	var colunaRemover = $("<td>")
	var link = $("<a>").addClass("botaoRemover").attr("href","#")
	var icon = $("<i>").addClass("small").addClass("material-icons").text("delete")

	link.append(icon);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaScore);
	linha.append(colunaRemover);
	return linha;

}

function removeLinha(){
	event.preventDefault();
	var linha = $(this).parent().parent();
	console.log("CLICKADO")
	console.log(linha)
	linha.fadeOut(500);
	setTimeout(function(){
		linha.remove();	
	}, 500)
	

}

function atualizarPlacar() {

	$.get("http://localhost:3000/placar", function(data){
		
		$(data).each(function() {
			var linha = novaLinha(this.usuario, this.pontos)
			$("tbody").append(linha)
			linha.find(".botaoRemover").click(removeLinha)
		});
	});
};