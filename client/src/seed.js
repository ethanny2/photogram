/* First user is me; has uuid because I created from firebase dashboard
 Seeds 4 users, 5 photos for userID 2 with the same generated comments.
 Collections are created when we define them firebase.firestore().collection('string')
*/

export function seedDatabase(firebase) {
	// https://igfonts.info/captions.html
	const randomCaptions = [
		'No matter what happens, pizza will always be there for you. Through thick and thin, in crust we trust.',
		'Where can I download motivation',
		'I’m not lazy, I’m on energy saving mode',
		'I am too full of life to be half loved',
		'Escape the ordinary',
		'Don’t trust everything you see, even salt looks like sugar',
		'I’m not an organ donor but I’d happily give you my heart',
		'Have you got the time? Oh, I thought you said, “Have you got the wine?”',
		'We go together like eyebrows',
		'First I drink coffee, then I do the things',
		'You, me & a cup of tea',
		'I love you berry much',
		'I ain’t worried',
		'I’m here for a good time not a long time',
		'Take it or leave it...',
		'I eat cake because it’s somebody’s birthday somewhere',
		'Young, broke & fabulous',
		'The fine line between love and hate is one negative comment about my dog',
		'What’s your favorite comfort food?',
		'I prefer my puns intended',
		'Be a voice, not an echo',
		'A champion is someone who gets up when he can’t',
		'The best views come after the hardest climbs',
		'I just shouldn’t be allowed to make decisions anymore',
		'Failure defeats losers. Failure inspires winners. -Robert T. Kiyosaki',
		'The human body is 90% water so we’re basically just cucumbers with anxiety',
		'Extra fries? Oh, you said exercise…',
		'Did it for the memories',
		'What a legend',
		'Sending this selfie to NASA because I’m a star',
		'If it’s not impossible there must be a way to do it. -Sir Nicholas Winton',
		'Life is 10% what happens to you and 90% how you react to it. -Dr. Charles Swindle',
		'You don’t have to go fast, you just have to go',
		'When you feel like quitting think about why you started -Zig Ziglar',
		'You’re alive but are you living?'
	];

	// 3 for each seeded user should give 30 new photos
	const randomImages = [
		'https://randomwordgenerator.com/img/picture-generator/odd-socks-4424190_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/57e8d5444f53a414f1dc8460962e33791c3ad6e04e50744172287ed2914fc7_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/valentin-salja-vh7RmF-NjMc-unsplash.jpg',
		'https://randomwordgenerator.com/img/picture-generator/53e1dc454c5aa414f1dc8460962e33791c3ad6e04e507440752b7edc9749c7_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/53e0d247495aa514f1dc8460962e33791c3ad6e04e50744172277fd79748c3_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/5fe4d2444b51b10ff3d8992cc12c30771037dbf85257714b7d267adc974b_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/52e6dd41485ab10ff3d8992cc12c30771037dbf85254794e732a7cd5934c_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/57e0d1424e50ac14f1dc8460962e33791c3ad6e04e507441722872d79644c7_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/55e6d1444f50ae14f1dc8460962e33791c3ad6e04e50744074267bd69f49c4_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/57e9dd474952a414f1dc8460962e33791c3ad6e04e5074417d2e72d6944cc1_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/54e3d5434d53af14f1dc8460962e33791c3ad6e04e507749712a72dd9345c2_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/57e3d5404955a514f1dc8460962e33791c3ad6e04e507441722978d6934cc3_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/57e8d04a4f4faa0df7c5d57bc32f3e7b1d3ac3e456587248772b78d795_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/54e0dc404e53b10ff3d8992cc12c30771037dbf85254794e732f7ad2964a_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/54e6d34b4c53ab14f1dc8460962e33791c3ad6e04e507749772f79dd9f4bcc_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/55e1d7464c55ac14f1dc8460962e33791c3ad6e04e50744074267bd6934fc2_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/51e8dd454957b10ff3d8992cc12c30771037dbf85254784b772872dc9144_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/55e0d1464d52aa14f1dc8460962e33791c3ad6e04e507441722a72dc9244c4_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/55e2d7424d55ab14f1dc8460962e33791c3ad6e04e507441722978d6944cc4_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/54e2d0414d4faa0df7c5d57bc32f3e7b1d3ac3e45659764f722d73d790_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/53e3d4424d50ab14f1dc8460962e33791c3ad6e04e507440762e7ad39045c7_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/53e8d44b4253b10ff3d8992cc12c30771037dbf85254784e77267ed69649_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/55e3d1424856a914f1dc8460962e33791c3ad6e04e50744172287ad29645c2_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/52e7d6464253ae14f1dc8460962e33791c3ad6e04e5074417d2e72dc904fcd_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/52e3d64a4850ab14f1dc8460962e33791c3ad6e04e5077497c2a7cd49149cc_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/51e0d7444b4faa0df7c5d57bc32f3e7b1d3ac3e456587248772b7ad292_640.jpg',
		'https://randomwordgenerator.com/img/picture-generator/52e4dd4b4f57ae14f1dc8460962e33791c3ad6e04e50744172287edc9445c4_640.jpg',
		'http://assets.vg247.com/current//2015/05/deus_ex_human_revolution.jpg',
		'https://pm1.narvii.com/6305/ec0d831c1a98024e6529f35daae1e0224f229aac_hq.jpg',
		'https://www.senseitoy.com/image/catalog/tenhigh/th002-zoro/tenhigh_roronoa_zoro_shishi_sonson.jpg',
		'https://site-cdn.givemesport.com/images/20/06/23/aa4f938dcdf8bbfd01dd07b91d614754/960.jpg'
	];

	console.log('SEEDING FIREBASE!!!!!');
	const users = [
		// {
		// 	userId: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
		// 	username: 'ethanny2',
		// 	fullName: 'Ethan Soo Hon',
		// 	emailAddress: 'ethanny2@gmail.com',
		// 	following: ['2'],
		// 	followers: ['2', '3', '4'],
		// 	dateCreated: Date.now()
		// },
		{
			userId: '5',
			username: 'Gjensen',
			fullName: 'Gary Jensen',
			emailAddress: 'garyJensen@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/lego/3.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '6',
			username: 'abbyJarvis',
			fullName: 'Abbigail Jarvis',
			emailAddress: 'abbyJ@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/women/11.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '7',
			username: 'Monet',
			fullName: 'Monet Lam',
			emailAddress: 'Monetlam@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/women/58.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '8',
			username: 'debra',
			fullName: 'Debra Stott',
			emailAddress: 'stottbot@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/women/8.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '9',
			username: 'cobby',
			fullName: 'Loren Cobb',
			emailAddress: 'cobby@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/women/48.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '10',
			username: 'stuartLittle',
			fullName: 'Stuart Dominguez',
			emailAddress: 'dominguez@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/lego/2.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '11',
			username: 'seanKing',
			fullName: 'Kingston Cochran',
			emailAddress: 'kingston@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/lego/1.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '12',
			username: 'kylie11',
			fullName: 'Kylie Fellows',
			emailAddress: 'kylie11@yahoo.com',
			following: [],
			followers: [],
			profilePic: 'https://randomuser.me/api/portraits/women/88.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '13',
			username: 'luffy',
			fullName: 'Monkey D. Luffy',
			emailAddress: 'luffy@yahoo.com',
			following: [],
			followers: [],
			profilePic:
				'https://cdn.myanimelist.net/s/common/uploaded_files/1476654277-5fda2b108ca99a7715d73955442cacc2.jpeg',
			dateCreated: Date.now()
		},
		{
			userId: '14',
			username: 'adamjensen',
			fullName: 'Adam Jensen',
			emailAddress: 'adamJensen@yahoo.com',
			following: [],
			followers: [],
			profilePic:
				'https://i.pinimg.com/originals/52/53/ec/5253ec0c421963c7d5080abbb4626769.jpg',
			dateCreated: Date.now()
		},
		{
			userId: '15',
			username: 'bandicoot',
			fullName: 'Crash Bandicoot',
			emailAddress: 'sony@yahoo.com',
			following: [],
			followers: [],
			profilePic:
				'https://i.pinimg.com/originals/28/d2/2f/28d22fb9445ffa44a436cf9606da954a.jpg',
			dateCreated: Date.now()
		}
	];

	// Add all users
	for (let k = 0; k < users.length; k++) {
		firebase.firestore().collection('users').add(users[k]);
	}

	for (let i = 0; i < users.length; i++) {
		const curUser = users[i];
		for (let j = 0; j < 3; j++) {
			// 3 photos for each user
			const randomPhoto =
				randomImages[Math.floor(Math.random() * randomImages.length)];
			const randomCaption =
				randomCaptions[Math.floor(Math.random() * randomCaptions.length)];
			firebase.firestore().collection('photos').add({
				userId: curUser.userId,
				imageSrc: randomPhoto,
				caption: randomCaption,
				likes: [],
				comments: [],
				dateCreated: Date.now()
			});
		}
	}
}
