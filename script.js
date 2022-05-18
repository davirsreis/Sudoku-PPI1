function hide() {
  var x = document.getElementById("regras");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function escolherDificuldade() {
  var x = document.getElementById("dificuldade");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function hideEndGame() {
  var x = document.getElementById("endGame");
  if (x.style.display === "none") {
    x.style.display = "block";
    
  } else {
    $('#grade').remove();//remove a tabela antiga
    let grade = $('<table id="grade"></table>');
    $('#jogo').append(grade);//coloca uma nova tabela
    x.style.display = "none";
    
  }
}

function info_autores() {
  var x = document.getElementById("info");
  if (x.style.display === "none") {
    x.style.display = "block";
    
  } else {
    x.style.display = "none";
    
  }
}

let dificuldade = '';

function start() {

  hideEndGame();
  escolherDificuldade();
  
  
  let prejogo1 = [
    ['4', '', '9', '7', '', '', '', '3', '2'],
    ['2', '8', '1', '6', '9', '', '', '', '5'],
    ['7', '3', '', '4', '8', '2', '', '', '6'],
    ['', '', '', '2', '7', '', '9', '', ''],
    ['', '', '', '', '', '8', '2', '', ''],
    ['', '', '2', '', '', '5', '6', '1', '3'],
    ['9', '', '', '', '1', '', '3', '7', '8'],
    ['1', '5', '', '3', '', '', '', '', ''],
    ['', '', '', '', '', '9', '5', '6', '']
  ] // Dificuldade fácil

  let prejogo2 = [
    ['1', '', '', '3', '', '', '9', '2', ''],
    ['3', '', '', '4', '', '', '8', '5', ''],
    ['6', '', '', '9', '', '1', '', '7', ''],
    ['4', '7', '9', '', '1', '', '', '', ''],
    ['', '', '2', '', '6', '', '1', '', ''],
    ['', '', '', '', '8', '', '4', '3', '7'],
    ['', '5', '', '8', '', '7', '', '', '2'],
    ['', '8', '4', '', '', '2', '', '', '3'],
    ['', '6', '3', '', '', '5', '', '', '9']
  ] // Dificuldade média

  let prejogo3 = [
    ['', '1', '', '', '', '', '7', '', ''],
    ['7', '', '', '', '8', '4', '', '', '6'],
    ['', '', '', '', '', '', '8', '3', ''],
    ['', '4', '9', '', '', '', '2', '', ''],
    ['8', '', '', '', '', '', '', '1', ''],
    ['5', '3', '', '6', '', '2', '9', '', '4'],
    ['9', '', '', '1', '', '', '', '7', '8'],
    ['', '8', '', '', '', '', '4', '', ''],
    ['3', '', '', '2', '', '', '', '', '1']
  ] // Dificuldade difícil

  let sudoku = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ]; // Grade de sudoku

  if (dificuldade == 'facil') {
    sudoku = prejogo1
  } else if (dificuldade == 'medio') {
    sudoku = prejogo2
  } else {
    sudoku = prejogo3;
  }


  $(document).ready(
    function () {
      for (let l = 0; l <= 8; l++) {
        let tr = $('<tr>'); // Criação das linhas
        for (let c = 0; c <= 8; c++) {
          let input = $(`<input type="text" id="c${l}${c}" value="${sudoku[l][c]}">`)
          let td = $('<td>'); // Criação das colunas
          td.append(input);
          tr.append(td);
          input.on('input',

            function () {
              let e = $(this);
              let lin = e.attr('id')[1];
              let col = e.attr('id')[2];
              let valor = e.val();

              if (valor != isNaN('')) {
                if (jogada_valida(sudoku, lin, col, valor)) {
                  sudoku[lin][col] = valor;
                  $(this).removeClass('invalida');
                }
                else {
                  alert('Jogada Inválida!')
                  $(this).addClass('invalida');

                }
              }
              else {
                sudoku[lin][col] = '';
                $(this).removeClass('invalida');
              }

              if (FimdeJogo(sudoku, col)) {
                alert('Fim de jogo')
              }
            });
        }

        $('#grade').append(tr);
      }
    }
  );

  function jogada_valida(sudoku, lin, col, valor) {
    if(isNaN(valor)){return false} // Não possibilita por letras
    
      let linha1 = 0
      let coluna1 = 0

      // verifica em que grupo de três está, para o 'for' percorrer apenas nele
      if (lin < 3) {  
        linha1 = 2 // define a última linha do grupo
      }
      else if (lin < 6) {
        linha1 = 5
      }
      else { linha1 = 8 }

      if (col < 3) {
        coluna1 = 2 // define a última coluna do grupo
      }
      else if (col < 6) {
        coluna1 = 5
      }
      else { coluna1 = 8 }

      for (let i = (linha1 - 2); i <= linha1; i++) { // Percore pela maior e menor linha do grupo que o 'valor' está.
        for (let j = (coluna1 - 2); j <= coluna1; j++) { // Percore pela maior e manor coluna do grupo que o 'valor' está.

          if (valor == sudoku[i][j]) {
            return false // Se tiver um outro valor igual no grupo, a jogada é inválida
          }
        }
      }

    let c = []// array com todas colunas para usar a opção de filtrar

    for (let i = 0; i <= 8; i++) {
      c.push(sudoku[i][col])
    }

    if (sudoku[lin].filter(x => x == valor) == valor) {
      return false
    }
    else if (c.filter(x => x == valor) == valor) {
      return false
    }
    if (sudoku[lin].filter(x => x != valor) != valor) {
      return true
    }
    else if (c.filter(x => x != valor) != valor) {
      return true
    }
  }

  function FimdeJogo(sudoku, col) {

    for (let i = 0; i <= 8; i++) {
      for (let l in sudoku[i]) {

        if (sudoku[i][l] == '') {
          return false
        }
      }
    }

    for (let l = 0; l <= 8; l++) {
      if (sudoku[l][col] == '') {
        return false
      }
      return true
    }
  }

}