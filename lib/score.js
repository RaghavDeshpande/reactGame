class Score extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <table  className="score">
                <thead>
                    <tr>
                        <td>Game</td>
                        <td>Score</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.gameNumber.map((num, index)=>{
                            return (<tr key={"tr"+num}><td>{num}</td><td>{this.props.totalScore[index]}</td></tr>);
                        })
                    }
                </tbody>
            </table>
        )
    }
}
export default Score;