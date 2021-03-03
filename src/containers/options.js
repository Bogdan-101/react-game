import React, { Component, useEffect, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom'
import Fullscreen from '../assets/fullscreen.svg';
import FullscreenExit from '../assets/fullscreen_exit.svg';
import PlayButton from '../assets/play_button.svg'
import Menu from '../assets/menu.svg'
import LeaderBoard from '../assets/leaderboard.svg'

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,
            isFullscreenHover: false,
            isPlayHover: false,
            isMenuOpen: false,
            isBombsVisible: false,
            isLeaderHover: false,
            isLeaderOpen: false
        }
    }
    
    goFullscreen() {
        this.state.isFullscreen ? document.webkitCancelFullScreen() : document.documentElement.requestFullscreen();
        this.setState({isFullscreen: !this.state.isFullscreen});
    }
    
    restartGame() {
        document.location.reload();
    }

    openMenu() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    openLeaderBoard() {
        this.setState({ isLeaderOpen: !this.state.isLeaderOpen });
    }

    leaderList() {
        const leaders = JSON.parse(localStorage.getItem('leaders'));
        return leaders ? leaders : 'No leaders yet!';
    }

    render() {
        const { typeChange, showBombs } = this.props;
        return(
            <div className='options'>
                <div>
                    <img
                        src={this.state.isFullscreen ? FullscreenExit : Fullscreen}
                        alt='fullscreen'
                        onClick={this.goFullscreen.bind(this)}
                        onMouseEnter={() => {
                            this.setState({ isFullscreenHover: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isFullscreenHover: false });
                        }}
                        className='fullscreen'/>
                    <p className={
                        this.state.isFullscreenHover ?
                            'fullscreen-text fullscreen-text-show' :
                            'fullscreen-text fullscreen-text-hide'
                    }>{this.state.isFullscreen ? 'Disable fullscreen' : 'Enable fullscreen'}</p>
                </div>
                <div>
                    <img
                        src={PlayButton}
                        alt='play again'
                        onClick={this.restartGame.bind(this)}
                        onMouseEnter={() => {
                            this.setState({ isPlayHover: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isPlayHover: false });
                        }}
                        className='playbutton'/>
                    <p className={
                        this.state.isPlayHover ?
                            'playbutton-text playbutton-text-show' :
                            'playbutton-text playbutton-text-hide'
                    }>Play again</p>
                </div>
                <div>
                    <img
                        src={Menu}
                        alt='menu'
                        onClick={this.openMenu.bind(this)}
                        onMouseEnter={() => {
                            this.setState({ isMenuHover: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isMenuHover: false });
                        }}
                        className='menu'/>
                    <p className={
                        this.state.isMenuHover ?
                            'menu-text menu-text-show' :
                            'menu-text menu-text-hide'
                    }>Menu</p>
                </div>
                <div>
                    <img
                        src={LeaderBoard}
                        alt='leaderboard'
                        onClick={this.openLeaderBoard.bind(this)}
                        onMouseEnter={() => {
                            this.setState({ isLeaderHover: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isLeaderHover: false });
                        }}
                        className='leaderboard'/>
                    <p className={
                        this.state.isLeaderHover ?
                            'leaderboard-text leaderboard-text-show' :
                            'leaderboard-text leaderboard-text-hide'
                    }>Leader Board</p>
                </div>
                <div className={this.state.isMenuOpen ? 'menuWindow menuWindow-open' : 'menuWindow menuWindow-hidden'}>
                    <h5>MENU</h5>
                    <button className='changeButton' onClick={(() => {
                        typeChange(1)
                        })}>
                        Change colours to type 1
                    </button>
                    <button className='changeButton' onClick={(() => {
                        typeChange(2)
                        })}>
                        Change colours to type 2
                    </button>
                    <button className='changeButton' onClick={(() => {
                        typeChange(3)
                        })}>
                        Change colours to type 3
                    </button>
                    <br></br>
                    <button className='changeButton' onClick={(() => {
                        showBombs()
                        this.setState({
                            isBombsVisible: !this.state.isBombsVisible
                        })
                        })}>
                        {this.state.isBombsVisible ? 'Hide bombs' : 'Show Bombs'}
                    </button>
                </div>
                <div className={
                    this.state.isLeaderOpen ?
                    'leaderWindow leaderWindow-open' :
                    'leaderWindow leaderWindow-hidden'
                }>
                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time&nbsp;&nbsp;&nbsp;Difficulty
                    <br></br>
                    {typeof(this.leaderList()) === 'string' ? this.leaderList() : 
                        this.leaderList().map((elem) => {
                            return (
                            <div className='leader'>
                                {elem.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {Math.floor(elem.time / 1000 / 60)}m:{Math.floor(elem.time / 1000)}s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {elem.difficulty}</div>
                            )
                    })}
                </div>
            </div>
        )
    }
}

export default Options;
