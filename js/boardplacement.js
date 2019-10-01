var chessBoard = null;
var game = new Chess();
var COUNTER;
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
function chessUndo() {
  game.undo();
  game.undo();
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
