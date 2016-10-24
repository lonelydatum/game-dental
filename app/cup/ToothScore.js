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
			this.check()
		})
	}

	check() {
		const lastIndex = cupStore.tartarList.length-1

		const last = cupStore.tartarList[lastIndex]



		if(this.index === lastIndex) {

			if(last) {
				let goodBad = (last.tartar>1) ? 'bad' : 'good'
				const image = game.add.image(0, 0, `tooth-${goodBad}`)
				const tl = new TimelineMax()
				tl.to(this, .3, {alpha:1})


				this.add(image)

				if(goodBad==='bad') {
					const msk = game.add.graphics(0,0)

					msk.beginFill(0xFFFFFF)

					msk.drawRect(0,0, image.width, image.height )
					// msk.anchor.set(.5, 1)
					TweenMax.to(msk, .5, {height:0, ease:Sine.easeOut, y:image.height})
					this.add(msk)
				}else if(goodBad==='good') {
					// tl.from(image, .5, {alpha:0, delay:1})
					tl.to(this, .3, {y:'-=20', ease:Back.easeOut, yoyo:true, repeat:5}, "+=1")

				}
			}
		}


	}


}

export default ToothScore