import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'

// import ButtonSelect from './ButtonSelect.js'



class CupItem extends Phaser.Group{
	constructor(index) {
		super(game, game.world, 'cup'+index)
		this.index = index
		this.w = game.cache.getImage('cup').width
		this.h = game.cache.getImage('cup').height

		this.repsonsive = {leftRight: 10, padding: 20, scale: 1}


		this.getScale()

		this.scale.set(this.repsonsive.scale)

		this.createCup()
		// this.createButton()

		this.inputEnabled = true;

		autorun( () => {
			this.prevData = this.id
			this.id = cupStore.idList[index]
			if(this.prevData !== undefined) {
				const direction = this.id - this.prevData
				if(direction!==0) {
					this.shift(direction)
				}
			}

			if(cupStore.status === cupStore.STATUS_SELECT) {
				this.cup.input.useHandCursor = true;
				this.cup.events.onInputDown.add(this.onSelect, this)
			}else {
				this.cup.events.onInputDown.remove(this.onSelect, this)
				this.cup.input.useHandCursor = false;
			}


		} )

		this.createFood()
		this.craeteText()

		this.cup.bringToTop()



		if(!this.prevData) {
			const pos = this.setPos(this.id)
			this.x = pos.x
			this.y = pos.y
		}
	}

	getScale() {
		let spaceAvailable = game.width - (this.repsonsive.leftRight * 2)
		let spaceUsed = (game.cache.getImage('cup').width + this.repsonsive.padding) * 3
		let spaceLeftOver
		if(spaceAvailable > spaceUsed) {
			this.repsonsive.leftRight = 0
			this.repsonsive.padding = 0
			spaceAvailable = game.width - (this.repsonsive.leftRight * 2)
			spaceUsed = (game.cache.getImage('cup').width + this.repsonsive.padding) * 3
			spaceLeftOver = spaceAvailable - spaceUsed
			this.repsonsive.scale = 1
			this.repsonsive.leftRight = spaceLeftOver * .25
			this.repsonsive.padding = spaceLeftOver * .25
		}else{
			spaceAvailable = game.width - (this.repsonsive.leftRight * 2)
			spaceUsed = (game.cache.getImage('cup').width + this.repsonsive.padding) * 3
			this.repsonsive.scale = spaceAvailable / spaceUsed
		}
	}

	shift(direction) {
		let paths = []
		let destination
		let cupWidth = this.width
		let yHeight = (30*this.scale.x) * direction

		destination = this.setPos(this.id)
		const dist = destination.x - this.x

		paths = [
			{x:this.x, y:this.y},
			{x:this.x+(dist/2), y:this.y+yHeight},
			{...destination},
		]

		const time = cupStore.getDifficulty().speed
		const me = this
		const scaleSize = yHeight > 0 ? this.scale.x*1.1 : this.scale.x*.9
		TweenMax.to(this, time, {bezier:{curviness: 2.5, type:"thru", values:paths}, ease:Sine.easeInOut, onUpdate:function(){
			me.parent.sort('y', Phaser.Group.SORT_ASCENDING);
		}})

		TweenMax.to(this.scale, time/2, {x:scaleSize, y:scaleSize, yoyo:true, repeat:1, ease:Sine.easeInOut})

	}

	onSelect() {

		if(cupStore.status === cupStore.STATUS_SELECT) {
			this.showHide()
			cupStore.addTartar(this.foodData)
			cupStore.statusUpdate(cupStore.STATUS_SHUFFLE)
		}
	}

	getEdge() {

	}



	showHide() {
		const tl = new TimelineMax()
		tl.to(this.cup, .3, {y:-160})
		tl.to(this.cup, .3, {y:0}, "+=.7")
		return tl
	}

	setPos(id) {
		const paddingRight = this.repsonsive.padding
		let x = this.repsonsive.leftRight
		x += ((this.w*this.scale.x) + paddingRight) * id

		return {x:x, y:game.height-(this.height*1.4)}
	}

	craeteText() {
		const text = game.add.text(this.w/2, this.h/2, this.index, {fill:'white', font:'88px Arial'})
		text.anchor.set(.5)
		text.alpha = 0
		this.add(text)
	}

	createCup() {
		this.cup = game.add.image(0, 0, 'cup')
		this.cup.inputEnabled = true
		// this.cup.alpha = .3

		this.add(this.cup)
	}

	createButton() {
		this.buttonSelect = new ButtonSelect(this.onSelect.bind(this))
		this.buttonSelect.alignTo(this.cup, Phaser.BOTTOM_CENTER, 0, 10)
		this.add(this.buttonSelect)
	}

	createFood() {
		this.foodData = cupStore.foodList[this.index]
		const food = game.add.image(0, 0, this.foodData.id)
		food.anchor.set(.5)
		food.x = this.w/2
		food.y = this.h - (food.height*.65)
		this.add(food)
	}

	// tween(id) {
	// 	const pos = this.setPos(id)
	// 	TweenMax.to(this, .85, pos)
	// }

	// render() {
	// 	console.log(Math.random());
	// }

	// create(x, y, data) {
	// 	console.log(this);
	// }

}

export default CupItem