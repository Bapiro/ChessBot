var chessBoard = null;
var game = new Chess();
var COUNTER
var whiteSquareGrey = "#a9a9a9";
var blackSquareGrey = "#696969";
function removeGreySquares() {
  $("#chessBoard .square-55d63").css("background", "");
}

function greySquare(square) {
  var $square = $("#chessBoard .square-" + square);

  var background = whiteSquareGrey;

  if ($square.hasClass("black-3c85d")) {
    background = blackSquareGrey;
  }

  $square.css("background", background);
}

function onMouseOverSquare(square, piece) {
  // Get list of possible moves
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // Exit if there are no legal moves for this $square
  if (moves.length == 0) return;
  // Highlight the possible squares for this moves
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
}

function onMouseOutSquare(square, piece) {
  removeGreySquares();
}

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false;
}

function makeRandomMove() {
  var possibleMoves = game.moves();

  //var board = game.SQUARES;
  //console.log("detta: " + board);

  // game over
  if (possibleMoves.length === 0) return;

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  chessBoard.position(game.fen());
}

function getBestMove(gamePlace) {
  var gameMoves = gamePlace.moves();
  var bestMove = null;
  var bestValue = -9999;
  var alpha = -9999;
  var beta = 9999;

  depth = 2;
  COUNTER = 0;
  for (var i = 0; i < gameMoves.length; i++) {
    var newGameMove = gameMoves[i];
    gamePlace.move(newGameMove);

    // False = blacks turn, true = whites turn
    var boardValue = minimax(gamePlace, depth, alpha, beta, false);
    console.log("antal beräkningar " + COUNTER)
    gamePlace.undo();
    if (boardValue >= bestValue) {
      bestValue = boardValue;
      bestMove = newGameMove;
    }
  }

  return bestMove;
}

function minimax(gamePosition, depth, alpha, beta, maximizingPlayer) {
  COUNTER = COUNTER + 1;
  if (depth == 0) {
    console.log("Värde" + evaluateBoard(gamePosition))
    return -evaluateBoard(gamePosition);
  }

  var gameMoves = gamePosition.moves();
  var boardValue = 0;

  if(maximizingPlayer){
    var bestBoardValue = -9999;
    for (var i = 0; i < gameMoves.length; i++) {
      var newGameMove = gameMoves[i];
      gamePosition.move(newGameMove);

      eval = minimax(gamePosition, depth - 1, alpha, beta, false);
      bestBoardValue = Math.max(bestBoardValue, eval);
      alpha = Math.max(bestBoardValue, alpha)
      
      gamePosition.undo();

      if(alpha >= beta)
      {
        break;
      }
    }
  }
  else{
    var bestBoardValue = 9999;
    for (var i = 0; i < gameMoves.length; i++) {
      var newGameMove = gameMoves[i];
      gamePosition.move(newGameMove);

      eval = minimax(gamePosition, depth - 1, alpha, beta, true)
      bestBoardValue = Math.min(bestBoardValue, eval);
      beta = Math.min(bestBoardValue, beta)

      gamePosition.undo();

      if(alpha >= beta)
      {
        break;
      }

    }
  }
   

  return bestBoardValue;
}

var evaluateBoard = function(gamePlace) {
  var totalEvaluation = 0;
  for (var i = 0; i < gamePlace.SQUARES.length; i++) {
    totalEvaluation =
      totalEvaluation + getPieceValue(gamePlace.get(gamePlace.SQUARES[i]));
  }
  return totalEvaluation;
};

var getPieceValue = function(piece) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function(piece) {
    if (piece.type === "p") {
      return 10;
    } else if (piece.type === "r") {
      return 50;
    } else if (piece.type === "n") {
      return 30;
    } else if (piece.type === "b") {
      return 30;
    } else if (piece.type === "q") {
      return 90;
    } else if (piece.type === "k") {
      return 900;
    }
    throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === "w");
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

function makeGreatMove() {
  var bestMove = getBestMove(game);
  game.move(bestMove);
  chessBoard.position(game.fen());
  if (game.game_over()) {
    alert("Game over");
  }
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: "q" // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return "snapback";

  //take away grey help squares
  onMouseOutSquare();
  // make random legal move for black
  window.setTimeout(makeGreatMove, 250);
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  chessBoard.position(game.fen());
}

var config = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoverSquare: onMouseOverSquare,
  onMouseoutSquare: onMouseOutSquare,
  onSnapEnd: onSnapEnd
};

chessBoard = Chessboard("chessBoard", config);
