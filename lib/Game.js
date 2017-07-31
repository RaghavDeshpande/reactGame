import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

import _ from "lodash";

class Game extends React.Component{
    constructor(props){
        super(props);
        this.matrix = [];
        this.loseTimer;
        this.memorizeTimer;
        this.recallTimer;
        for(let r = 0; r < this.props.rows; r++){
            let row = [];
            for(let c = 0; c < this.props.columns; c++){
                row.push(`${r}${c}`);
            }
            this.matrix.push(row);
        }
        let flatMatrix = _.flatten(this.matrix);
        this.activeCells = _.sampleSize(flatMatrix, this.props.activeCellCount);
        this.state = { gameState: "ready", wrongGusses: [], rightGuesses: [] , showButton: false, time: 2*this.props.columns};
        if(this.props.gameId > 1){
            this.startGame();
        }
    }
    calculateScore(){
        let score = this.state.rightGuesses.length;
        if(this.state.time >= this.props.columns){
            console.log( this.state.time );
            score*=2;
        }
        this.props.returnScore(score);
    }
    recordGuess({cellId, userGuessIsCorrect}){
        let { wrongGusses, rightGuesses } = this.state;
        if(userGuessIsCorrect){
            rightGuesses.push(cellId);
            if(rightGuesses.length === this.props.activeCellCount){
               this.setWin();
            }
        }
        else{
            wrongGusses.push(cellId);
            if(wrongGusses.length > (this.props.activeCellCount/ 2)){
                this.setLost() ;
            }
        }
        this.setState({ wrongGusses, rightGuesses });
    }
   startGame(){
       let memTime = (this.props.activeCellCount - 2 ) * 1000   ;
       this.memorizeTimer = setTimeout(()=> {
            this.setState({gameState:"memorize"},()=>{ 
                    this.recallTimer = setTimeout(()=> {
                         this.setState({gameState:"recall"}, this.startTimer() );  }, 
                memTime);
            });
        }, 500);
    }
    
    setWin(){
        clearInterval(this.loseTimer);
        this.setState({gameState:"won", showButton:true});
        this.calculateScore();
    }
    setLost(){
        clearInterval(this.loseTimer);
        this.setState({gameState: "lost", showButton:true});
        this.calculateScore();
    }
    startTimer(){
        this.loseTimer = setInterval(()=>{
            this.setState((prevState)=>{ return {time: prevState.time - 1}; } );
            if(this.state.time === 0){
                clearInterval(this.loseTimer);
                this.setLost();
            }
        }, 1000);
        
        
    }
    componentWillUnMount(){
        clearInterval(this.loseTimer);
        clearTimeout(this.memorizeTimer);
        clearTimeout(this.recallTimer);
    }
    
    render(){
        
        let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0;   
        return(
          
            <div className="grid">
                {
                    this.matrix.map((row, i)=>{
                        return(
                                <Row key={i}>
                                    { row.map(cellId =>
                                        <Cell 
                                            key={cellId} 
                                            id={cellId} 
                                            showActiveCells = {showActiveCells}
                                            activeCells={ this.activeCells} 
                                            recordGuess={this.recordGuess.bind(this)} 
                                            {...this.state} 
                                        />
                                    )}
                                 </Row>
                            );
                        }
                    )
                }
                <Footer {...this.state} activeCellCount={this.props.activeCellCount} handleClick={this.props.handleClick} startGame={this.startGame.bind(this)}  />
            </div>
           
        );
    }
}
export default Game;