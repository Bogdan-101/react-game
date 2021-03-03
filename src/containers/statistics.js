import React from 'react'

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: Date.now(),
            timePlaying: 0,
            totalMines: this.props.totalMines,
            mines: 0,
            isLeader: false
        };
        setInterval(() => {
            this.setState({
                timePlaying: Date.now() - this.state.startTime
            })
        })
    }

    toggleLeaderboard() {
        this.setState({
            isLeader: !this.state.isLeader
        })
    }

    render() {
        const { timePlaying } = this.state;
        const { mines, totalMines } = this.props;
        return(
            <div className='statistics'>
                <div>Time: {Math.floor(timePlaying / 1000 / 60)}m {Math.floor(timePlaying / 1000) % 60}s</div>
                <div>Bomb count: {mines}/{totalMines % 60}</div>
            </div>
        )
    }
}

export default Statistics;