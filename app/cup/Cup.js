import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'

import CupItem from './CupItem.js'
import CupScore from './CupScore.js'
import Cat from './Cat.js'
import ShuffleButton from './ShuffleButton.js'
import _ from 'lodash'

class Cup {
	constructor() {
		this.cupList = []


		const table = game.add.sprite(0, 0, 'table')
		table.scale.set(.8)
		table.anchor.set(.5)
		table.x = game.world.centerX
		table.y = 1000


		const shuffleButton = new ShuffleButton()
		shuffleButton.holler.clicked.add( this.selected.bind(this) )

		this.createScore()
		this.createCups()



		// var button = game.add.button(0, 0, 'shuffle', this.selected, this, 2, 1, 0);

		window.game.stage.backgroundColor = "#FFFFFF";
		autorun( () => {

			if(cupStore.status === cupStore.STATUS_SHUFFLE) {
				shuffleButton.show()
			}else {
			}
		} )

		this.cat = new Cat()

		// game.add.sprite(cat)


	}

	selected() {

		cupStore.statusUpdate(cupStore.STATUS_SHUFFLING)
		const tl = new TimelineMax({onComplete: this.onCompleteShuffle})
		this.cupList.forEach((cupItem) => {
			tl.add(cupItem.showHide(), (cupItem.id*.2)+.5)
		})
		tl.add(this.shuffle())

		if(cupStore.getDifficulty().speed <= .6) {
			TweenMax.delayedCall(_.random(2.5,4), this.cat.random.bind(this.cat))


		}
	}

	createScore() {
		new CupScore()
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
