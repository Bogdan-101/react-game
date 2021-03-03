import React, { Component, useEffect, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom'
import Fullscreen from '../assets/fullscreen.svg';
import FullscreenExit from '../assets/fullscreen_exit.svg';
import PlayButton from '../assets/play_button.svg'
import Menu from '../assets/menu.svg'

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,
            isFullscreenHover: false,
            isPlayHover: false,
            isMenuOpen: false
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

    render() {
        const { typeChange } = this.props;
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
                <div className={this.state.isMenuOpen ? 'menuWindow menuWindow-open' : 'menuWindow menuWindow-hidden'}>
                    <h5>MENU</h5>
                    <button onClick={(() => {
                        typeChange(1)
                        })}>
                        Change colours to type 1
                    </button>
                    <button onClick={(() => {
                        typeChange(2)
                        })}>
                        Change colours to type 2
                    </button>
                    <button onClick={(() => {
                        typeChange(3)
                        })}>
                        Change colours to type 3
                    </button>
                </div>
            </div>
        )
    }
}

export default Options;
