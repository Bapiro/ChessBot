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
    //console.log("Värde" + evaluateBoard(gamePosition));
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