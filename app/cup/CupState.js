import _ from 'lodash'
import { observable, autorun, action } from 'mobx';


class CupStore{
	constructor() {
		this.difficulty = [
			{repeat:2, speed:.7},
			{repeat:3, speed:.6},
			{repeat:4, speed:.5},
			{repeat:5, speed:.4},
			{repeat:6, speed:.3},
			{repeat:7, speed:.2},
			{repeat:8, speed:.2},
			// {repeat:8, speed:.1},
		]
		this.scoreItem = {selection:{}}
		this.randomIdList()
	}



	@observable count = 0
	@observable idList = [0, 1, 2]
	@observable foodList = [{id:'apple', tartar:1}, {id:'cupcake', tartar:8}, {id:'donut', tartar:7}]
	@observable tartarList = []
	@observable difficultyIndex = 0
	@observable status = this.STATUS_SHUFFLE

	@action statusUpdate(newStatus) {
		this.status = newStatus
	}

	@action getCurentTarter() {
		return this.tartarList[this.tartarList.length-1]
	}

	@action randomIdList() {
		const pointA = _.random(0,2)
		let pointB

		do {
			pointB = _.random(0,2)
		}while(pointB === pointA)

		const dataA = {index:pointA, value:this.idList[pointA]}
		const dataB = {index:pointB, value:this.idList[pointB]}
		this.idList[dataA.index] = dataB.value
		this.idList[dataB.index] = dataA.value

		// this.idList = [1,0,2]
		// this.idList[dataB.index] = dataA.value

	}

	@action addTartar(foodItem) {
		// console.log(foodItem);
		if(foodItem.tartar>1) {
			this.difficultyEasier()
		}else{
			this.difficultyHarder()
		}
		this.tartarList.push(foodItem)
	}



	@action getDifficulty() {
		return this.difficulty[this.difficultyIndex]
	}

	@action difficultyHarder() {
		if(this.difficultyIndex < this.difficulty.length-1) {
			this.difficultyIndex++
		}
		const diff = this.difficulty[this.difficultyIndex]
		// console.log(diff);
	}

	@action difficultyEasier() {
		if(this.difficultyIndex > 0) {
			this.difficultyIndex--
		}
		const diff = this.difficulty[this.difficultyIndex]
		console.log(diff);
	}



	move(arr, old_index, new_index) {
	    while (old_index < 0) {
	        old_index += arr.length;
	    }
	    while (new_index < 0) {
	        new_index += arr.length;
	    }
	    if (new_index >= arr.length) {
	        var k = new_index - arr.length;
	        while ((k--) + 1) {
	            arr.push(undefined);
	        }
	    }
	    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	   return arr;
	}

}

CupStore.prototype.STATUS_SHUFFLE = 0
CupStore.prototype.STATUS_SHUFFLING = 1
CupStore.prototype.STATUS_SELECT = 2

export default new CupStore()