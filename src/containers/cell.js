import React, { Component } from 'react';
import classNames from 'classnames';

let endMineSweeperGame = false;

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, flag: '' };
  }

  handleContextMenu(e) {
    e.preventDefault();
    let { clicked, flag } = this.state;
    if (!clicked) {
      flag ? this.setState({ flag: '' }) : this.setState({ flag: '⚑' });
    }
  }

  handleClick({ target }) {
    let { row, column, cellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (!flag) this.setState({ clicked: true });
    if (!clicked) cellsClicked();
    if (!endMineSweeperGame) {
      if (value === '' && target.id === `${row}_${column}`)
        recursionClick(target, row, column);
      if ((value) === '☀' && !flag) endGame(target);
    }
  }

  render() {
    let { row, column, value, type } = this.props;
    let { clicked, flag } = this.state;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === '☀',
    });
    cellsClass += ` cell${type}`;
    if (clicked)
      cellsClass += ` clicked${type}`;
    return (
      <td
        id={`${row}_${column}`}
        className={cellsClass}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {clicked && !flag ? value : ''}
        {flag}
      </td>
    );
  }
}

function recursionClick(target, row, column) {
  target.id = `${row}_${column}_`;
  let rowList = [row - 1, row, row + 1];
  let colList = [column - 1, column, column + 1];
  for (let i of rowList) {
    for (let j of colList) {
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      });
    }
  }
  return;
}

function endGame(target) {
  endMineSweeperGame = true;
  target.style.backgroundColor = 'black';
  let cols = target.parentElement.children.length;
  let rows = target.parentElement.parentElement.children.length;
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (document.getElementById(`${i}_${j}`))
        document.getElementById(`${i}_${j}`).click();
    }
  }
  return;
}

export default Cell;
