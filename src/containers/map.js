import React, { Component } from 'react';
import Cell from './cell.js';
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
      cellsClicked: 1
    };
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
      <div>
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
