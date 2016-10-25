import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'

import PlayAgain from './PlayAgain.js'
import CupItem from './CupItem.js'
import CupScore from './CupScore.js'
import Cat from './Cat.js'
import ShuffleButton from './ShuffleButton.js'
import _ from 'lodash'

class Cup {
	constructor() {
		this.cupList = []


		const table = game.add.sprite(0, 0, 'table')
		table.scale.set(1)
		table.anchor.set(.5)
		table.x = game.world.centerX
		table.y = 1100

		const playAgain = new PlayAgain()
		playAgain.reset.add(this.reset.bind(this))


		const shuffleButton = new ShuffleButton()
		shuffleButton.holler.clicked.add( this.selected.bind(this) )

		this.createScore()
		this.createCups()


		window.game.stage.backgroundColor = "#FFFFFF";
		autorun( () => {
			console.log(cupStore.status);
			if(cupStore.status === cupStore.STATUS_SHUFFLE) {
				shuffleButton.show()
			}


			if(cupStore.tartarList.length>3) {
				console.log('show');
				playAgain.show()
				shuffleButton.visible = false
			}
		} )

		this.cat = new Cat()

	}

	reset() {
		this.score.reset()
		cupStore.playAgain()
	}

	selected() {

		cupStore.statusUpdate(cupStore.STATUS_SHUFFLING)
		const tl = new TimelineMax({onComplete: this.onCompleteShuffle})
		this.cupList.forEach((cupItem) => {
			tl.add(cupItem.showHide(), (cupItem.id*.2)+.5)
		})
		tl.add(this.shuffle())

		if(cupStore.getDifficulty().speed <= .6) {
			TweenMax.delayedCall(_.random(1.8,3), this.cat.random.bind(this.cat))
		}
	}

	createScore() {
		this.score = new CupScore()
	}

	shuffle() {
		const tl = new TimelineMax( {repeat:cupStore.getDifficulty().repeat} )
		tl.add( () => {
			cupStore.randomIdList()
		}, `+=${(cupStore.getDifficulty().speed)+.1}` )
		return tl
	}

	onCompleteShuffle() {
		TweenMax.delayedCall(1, ()=>{
			cupStore.statusUpdate(cupStore.STATUS_SELECT)
		})
	}

	createCups() {
		this.cupGroup = game.add.group();
		this.cupList = cupStore.idList.map((dataItem, index) => {
			const cupItem = new CupItem(index)
			this.cupGroup.add(cupItem)
			return cupItem
		})
	}
}



export default Cup
