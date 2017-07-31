import Game from "./Game";
import Score from "./score";
class Container extends React.Component{
    constructor(props){
        super(props);
        this.data={
            rows:5,
            columns:5,
            activeCellCount:4
        }
        this.state = { gameId:1 , gameNumber:[], totalScore:[]};
    }
    handleClick(){
        this.setState((prevState)=>{return {gameId: prevState.gameId + 1}} );
        
    }
    
    returnScore(score){
        let {gameNumber, totalScore} = this.state;
        gameNumber.push(this.state.gameId);
        totalScore.push(score);
        this.setState({gameNumber, totalScore});
    }
    increaseDifficulty(){
        let maxScore = this.data.activeCellCount * 2;
        let {totalScore} = this.state;
        if(totalScore.indexOf(maxScore) != totalScore.lastIndexOf(maxScore)){
            if(this.data.rows < this.data.activeCellCount){
                this.data.activeCellCount+=1;
            }
            else{
                this.data.rows += 1;
                this.data.columns+=1;
                this.data.activeCellCount = this.data.columns+1;
            }
        }
    }
    render(){
        this.increaseDifficulty();
        return (
            
                
                <div className="game-container"> 
                    <Game  ref="grid" key={this.state.gameId } gameId={this.state.gameId} {...this.data} handleClick={this.handleClick.bind(this)} returnScore = {this.returnScore.bind(this)} />
                    <Score  {...this.state} />  
                </div>
            
        )
    }
}
export default Container;