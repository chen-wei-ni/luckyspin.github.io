/*
	requestAnimationFrame polyfill
*/
let m = document.querySelector('.slot_machine');
(function(m){
	var lastTime = 0,
		vendors = ['webkit', /*'moz',*/ 'o', 'ms'];
	for (var i = 0; i < vendors.length && !m.requestAnimationFrame; ++i){
		m.requestAnimationFrame = m[vendors[i] + 'RequestAnimationFrame'];
		m.cancelAnimationFrame = m[vendors[i] + 'CancelAnimationFrame']
			|| m[vendors[i] + 'CancelRequestAnimationFrame'];
	}

	if (!m.requestAnimationFrame)
		m.requestAnimationFrame = function(callback, element){
			var currTime = +new Date(),
				timeToCall = Math.max(0, 16 - (currTime - lastTime)),
				id = m.setTimeout(function(){ callback(currTime + timeToCall) }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!m.cancelAnimationFrame)
		m.cancelAnimationFrame = function(id){
		clearTimeout(id);
	};
	let prize = document.querySelector('.prize');
		prize.style.display = "none"
})(this);

/*
	Slot Machine
*/
var sm = (function(undefined){
	let prize = document.querySelector('.prize');
	var tMax = 3800, // animation time, ms
		tMax2 = 1000,
		tMax3 = 1700,
		tMax4 = 2400,
		tMax5 = 3100,
		height = 3000, //210
		speeds = [],
		r = [],
		g = 'img/sample.png',
		gb =  'img/blur.png',
		b = 'img/bonus.png',
		start2,start3,start4,start5 = undefined,
		reels = [
			[g, g,g ,g ,g],
			[g, g,g ,g ,g],
			[g, g,g ,g ,g],
			[g, g,g ,g ,g],
			[g, g,g ,g ,g],
		],
		reels2 = [
			[g, g,b ,g ,g],
			[g, b,g ,g ,g],
			[g, g,g ,g ,b],
			[b, g,g ,g ,g],
			[g, g,g ,b ,g],
		],
		
		$reels, $msg, $reels2,
		start;	
	function initState(){
		$reels = $('.reel').each(function(i, el){
			el.innerHTML = `<div><div><img src="${reels[i][0]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div><div><img src="${reels[i][1]}"></div></div>`
			// '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>'  +  reels[i].join('</p><p>') +'</p></div>'
		});
	}
	function init(){
		initState()
		$msg = $('.msg');
		$('.button').click(action);
	}
	function reelInit(){
			$reels = $('.reel').each(function(i, el){
			p = Math.floor(Math.random()*5)
			el.innerHTML = `<div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1 bonus_how"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div>
			<div class="a1 bonus_how"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][3]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div><div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div>
			<div class="a1"><img src="${reels2[p][2]}"><img src="${reels2[p][1]}"></div>
			`			
			// '<div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>' + reels[i].join('</p><p>') + '</p></div><div><p>'  +  reels[i].join('</p><p>') +'</p></div>'
		});
	}
	function action(){
		prize.style.display = "none"
		prize.innerHTML="";
		reelInit()
		if (start !== undefined) return;
		if (start2 !== undefined) return;
		if (start3 !== undefined) return;
		if (start4 !== undefined) return;
		if (start5 !== undefined) return;
		console.log(start)
		for (var i = 0; i < 5; ++i) {	
			speeds[i] = Math.random()*10 +15;
			r[i] = 980 || (Math.random()*3 | 0) * height / 3 + Math.floor(Math.random()*3) ; 
		} 
		
		console.log(speeds)
		allAnimate();

	}
	function allAnimate(){
		// let a = document.querySelectorAll('.a1 div img');
		// for(let b=0; b<a.length; b++){
		// 	a[b].classList.add("blur");
		// }
		(function animate(now){
			if (!start) start = now;
			let t = now - start || 0;
				$reels[0].scrollTop = ((speeds[0] / tMax2 / 10 * (tMax2 - t) * (tMax2 - t) + r[0]) % height)+105| 0;
			if (t < tMax2)
				requestAnimationFrame(animate);
			else {
				start = undefined;
				// check();
				// for(let b=0; b<a.length; b++){
				// 	a[b].classList.remove("blur");
				// }
			}
		}());
		(function animate2(now2){
			if (!start2) start2 = now2;
			let t = now2 - start2 || 0;
				p=$reels[1].scrollTop = ((speeds[1] / tMax3 / 10 * (tMax3 - t) * (tMax3 - t) + r[2]) % height)+105 | 0;
			if (t < tMax3)
				requestAnimationFrame(animate2);
			else {
				start2 = undefined;

			}
		}());
		(function animate3(now2){
			if (!start3) start3 = now2;
			let t = now2 - start3 || 0;
				p=$reels[2].scrollTop = ((speeds[2] / tMax4 / 10 * (tMax4 - t) * (tMax4 - t) + r[3]) % height)+105 | 0;
			if (t < tMax4)
				requestAnimationFrame(animate3);
			else {
				start3 = undefined;

			}
		}());
		(function animate4(now2){
			if (!start4) start4 = now2;
			let t = now2 - start4 || 0;
				p=$reels[3].scrollTop = ((speeds[3] / tMax5 / 10 * (tMax5 - t) * (tMax5 - t) + r[4]) % height)+105 | 0;	
			if (t < tMax5)
				requestAnimationFrame(animate4);
			else {
				start4 = undefined;

			}
		}());
		(function animate5(now2){
			if (!start5) start5 = now2;
			let t = now2 - start5 || 0;
				p=$reels[4].scrollTop = ((speeds[4] / tMax / 10 * (tMax - t) * (tMax - t) + r[4]) % height)+105 | 0;		
			if (t < tMax+50)
				requestAnimationFrame(animate5);
			else {
				start5 = undefined;
			}
		}());
		
		setTimeout(function(){
			check();
		},4000)
}
	function check(){ 
		let bonusBoxs = document.querySelectorAll('.bonus_how img');
		console.log(bonusBoxs,bonusBoxs.length);
		for(let i=0;i<bonusBoxs.length;i++){
			if(bonusBoxs[i].outerHTML == "<img src=\"img/bonus.png\">"){
				bonusBoxs[i].classList.add("congrats")
			}
		}
		
		setTimeout(function(){
			popup()
		},500)
	}

	function popup(){		
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
		dark.style['display'] ='block';
		dark.style['background-color'] ='rgba(0, 0, 0, 0.6)';
		light.style['display'] ='block';
		prize.animate(boomSpinning,boomTiming)
		prize.style.display = "block";
		prize.innerHTML = 
		`	<div class="popup">
				<p> Getting the *Gifts* !!</p>
			</div>
			`
		;

		// cancelpop(); //<button class="cancelBtn">Close</button>
	}
	// function cancelpop(){
	// 	let btn = document.querySelector('.cancelBtn');
	// 	btn.addEventListener('click', function (e) {
	// 		let prize = document.querySelector('.prize');
	// 		const boomOut = [
	// 			{ transform: 'scale(1)' },
	// 			{ transform: ' scale(0.95)' },
	// 			{ transform: ' scale(0.99)' },
	// 			{ transform: ' scale(0.92)' },
	// 			{ transform: ' scale(0.98)' },
	// 			{ opacity: 0}
	// 		  ];
	// 		let fadeout = prize.animate(boomOut,{
	// 			duration: 400,
	// 			easing: "ease-in",
	// 		})
	// 		fadeout.onfinish = ()=>{
	// 			initState()
	// 			prize.style.display = "none"
	// 		}
	// 	})
	// }	
	return {init: init}
})();

$(sm.init);