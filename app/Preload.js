

function loadUser(user) {
	return {
		cup: `images/users/${user}/cup.png`,
		apple: `images/users/${user}/apple.png`,
		cupcake: `images/users/${user}/cupcake.png`,
		donut: `images/users/${user}/donut.png`
	}
}

// window.WebFontConfig = {

//     //  'active' means all requested fonts have finished loading
//     //  We set a 1 second delay before calling 'createText'.
//     //  For some reason if we don't the browser cannot render the text the first time it's created.
//     active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

//     //  The Google Fonts we want to load (specify as many as you like in the array)
//     google: {
//       families: ['Archivo']
//     }

// };

export default function () {
	const user = loadUser('gar')
	game.load.image('shuffle', 'images/buttons/shuffle.png');
	game.load.image('pick', 'images/buttons/pick.png');

	game.load.image('table', 'images/table.jpg');
	game.load.image('cup', user.cup);

	game.load.image('apple', user.apple);
	game.load.image('cupcake', user.cupcake);
	game.load.image('donut', user.donut);

	game.load.image('tooth-default', 'images/teeth/tooth-default.png');
	game.load.image('tooth-good', 'images/teeth/tooth-good.png');
	game.load.image('tooth-bad', 'images/teeth/tooth-bad.png');
	game.load.image('cat', 'images/cat.png');



	// game.load.script('webfont', '//fonts.googleapis.com/css?family=Archivo+Black');


}

