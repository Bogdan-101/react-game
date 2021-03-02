import React, { Component } from 'react';
import classNames from 'classnames';
import Fullscreen from '../assets/fullscreen.svg';
import FullscreenExit from '../assets/fullscreen_exit.svg';

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false
        }
        console.log(Fullscreen)
    }

    goFullscreen() {
        this.state.isFullscreen ? document.webkitCancelFullScreen() : document.documentElement.requestFullscreen();
        this.setState({isFullscreen: !this.state.isFullscreen});
    }

    render() {
        return(
            <div className='options'>
                <img src={this.state.isFullscreen ? FullscreenExit : Fullscreen} alt='fulllscreen' onClick={this.goFullscreen.bind(this)}/>
            </div>
        )
    }
}

export default Options;
