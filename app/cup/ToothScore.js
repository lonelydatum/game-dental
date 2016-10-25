import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'

class ToothScore extends Phaser.Group {
	constructor(index) {
		super(game, game.world, 'toothScore')

		this.index = index

		this.normal = game.add.image(0, 0, 'tooth-default')
		// this.good = game.add.image(0, 0, 'tooth-good')
		// this.bad = game.add.image(0, 0, 'tooth-bad')
		this.add(this.normal)
		// this.add(this.good)
		// this.add(this.bad)

		this.alpha = .1
		autorun(() => {
			// console.log(cupStore.tartarList.length);
			this.check()
		})
	}

	reset() {
		console.log(this);
		if(this.image) {
			this.image.destroy()
		}

		if(this.msk) {
			this.msk.destroy()
		}

		this.alpha = .1

	}

	check() {
		const lastIndex = cupStore.tartarList.length-1

		const last = cupStore.tartarList[lastIndex]




		if(this.index === lastIndex) {

			if(last) {
				let goodBad = (last.tartar>1) ? 'bad' : 'good'
				this.image = game.add.image(0, 0, `tooth-${goodBad}`)
				const tl = new TimelineMax()
				tl.to(this, .3, {alpha:1})


				this.add(this.image)

				if(goodBad==='bad') {
					this.msk = game.add.graphics(0,0)
					this.msk.beginFill(0xFFFFFF)
					this.msk.drawRect(0,0, this.image.width, this.image.height )
					TweenMax.to(this.msk, .5, {height:0, ease:Sine.easeOut, y:this.image.height})
					this.add(this.msk)
				}else if(goodBad==='good') {
					tl.to(this, .3, {y:'-=20', ease:Back.easeOut, yoyo:true, repeat:5}, "+=1")

				}
			}
		}








	}


}

export default ToothScore