import React, { Component } from 'react';
import Cell from './cell.js';
import Modal from './modalWindow.js'
import Options from './options.js'
import Statistics from './statistics.js'
import Pop from '../assets/pop.mp3'
import {
  createField,
  populateArray,
  adjustCounts,
  populateArrayByMap
} from '../js/mapFunctions/functions.js';

class Map extends Component {
  constructor(props) {
    super(props);
    let mapSize = 10;
    let bombCount = 10;
    this.state = {
      mapSize,
      bombCount,
      theMap: adjustCounts(populateArray(createField(mapSize, mapSize), '☀',
        bombCount),
        '☀'
      ),
      difficulty: 0,
      cellsClicked: 1,
      type: 1,
      isBombVisible: false,
      flagged: 0,
      startTime: Date.now(),
      volume: 0.1,
      isPlaying: false
    };
  }

  changeDifficulty(difficulty) {
    this.setState({ difficulty: difficulty,
      mapSize: difficulty * 10,
      bombCount: difficulty ** 2 * 10,
      theMap: adjustCounts(populateArray(createField(difficulty * 10, difficulty * 10), '☀',
        difficulty ** 2 * 10),
        '☀'
      ),
    });
    if (localStorage.getItem('map')) {
      const map = JSON.parse(localStorage.getItem('map'));
      if ((difficulty === 1 && Math.sqrt(map.length) === 10) ||
      (difficulty === 2 && Math.sqrt(map.length) === 20)) {
        this.setState({
          theMap: adjustCounts(populateArrayByMap(createField(difficulty * 10, difficulty * 10), '☀',
          map),
          '☀'
        ),
        })
      } else {
        localStorage.removeItem('mapClicked')
      }
    }
  }

  changeStyle(value) {
    this.setState({
      type: value
    })
  }

  incFlagged(value) {
    this.setState({
      flagged: this.state.flagged + value
    })
  }

  toggleBombs() {
    this.setState({
      isBombVisible: !this.state.isBombVisible
    })
  }

  handleCellsClicked() {
    let { mapSize, bombCount, cellsClicked } = this.state;
    let safeCells = mapSize * mapSize - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    const audio = new Audio(Pop);
    audio.volume = this.state.volume;
    if (!this.state.isPlaying)
      audio.play();
    this.setState({
      isPlaying: true
    })
    audio.addEventListener('ended', () => {
      this.setState({
        isPlaying: false
      })
    })
    if (cellsClicked >= safeCells) {
      let leaders = JSON.parse(localStorage.getItem('leaders'));
      if (!leaders)
        leaders = [];
      const name = prompt("Please enter your name, winner", "Winner winner chicken dinner!");
      leaders.push({key: leaders.length + 1, name: name, time: (Date.now() - this.state.startTime), difficulty: this.state.difficulty});
      localStorage.setItem('leaders', JSON.stringify(leaders));
    }

    if (safeCells % 5 === 0) {
      let arr = [];
      let arrClicked = [];
      for(let i = 0; i < this.state.mapSize; i += 1) {
        for(let j = 0; j < this.state.mapSize; j += 1) {
          if (document.getElementById(`${i}_${j}`)) {
            const elem = document.getElementById(`${i}_${j}`);
            arr.push(elem.classList.contains('bomb'));
            arrClicked.push(elem.classList.contains('clicked'));
          }
          if (document.getElementById(`${i}_${j}_`)) {
            const elem = document.getElementById(`${i}_${j}_`);
            arr.push(elem.classList.contains('bomb'));
            arrClicked.push(elem.classList.contains('clicked'));
          }
        }
      }
      localStorage.setItem('map', JSON.stringify(arr));
      localStorage.setItem('mapClicked', JSON.stringify(arrClicked));
    }
  }

  changeVolume(value) {
    if (this.state.volume <= 0.9 && this.state.volume >= 0.1) {
      const volume = this.state.volume + value;
      this.setState({
        volume: volume
      })
    }
  }

  getVolume() {
    return this.state.volume;
  }

  render() {
    let arrClicked = [];
    if (localStorage.getItem('mapClicked'))
      arrClicked = JSON.parse(localStorage.getItem('mapClicked'));
    return (
      <div className='App'>
        <Options
          typeChange={this.changeStyle.bind(this)}
          showBombs={this.toggleBombs.bind(this)}
          changeVolume={this.changeVolume.bind(this)}
          getVolume={this.getVolume.bind(this)}
        />
        <Modal click={this.changeDifficulty.bind(this)} />
        <table>
          <tbody>
            {this.state.theMap.map((item, row) => {
              return (
                <tr key={row} className='mapRow'>
                  {item.map((subitem, col) => {
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        clicked={() => {
                          if (this.state.difficulty !== 0)
                            return arrClicked[row * this.state.mapSize + col]
                        }}
                        type={this.state.type}
                        visible={this.state.isBombVisible}
                        flagBomb={this.incFlagged.bind(this)}
                        cellsClicked={this.handleCellsClicked.bind(this)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <Statistics mines={this.state.flagged} totalMines={this.state.bombCount}/>
      </div>
    )
  }
}

export default Map;
