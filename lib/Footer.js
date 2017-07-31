class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    remainingCount(){
        if(this.props.gameState!= "recall") return null;
        else{
            return(
                <div className="correct-guess-remain">
                   Correct Guesses Remaining: { this.props.activeCellCount - this.props.rightGuesses.length }
                   <h4> Time Remaining : {this.props.time} </h4>
                </div> 
            );
        }
    }
    render(){
        if(!this.props.showButton)
        {    return(
            
                <div className="footer">
                    
                    <div className="hint">
                        {   this.props.hints[this.props.gameState] }
                    </div>
                    { this.remainingCount() } 
                   <button onClick={this.props.startGame} >Play </button>
                </div>
            )
        }
        else{
             return(
                <div className="footer">
                    <div className="hint">
                        {   this.props.hints[this.props.gameState] }
                    </div>
                    { this.remainingCount() }  
                    <button onClick={this.props.handleClick} >Play Again</button>
                </div>
            )
        }
    }
}
Footer.defaultProps = {
    hints:{
        ready: "Press Play",
        memorize: "Memorize",
        recall: "Recall...",
        won:"You've won!",
        lost:"Game Over!"
    }
}
export default Footer;