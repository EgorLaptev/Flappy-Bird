window.addEventListener('DOMContentLoaded', function () {

	"use strict"; // ES6 Standart

	let
		scoreBar  = document.querySelector('.scoreBar'),
		recordBar = document.querySelector('.recordBar');

		if (localStorage.getItem('record') !== undefined) {
			recordBar.textContent = `Record: ${JSON.parse(localStorage.getItem('record'))}`;
		}

	// Audio
	let
		audioFly 	= new Audio(),
		audioScore  = new Audio();

	audioFly.src = "audio/fly.mp3";
	audioScore.src = "audio/score.mp3";

	let
		cnv = document.querySelector('#canv'),
		ctx = cnv.getContext("2d");

	let
		bird 	= new Image(),
		bg		= new Image(),
		fg		= new Image(),
		pipeUp			= new Image(),
		pipeBottom 	= new Image();

	bird.src 	= "https://itproger.com/img/news/flappy_bird_bird.png";
	bg.src		= "https://itproger.com/img/news/flappy_bird_bg.png";
	fg.src 	 	= "https://itproger.com/img/news/flappy_bird_fg.png";
	pipeUp.src	= "https://itproger.com/img/news/flappy_bird_pipeUp.png";
	pipeBottom.src	= "https://itproger.com/img/news/flappy_bird_pipeBottom.png";

	let gap = 100; // Расстояние между припятствиями

	// При нажатии на любую кнопку
	document.addEventListener('keydown', ()=>moveDown());
	document.addEventListener('mousedown', ()=>moveDown());

	function moveDown () {
		yPos -= 30;
		audioFly.play();
	}

	// Создание блоков
	let pipe = [];
	pipe[0]  = {
		x: cnv.width,
		y: 0
	};

	// Позиция птички
	let
		xPos = 10,
		yPos = 150;

	let grav = 2.5; // Гравитация

	let score = 0;  // Очки

	function draw () {
		ctx.drawImage(bg, 0, 0);

		for (let i = 0; i < pipe.length;i++) {
			console.log(1);
			ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
			ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

			pipe[i].y--;

			if (pipe[i].x == 125) {
				pipe.push({
					x: cnv.width,
					y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
				});
			}

			if (xPos + bird.width >= pipe[i].x
				&& xPos <= pipe[i].x + pipeUp.width
				&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
				|| yPos + bird.height >= cnv.height - fg.height) {

				// Save record

				if (JSON.parse(localStorage.getItem('record')) < score
					  || localStorage.getItem('record') === undefined) {
					localStorage.setItem('record', score);
				}



				// Window reload
				location.reload();
			}

			if (pipe[i].x == 5) {
				score++;
				scoreBar.textContent = `Score: ${score}`;
				audioScore.play();
			}

		}

		ctx.drawImage(fg, 0, cnv.height - fg.height);
		ctx.drawImage(bird, xPos, yPos);

		yPos += grav;

		requestAnimationFrame(draw);
	}

	pipeBottom.addEventListener('load', ()=>{
		draw();
	});



});
