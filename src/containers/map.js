import React, { Component } from 'react';
import Cell from './cell.js';
import Modal from './modalWindow.js'
import Options from './options.js'
import Statistics from './statistics.js'
import {
  createField,
  populateArray,
  adjustCounts
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
      startTime: Date.now()
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
    if (cellsClicked >= safeCells) {
      let leaders = JSON.parse(localStorage.getItem('leaders'));
      console.log(leaders);
      if (!leaders)
        leaders = [];
      leaders.push({key: leaders.length + 1, name: 'Test', time: (Date.now() - this.state.startTime), difficulty: this.state.difficulty});
      localStorage.setItem('leaders', JSON.stringify(leaders));
      alert('*** You have won! ***');
    } 
  }

  render() {
    console.log(this.state.flagged)
    return (
      <div className='App'>
        <Options
          typeChange={this.changeStyle.bind(this)}
          showBombs={this.toggleBombs.bind(this)}
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
