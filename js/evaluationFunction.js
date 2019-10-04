var evaluateBoard = function(gamePlace) {
  var totalEvaluation = 0;
  for (var i = 0; i < gamePlace.SQUARES.length; i++) {
    totalEvaluation =
      totalEvaluation + getPieceValue(gamePlace.get(gamePlace.SQUARES[i]), i);
  }
  return totalEvaluation;
};

var getPieceValue = function(piece, x) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function(piece, isWhite, x) {
    if (piece.type === "p") {
      return 10 + (isWhite ? pawnEvalWhite[x] : pawnEvalBlack[x]);
    } else if (piece.type === "r") {
      return 50 + (isWhite ? rookEvalWhite[x] : rookEvalBlack[x]);
    } else if (piece.type === "n") {
      return 30 + (isWhite ? knightEvalWhite[x] : knightEvalBlack[x]);
    } else if (piece.type === "b") {
      return 30 + (isWhite ? bishopEvalWhite[x] : bishopEvalBlack[x]);
    } else if (piece.type === "q") {
      return 90 + queenEval[x];
    } else if (piece.type === "k") {
      return 900 + (isWhite ? kingEvalWhite[x] : kingEvalBlack[x]);
    }
    throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === "w", x);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

// Placement evaluation of different pieces
var pawnEvalWhite = [
   0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,
   5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,
   1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0,
   0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5,
   0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0,
   0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5,
   0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5,
   0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0
];
// var pawnEvalBlack = reverseArray(pawnEvalWhite);
var pawnEvalBlack = pawnEvalWhite.reverse()

var bishopEvalWhite = [
  -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0,
  -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0,
  -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0,
  -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0,
  -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0,
  -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
  -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0,
  -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0
];
// var bishopEvalBlack = reverseArray(bishopEvalWhite);
var bishopEvalBlack = bishopEvalWhite.reverse()

var rookEvalWhite = [
   0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,
   0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5,
  -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5,
  -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5,
  -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5,
  -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5,
  -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5,
   0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0
];
var rookEvalBlack = rookEvalWhite.reverse();

var knightEvalWhite = [
  -5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0,
  -4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0,
  -3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0,
  -3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0,
  -3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0,
  -3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0,
  -4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0,
  -5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0
];
var knightEvalBlack = knightEvalWhite.reverse();

var queenEval = [
  -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0,
  -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0,
  -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0,
  -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5,
   0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5,
  -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0,
  -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0,
  -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0
];

var kingEvalWhite = [
  -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
  -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
  -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
  -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
  -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0,
  -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0,
   2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0,
   2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0
];
var kingEvalBlack = kingEvalWhite.reverse();