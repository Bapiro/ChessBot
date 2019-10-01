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
    console.log("antal beräkningar " + COUNTER);
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
    console.log("Värde" + evaluateBoard(gamePosition));
    return -evaluateBoard(gamePosition);
  }

  var gameMoves = gamePosition.moves();
  var boardValue = 0;

  if (maximizingPlayer) {
    var bestBoardValue = -9999;
    for (var i = 0; i < gameMoves.length; i++) {
      var newGameMove = gameMoves[i];
      gamePosition.move(newGameMove);

      eval = minimax(gamePosition, depth - 1, alpha, beta, false);
      bestBoardValue = Math.max(bestBoardValue, eval);
      alpha = Math.max(bestBoardValue, alpha);

      gamePosition.undo();

      if (alpha >= beta) {
        break;
      }
    }
  } else {
    var bestBoardValue = 9999;
    for (var i = 0; i < gameMoves.length; i++) {
      var newGameMove = gameMoves[i];
      gamePosition.move(newGameMove);

      eval = minimax(gamePosition, depth - 1, alpha, beta, true);
      bestBoardValue = Math.min(bestBoardValue, eval);
      beta = Math.min(bestBoardValue, beta);

      gamePosition.undo();

      if (alpha >= beta) {
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
