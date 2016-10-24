import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'
import _ from 'lodash'

class Cat extends Phaser.Sprite {
	constructor() {
		super(game,  0 , 0, 'cat')

		game.stage.addChild(this)

		this.tw =  {
			yoyo:true,
			repeat:1,
			ease:Back.easeOut,
			repeatDelay:.5
		}



		this.speed = .3

		this.anchor.set(.5, 0)

		this.visible = false;

	}

	random() {
		this.visible = true;
		this.tl = new TimelineMax()
		const list = [this.top, this.right, this.left]
		const index = _.random(0, 2)

		list[index].call(this)
	}

	show() {



		this.right()
		this.left()

	}

	top() {

		this.tl.set(this, {rotation:Math.PI, x:game.world.centerX, y:0})
		this.tl.to(this, this.speed, {...this.tw, y:this.height})
	}

	left() {

		this.tl.set(this, {rotation:Math.PI / 2, x:0, y:game.world.centerY * .5})
		this.tl.to(this, this.speed,{...this.tw, x:this.height}, "+=1")
	}

	right() {

		this.tl.set(this, {rotation:-Math.PI / 2, x:game.width, y:game.world.centerY * .5})
		this.tl.to(this, this.speed,{...this.tw, x:game.width-this.height}, "+=1")
	}




}

export default Cat