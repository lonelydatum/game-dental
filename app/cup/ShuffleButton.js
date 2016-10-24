
//custom object that dispatch a `started` signal



class ShuffleButton extends Phaser.Group {
	constructor() {
		super(game, game.world, 'ShuffleButton')

		this.holler = {
		  clicked : new signals.Signal()
		};



		this.image = game.add.image(0, 0, 'shuffle');
		this.image.inputEnabled = true;
		this.image.events.onInputDown.add(this.onClicked, this);

		this.image.anchor.set(.5)
		this.image.input.useHandCursor = true;
		this.add(this.image)

		this.text = game.add.text(0,0,'SHUFFLE', {fill:'#d24c9b', font:'20px Archivo Black'})
		this.text.anchor.set(.5)
		this.add(this.text)

		this.x = game.world.centerX
		this.y = 250


		this.scale.set(0)



	}

	onClicked() {
		this.hide()
	}

	hide() {
		TweenMax.to(this.scale, .2, {x:0, y:0, alpha:0, ease:Power2.easeOut,  onComplete:this.holler.clicked.dispatch})
	}

	show(delay=2) {
		TweenMax.to(this.scale, .5, {x:1, y:1, alpha:1, ease:Back.easeOut, delay, onComplete:this.spin.bind(this)})
	}

	spin() {
		TweenMax.to(this.image, 1.5, {rotation: Math.PI, yoyo:true, repeat:2, repeatDelay:.5, ease:Back.easeOut, delay:.5})
	}
}

export default ShuffleButton