function Player(_name, _desciption){
    this.name=_name;
    this.desciption=_desciption
} 
const playerOne = new Player('player one', 'X');
const playerTwo = new Player('player two', 'O');

function TicTacToe(){
    this.players=[playerOne, playerTwo];
    this.board= Array(9).fill(null);

    const winningOptions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
}
