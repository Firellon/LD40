import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import 'pixi'
import 'p2'
import Phaser from 'phaser'

//States
import BootState from '../states/Boot'
import GameState from '../states/Game'
import SplashState from '../states/Splash'

class Game extends Phaser.Game {
  constructor () {
    let width = 1280//document.documentElement.clientWidth
    let height = 720 //document.documentElement.clientHeight

    super(width, height, Phaser.AUTO, null, null);

    // this.socket = new Socketio()

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }

  removeGame () {
    this.destroy()
  }
}

export default class ReGame extends Component {
  constructor () {
    super()
    this.Game = new Game()
  }

  componentDidMount () {
    this.renderGame()
  }

  componentWillUpdate () {
    this.Game.removeGame()
  }

  componentDidUpdate () {
    this.Game = new Game()
    this.renderGame()
  }

  renderGame () {
    this.Game.parent = findDOMNode(this)
  }

  updateCanvas () {
    this.Game.removeGame()
    this.Game = new Game()
    this.renderGame()
  }

  render () {
    return (
      <div>
        <div id="game"></div>
        <button
          onClick={this.updateCanvas.bind(this)}
          className="btn"
          style={{margin: '5px'}}
        >
          Make update
        </button>
      </div>
    )
  }
}
