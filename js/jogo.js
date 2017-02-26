var rodada = 1;
var campo = Array(3);

campo["a"] = Array(3);
campo["b"] = Array(3);
campo["c"] = Array(3);

for (var i = 0; i < campo.length; i++) {
  campo['a'][i] = 0;
  campo['b'][i] = 0;
  campo['c'][i] = 0;
}

$(document).ready( function(){

  $('#btn_play').click(function(){

    // Validação da entrada
    if($('#name_jogador1').val() == "" || $('#name_jogador2').val() == ""){
      alert("Um dos jogadores não está presente");
      return false;
    }

    //Escrevendo os nomes no Spam
    $('#nome1').html($('#name_jogador1').val());
    $('#nome2').html($('#name_jogador2').val());

    //Escondendo e mostrando a div de inicio

    $('#inicial').hide();
    $('#cenario').show();
  });

  $('.box').click(function(){
    var id_campo = this.id;
    jogada(id_campo);
  });

  function jogada(id) {
    var pontos = 0;
    var icone = '';

    if( (rodada%2) == 1) {
      icone = 'url("img/marcacao_1.png")';
      pontos = -1;
    }
    else{
      icone = 'url("img/marcacao_2.png")';
      pontos = 1;
    }
    rodada++;
    $('#'+id).css('background-image',icone);

    var linha_coluna = id.split('-');
    campo[linha_coluna[0]][linha_coluna[1]] = pontos;

    verifica();

  }
 function verifica() {
   var pontos = 0;

   for (var i = 0; i < campo.length; i++) {
     pontos = pontos + campo['a'][i];
   }
   ganhador(pontos);

   pontos = 0;
   for (var i = 0; i < campo.length; i++) {
     pontos = pontos + campo['b'][i];
   }
   ganhador(pontos);

   pontos = 0;
   for (var i = 0; i < campo.length; i++) {
     pontos = pontos + campo['c'][i];
   }
   ganhador(pontos);

   for (var l = 0; l < campo.length;l++) {
     pontos = 0;

     pontos += campo['a'][l];
     pontos += campo['b'][l];
     pontos += campo['c'][l];
     ganhador(pontos);
   }

   pontos = 0;
   pontos = campo['a'][0] + campo['b'][1] + campo['c'][2];
   ganhador(pontos);

   pontos = 0;
   pontos = campo['a'][2] + campo['b'][1] + campo['c'][0];
   ganhador(pontos);

 }

 function ganhador(pontos) {
   if (pontos == -3) {
     $('#vez').html($('#name_jogador1').val() +' Ganhou !' );
     $('.box').off();
     $('.ganhador').show();
     $('#btn_novo_jogo').click(function () {
       location.reload();
     });
  }
   else if(pontos == 3){
     $('#vez').html($('#name_jogador2').val() +' Ganhou !' );
     $('.ganhador').show();
     $('.box').off();
     $('#btn_novo_jogo').click(function () {
       location.reload();
     });
  }

 }
});
