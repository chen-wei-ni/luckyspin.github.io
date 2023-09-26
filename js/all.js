/*
	requestAnimationFrame polyfill
*/
let m = document.querySelector('.slot_machine');
(function (m) {
	var lastTime = 0,
		vendors = ['webkit', /*'moz',*/ 'o', 'ms'];
	for (var i = 0; i < vendors.length && !m.requestAnimationFrame; ++i) {
		m.requestAnimationFrame = m[vendors[i] + 'RequestAnimationFrame'];
		m.cancelAnimationFrame = m[vendors[i] + 'CancelAnimationFrame']
			|| m[vendors[i] + 'CancelRequestAnimationFrame'];
	}

	if (!m.requestAnimationFrame)
		m.requestAnimationFrame = function (callback, element) {
			var currTime = +new Date(),
				timeToCall = Math.max(0, 16 - (currTime - lastTime)),
				id = m.setTimeout(function () { callback(currTime + timeToCall) }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!m.cancelAnimationFrame)
		m.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	let prize = document.querySelector('.prize');
	prize.style.display = "none"
})(this);

/*
	Slot Machine
*/
var sm = (function (undefined) {
	let prize = document.querySelector('.prize');
	let popupMusic = new Audio("music/bn_total_win_long.mp3");
	let bonusMusic = new Audio("music/bonus_stop_1.mp3");
	let bonusMusic2 = new Audio("music/bonus_stop_2.mp3");
	let bonusMusic3 = new Audio("music/bonus_stop_3.mp3");
	let bonusMusic4 = new Audio("music/bonus_stop_4.mp3");
	let bonusMusic5 = new Audio("music/bonus_stop_5.mp3");
	var tMax = 3800, // animation time, ms
		tMax2 = 1000,
		tMax3 = 1700,
		tMax4 = 2400,
		tMax5 = 3100,
		height = 3000, //210
		speeds = [],
		r = [],
		g = 'img/sample.png',
		b = 'img/bonus.png',
		start2, start3, start4, start5 = undefined,
		reels = [
			[g, g, g, g, g],
			[g, g, g, g, g],
			[g, g, g, g, g],
			[g, g, g, g, g],
			[g, g, g, g, g],
		],
		reels2 = [
			[g, g, b, g, g],
			[g, b, g, g, g],
			[g, g, g, g, b],
			[b, g, g, g, g],
			[g, g, g, b, g],
		],
		$reels, $msg, $reels2,
		start;
	function initState() {
		$reels = $('.reel').each(function (i, el) {
			el.innerHTML = `<div><div><img src="${reels[i][0]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div></div>`
			// '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>'  +  reels[i].join('</p><p>') +'</p></div>'
		});
	}
	function init() {
		initState()
		$msg = $('.msg');
		$('.button').click(throttle(function () {
			action()
		}, 4500));
	}
	function reelInit() {
		$reels = $('.reel').each(function (i, el) {
			p = Math.floor(Math.random() * 5)
			el.innerHTML = `
			<div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div>
			<div class="a1 bonus_how"><img src="${reels2[p][0]}"><img src="${reels2[p][2]}"></div>
			<div class="a1 bonus_how"><img src="${reels2[p][1]}"><img src="${reels2[p][3]}"></div>
			<div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div>
			<div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div>
			<div class="a1"><img src="${reels2[1][2]}"><img src="${reels2[p][3]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div>
			<div class="a1"><img src="${reels2[1][2]}"><img src="${reels2[p][1]}"></div>
			`
			// '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>'  +  reels[i].join('</p><p>') +'</p></div>'
		});
	}
	// 遊戲進行不能再按按鈕
	function throttle(func, duration) {
		let shouldWait = false;
		return function (...args) {
			if (!shouldWait) {
				func.apply(this, args)
				shouldWait = true;
				setTimeout(function () {
					shouldWait = false
				}, duration)
			}
		}
	}

	function action() {
		prize.style.display = "none"
		prize.innerHTML = "";
		reelInit()
		if (start !== undefined) return;
		if (start2 !== undefined) return;
		if (start3 !== undefined) return;
		if (start4 !== undefined) return;
		if (start5 !== undefined) return;
		// console.log(start);
		for (var i = 0; i < 5; ++i) {
			speeds[i] = Math.random() * 10 + 15;
			r[i] = 980 || (Math.random() * 3 | 0) * height / 3 + Math.floor(Math.random() * 3);
		}
		// console.log(speeds);
		allAnimate();
	}
	function allAnimate() {
		(function animate(now) {
			let bonusBox1 = document.querySelectorAll('.reel1 .bonus_how img');
			if (!start) start = now;
			let t = now - start || 0;
			$reels[0].scrollTop = ((speeds[0] / tMax2 / 10 * (tMax2 - t) * (tMax2 - t) + r[0]) % height) + 98 | 0;
			if (t < tMax2)
				requestAnimationFrame(animate);
			else {
				start = undefined;
				for (i = 0; i < 4; i++) {
					if (bonusBox1[i].outerHTML == "<img src=\"img/bonus.png\">") {
						bonusMusic.play();
					}
				}
			}
		}());
		(function animate2(now2) {
			let bonusBox1 = document.querySelectorAll('.reel2 .bonus_how img');
			if (!start2) start2 = now2;
			let t = now2 - start2 || 0;
			p = $reels[1].scrollTop = ((speeds[1] / tMax3 / 10 * (tMax3 - t) * (tMax3 - t) + r[2]) % height) + 98 | 0;
			if (t < tMax3)
				requestAnimationFrame(animate2);
			else {
				start2 = undefined;
				for (i = 0; i < 4; i++) {
					if (bonusBox1[i].outerHTML == "<img src=\"img/bonus.png\">") {
						bonusMusic2.play();
					}
				}
			}
		}());
		(function animate3(now2) {
			let bonusBox1 = document.querySelectorAll('.reel3 .bonus_how img');
			if (!start3) start3 = now2;
			let t = now2 - start3 || 0;
			p = $reels[2].scrollTop = ((speeds[2] / tMax4 / 10 * (tMax4 - t) * (tMax4 - t) + r[3]) % height) + 98 | 0;
			if (t < tMax4)
				requestAnimationFrame(animate3);
			else {
				start3 = undefined;
				for (i = 0; i < 4; i++) {
					if (bonusBox1[i].outerHTML == "<img src=\"img/bonus.png\">") {
						bonusMusic3.play();
					}
				}
			}
		}());
		(function animate4(now2) {
			let bonusBox1 = document.querySelectorAll('.reel4 .bonus_how img');
			if (!start4) start4 = now2;
			let t = now2 - start4 || 0;
			p = $reels[3].scrollTop = ((speeds[3] / tMax5 / 10 * (tMax5 - t) * (tMax5 - t) + r[4]) % height) + 98 | 0;
			if (t < tMax5)
				requestAnimationFrame(animate4);
			else {
				start4 = undefined;
				for (i = 0; i < 4; i++) {
					if (bonusBox1[i].outerHTML == "<img src=\"img/bonus.png\">") {
						bonusMusic4.play();
					}
				}
			}
		}());
		(function animate5(now2) {
			let bonusBox1 = document.querySelectorAll('.reel5 .bonus_how img');
			if (!start5) start5 = now2;
			let t = now2 - start5 || 0;
			p = $reels[4].scrollTop = ((speeds[4] / tMax / 10 * (tMax - t) * (tMax - t) + r[4]) % height) + 98 | 0;
			if (t < tMax + 50)
				requestAnimationFrame(animate5);
			else {
				start5 = undefined;
				for (i = 0; i < 4; i++) {
					if (bonusBox1[i].outerHTML == "<img src=\"img/bonus.png\">") {
						bonusMusic5.play();
					}
				}
			}
		}());
		setTimeout(function () {
			check();
		}, 4000);
	}

	function check() {
		let bonusBoxs = document.querySelectorAll('.bonus_how img');
		let c = [];
		// console.log(bonusBoxs, bonusBoxs.length);
		for (let i = 0; i < bonusBoxs.length; i++) {
			if (bonusBoxs[i].outerHTML == "<img src=\"img/bonus.png\">") {
				bonusBoxs[i].classList.add("congrats");
				if (bonusBoxs[i].classList.value == "congrats") {
					c.push(bonusBoxs[i])
				}
			}
		}
		// console.log(c.length);
		setTimeout(function () {
			popup(c.length)
		}, 500)
	}

	function popup(num) {
		popupMusic.load();
		popupMusic.play();
		const boomSpinning = [
			{ transform: 'scale(0.95)' },
			{ transform: ' scale(1)' },
			{ transform: ' scale(0.93)' },
			{ transform: ' scale(1)' }
		];
		const boomTiming = {
			duration: 200,
			iterations: 1,
		}
		let dark = document.querySelector('.dark');
		let light = document.querySelector('.light');
		dark.style['display'] = 'block';
		dark.style['background-color'] = 'rgba(0, 0, 0, 0.6)';
		light.style['display'] = 'block';
		prize.animate(boomSpinning, boomTiming)
		prize.style.display = "block";
		// 禮物個數對應獎項
		switch (num) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				prize.innerHTML =
					`
					<div class="popup">
						<p>Getting the *Gifts* !!</p>
					</div>
				`
				break;
			case 6:
			case 7:
				prize.innerHTML =
					`
					<div class="popup">
						<p>Getting the *Big Gifts* !!</p>
					</div>
				`
				break;
			case 8:
			case 9:
				prize.innerHTML =
					`
					<div class="popup">
						<p>Getting the *Awesome Gifts* !!</p>
					</div>
				`
				break;
			default:
				prize.innerHTML =
					`
					<div class="popup">
						<p>Getting the *Special Gifts* !!</p>
					</div>
				`
		}
	}
	return { init: init }
})();

$(sm.init);


window.onclick = function () {
	var bgm = new Audio("music/mainform_track.mp3");
	bgm.play();
	bgm.loop = true;
	window.onclick = null
}