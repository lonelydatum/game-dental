// import { observable, autorun } from 'mobx';
// import cupStore from './CupState.js'


// class ButtonSelect extends Phaser.Group{

// 	constructor() {
// 		super(game, game.world, 'button')

// 		this.holler = {
// 		  clicked : new signals.Signal()
// 		};

// 		// this.callBack = callBack

// 		this.arrow = game.add.image(0, 0, 'pick');
// 		this.arrow.inputEnabled = true;
// 		this.arrow.events.onInputDown.add(this.onClicked, this);

// 		// var text = game.add.text(0, 0, 'Select', {font:'11px Arial', color: '#000000'});
// 		this.add(this.arrow)
// 		// this.add(text)
// 		this.name = 'buttt'

// 		// text.alignTo(buttonBG, Phaser.TOP_CENTER, 0, -23)
// 		// text.y = 3

// 	}

// 	onClicked() {
// 		this.holler.clicked.dispatch()
// 	}

// 	hide() {
// 		// this.visible = false
// 	}

// 	show() {
// 		// this.visible = true
// 	}

// }

// export default ButtonSelect