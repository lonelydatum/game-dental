import { observable, autorun } from 'mobx';
import cupStore from './CupState.js'
import ToothScore from './ToothScore.js'
import _ from 'lodash'

class Score extends Phaser.Group{

	constructor() {
		super(game, game.world, 'score')
		this.createToothGroup()

		autorun(() => {
			cupStore.tartarList
			let sum = 0
			cupStore.tartarList.map((item) => {
				sum += item.tartar
			})
		})
	}

	// createText() {
	// 	this.text = game.add.text(0, 0, 'dd', {fill:'#FF0000'})
	// 	this.add(this.text)
	// 	this.teeth.anchor.set(.5)
	// 	this.teeth.x = game.world.centerX
	// 	this.teeth.y = 200
	// }



	createToothGroup() {
		this.toothGroup = game.add.group();
		const toothWidth = ( game.cache.getImage('tooth-default').width + 5)

		for(var i=0;i<10;i++) {
			const tooth = new ToothScore(i)
			tooth.x = i * toothWidth
			this.toothGroup.add(tooth)
		}

		this.toothGroup.y = 80

		let scaleX = .5



		let padding = (game.width - this.toothGroup.width) / 2
		let scaleTo = 1
		if(this.toothGroup.width > game.width) {
			padding = 20
			const w = this.toothGroup.width + (padding*2)
			scaleTo = game.width / w
		}

		this.toothGroup.scale.set(scaleTo)
		this.toothGroup.x = padding * scaleTo



	}

	reset() {
		this.toothGroup.children.map((item) => {
			item.reset()
		})
	}


	updateScore(score) {
		this.text.text = score
	}



}

export default Score