class Cell extends React.Component{
    active(){
        return this.props.activeCells.indexOf(this.props.id) >= 0;
    }
    handleClick(){
        if(this.guessState() === undefined && this.props.gameState ==="recall"){
            this.props.recordGuess({
                cellId:this.props.id,
                userGuessIsCorrect:this.active()
            });
        }
    }
    guessState(){
        if(this.props.rightGuesses.indexOf(this.props.id) >= 0){
            return true;
        }
        else if(this.props.wrongGusses.indexOf(this.props.id) >= 0)
        {
            return false;
        }
    }
    
    render(){
        let className = "cell";
        if(this.props.showActiveCells && this.active()){
            className += " active";
        }
        className += " guess-"+this.guessState();
        return(
            <div className="cell" className={className} onClick={this.handleClick.bind(this)}>
            </div>
        );
    }
}
export default Cell;