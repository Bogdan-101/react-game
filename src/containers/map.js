import React, { Component } from 'react';
import Cell from './cell.js';
import Modal from './modalWindow.js'
import Options from './options.js'
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
      type: 1
    };
  }

  changeDifficulty(difficulty) {
    this.setState({ difficulty: difficulty,
      mapSize: difficulty * 10,
      bombCount: difficulty * 10,
      theMap: adjustCounts(populateArray(createField(difficulty * 10, difficulty * 10), '☀',
        difficulty ** 2 * 10),
        '☀'
      ),
    });
  }

  changeStyle(value) {
    this.setState({ type: value })
  }

  handleCellsClicked() {
    let { mapSize, bombCount, cellsClicked } = this.state;
    let safeCells = mapSize * mapSize - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    if (cellsClicked >= safeCells) alert('*** You have won! ***');
  }

  render() {
    return (
      <div className='App'>
        <Options typeChange={this.changeStyle.bind(this)}/>
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
                        cellsClicked={this.handleCellsClicked.bind(this)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Map;
