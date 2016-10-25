import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'

class PlayAgain extends Phaser.Group {
	constructor() {
		super(game, game.world, 'PlayAgain')




		this.reset = new signals.Signal()

		const text = game.add.text(0,0,'Play Again', {fill:'#d24c9b', font:'35px Archivo Black'})
		this.add(text)
		text.anchor.set(.5)

		text.inputEnabled = true;
		text.events.onInputDown.add(this.onClicked, this);

		this.x = game.world.centerX
		this.y = 250

		this.visible = false
	}

	show() {
		this.visible = true
		// TweenMax.from(this, .5, {alpha:0})

	}

	onClicked() {
		this.visible = false
		this.reset.dispatch()

	}

}

export default PlayAgain