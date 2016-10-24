

function loadUser(user) {
	return {
		cup: `images/users/${user}/cup.png`,
		apple: `images/users/${user}/apple.png`,
		cupcake: `images/users/${user}/cupcake.png`,
		donut: `images/users/${user}/donut.png`
	}
}

export default function () {
	const user = loadUser('eliot')
	 // game.load.spritesheet('button', 'images/buttons/button_sprite_sheet.png', 193, 71);
	 game.load.image('shuffle', 'images/buttons/shuffle.png');
	 game.load.image('pick', 'images/buttons/pick.png');
	 // game.load.spritesheet('flixel-button', 'images/buttons/flixel-button.png', 80, 60/3);
	 game.load.image('table', 'images/table.jpg');
	 game.load.image('cup', user.cup);

	 game.load.image('apple', user.apple);
	 game.load.image('cupcake', user.cupcake);
	 game.load.image('donut', user.donut);

	 game.load.image('tooth-default', 'images/teeth/tooth-default.png');
	 game.load.image('tooth-good', 'images/teeth/tooth-good.png');
	 game.load.image('tooth-bad', 'images/teeth/tooth-bad.png');
	 game.load.image('cat', 'images/cat.png');


}

