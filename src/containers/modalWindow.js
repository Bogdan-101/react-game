import react, { Component } from 'react'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 0
        }
    }

    render() {
        let classname = 'modal-background' + (this.state.difficulty === 0 ? ' modalBlock' : ' modalNone');
        const { click } = this.props;
        return(
            <div className={classname}>
                <div className='modal'>
                    <h5>Choose difficulty:</h5>
                    <button className='modalButton' onClick={(() => {
                        this.setState({ difficulty: 1});
                        click(1);
                    })}>Easy mode</button>
                    <button className='modalButton' onClick={(() => {
                        this.setState({ difficulty: 2 });
                        click(2);
                    })}>Medium mode</button>
                </div>
            </div>
        );
    }
}

export default Modal;
