//var Chess = require('chess.js').Chess;
var board, chess = new Chess();



while (!chess.game_over()) {
    var moves = chess.moves();
    var move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
}
console.log(chess.pgn());
var config = {
    draggable: true,
    dropOffBoard: 'trash',
    position: 'start'
}

var board = Chessboard('board', config);
