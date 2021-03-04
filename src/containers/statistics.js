import React from 'react'

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: 0,
            totalMines: this.props.totalMines,
            mines: 0,
            isLeader: false
        };
        setInterval(() => {
            this.forceUpdate()
            console.log('1')
        }, 1000)
    }

    toggleLeaderboard() {
        this.setState({
            isLeader: !this.state.isLeader
        })
    }

    render() {
        const { mines, totalMines, startTime } = this.props;
        let timePlaying;
        let timeMessage = ''
        if (startTime !== 0)
            timePlaying = (Date.now() - startTime);
        else
            timeMessage = 'Pick difficulty to start!';
        return(
            <div className='statistics'>
                <div>Time: {Number.isNaN(timePlaying / 1000) ? '0' : Math.floor(timePlaying / 1000 / 60)}m
                {Number.isNaN(timePlaying) ? '0' : Math.floor(timePlaying / 1000) % 60}s</div>
                <div>Bomb count: {mines}/{totalMines % 60}</div>
            </div>
        )
    }
}

export default Statistics;