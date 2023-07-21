const skill = [
	"Full Stack Developer",
	"Problem Solver",
	"Team Leader",
	"Supervisor",
	"Team Member",
];
let currentskillIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;
let isPaused = false;
let pauseEnd = 0;
function typeWriterEffect() {
	const skillElement = document.getElementById("typing");
	if (isPaused && Date.now() > pauseEnd) {
		isPaused = false;
		if (isDeleting) {
			currentskillIndex = (currentskillIndex + 1) % skill.length;
			isDeleting = false;
		} else {
			isDeleting = true;
		}
	}
	if (
		!isPaused &&
		!isDeleting &&
		currentCharacterIndex === skill[currentskillIndex].length
	) {
		isPaused = true;
		pauseEnd = Date.now() + 200;
		return setTimeout(typeWriterEffect, 50);
	}
	if (!isPaused && isDeleting && currentCharacterIndex === 0) {
		isPaused = true;
		pauseEnd = Date.now() + 200;
		return setTimeout(typeWriterEffect, 50);
	}
	const timeout = isDeleting ? 100 : 200;
	skillElement.innerText = skill[currentskillIndex].substring(
		0,
		currentCharacterIndex
	);
	currentCharacterIndex = isDeleting
		? currentCharacterIndex - 1
		: currentCharacterIndex + 1;
	setTimeout(typeWriterEffect, timeout);
}
typeWriterEffect();
const myTags = [
	"JavaScript 80%",
	"CSS 90%",
	"HTML 96%",
	"C 88%",
	"C++ 89%",
	"php 86%",
	"Python 75%",
	"Java 66%",
	"wordpress 90%",
	"drupal 80%",
	"Node.js 60%",
	"MySQL 78%",
	"jQuery 88%",
	"Typing 50WPM",
];
var tagCloud = TagCloud(".content", myTags, {
	radius: 255,
	maxSpeed: "fast",
	initSpeed: "fast",
	direction: 140,
	keep: true,
});
var colors = ["#34A853", "#FBBC05", "#4285F4", "#7FBC00", "FFBA01", "01A6F0"];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.querySelector(".content").style.color = random_color;
const audioElement = new Audio("spacesound.mp3");
audioElement.volume = 0.6;
const skillsElement = document.getElementById("skills");
audioElement.addEventListener("canplaythrough", function () {
	audioElement.loop = true;
	audioElement.play();
});
skillsElement.addEventListener("mouseenter", function (event) {
	if (!audioElement.paused) {
		audioElement.pause();
	}
	audioElement.loop = true;
	audioElement.play();
});
skillsElement.addEventListener("mouseleave", function (event) {
	if (!audioElement.paused) {
		audioElement.pause();
	}
});
var rotatingCursor = (function () {
	const INTERVAL_POSITION = 5;
	const INTERVAL_ROTATION = 100;
	let lastCursorPos = { x: -999, y: -999 };
	let currentCursorPos = { x: -999, y: -999 };
	let lastCursorAngle = 0,
		cursorAngle = 0;
	let cursorEl, cursorImageEl;
	function setCurrentCursorProps() {
		cursorEl.style.transform = `translate(${currentCursorPos.x}px, ${currentCursorPos.y}px)`;
		while (Math.abs(lastCursorAngle - cursorAngle) > 180) {
			if (cursorAngle > lastCursorAngle) {
				cursorAngle -= 360;
			} else if (cursorAngle < lastCursorAngle) {
				cursorAngle += 360;
			}
		}
		cursorImageEl.style.transform = `rotate(${cursorAngle - 90}deg)`;
	}
	function updateCursor() {
		window.addEventListener("mousemove", (event) => {
			currentCursorPos = { x: event.clientX, y: event.clientY };
		});
		setInterval(setCurrentCursorProps, INTERVAL_POSITION);
		setInterval(() => {
			const delt = {
				x: lastCursorPos.x - currentCursorPos.x,
				y: lastCursorPos.y - currentCursorPos.y,
			};
			if (Math.abs(delt.x) < 3 && Math.abs(delt.y) < 3) return;
			cursorAngle = (Math.atan2(delt.y, delt.x) * 180) / Math.PI;
			setCurrentCursorProps();
			lastCursorPos = currentCursorPos;
			lastCursorAngle = cursorAngle;
		}, INTERVAL_ROTATION);
	}
	return {
		initialize: () => {
			cursorEl = document.querySelector("#cursor");
			cursorImageEl = document.querySelector("#cursor > img");
			updateCursor();
		},
	};
})();
document.addEventListener("DOMContentLoaded", rotatingCursor.initialize);
// vars
("use strict");
var testim = document.getElementById("testim"),
	testimDots = Array.prototype.slice.call(
		document.getElementById("testim-dots").children
	),
	testimContent = Array.prototype.slice.call(
		document.getElementById("testim-content").children
	),
	testimLeftArrow = document.getElementById("left-arrow"),
	testimRightArrow = document.getElementById("right-arrow"),
	testimSpeed = 4500,
	currentSlide = 0,
	currentActive = 0,
	testimTimer,
	touchStartPos,
	touchEndPos,
	touchPosDiff,
	ignoreTouch = 30;
window.onload = function () {
	// Testim Script
	function playSlide(slide) {
		for (var k = 0; k < testimDots.length; k++) {
			testimContent[k].classList.remove("active");
			testimContent[k].classList.remove("inactive");
			testimDots[k].classList.remove("active");
		}
		if (slide < 0) {
			slide = currentSlide = testimContent.length - 1;
		}
		if (slide > testimContent.length - 1) {
			slide = currentSlide = 0;
		}
		if (currentActive != currentSlide) {
			testimContent[currentActive].classList.add("inactive");
		}
		testimContent[slide].classList.add("active");
		testimDots[slide].classList.add("active");
		currentActive = currentSlide;
		clearTimeout(testimTimer);
		testimTimer = setTimeout(function () {
			playSlide((currentSlide += 1));
		}, testimSpeed);
	}
	testimLeftArrow.addEventListener("click", function () {
		playSlide((currentSlide -= 1));
	});
	testimRightArrow.addEventListener("click", function () {
		playSlide((currentSlide += 1));
	});
	for (var l = 0; l < testimDots.length; l++) {
		testimDots[l].addEventListener("click", function () {
			playSlide((currentSlide = testimDots.indexOf(this)));
		});
	}
	playSlide(currentSlide);
	// keyboard shortcuts
	document.addEventListener("keyup", function (e) {
		switch (e.keyCode) {
			case 37:
				testimLeftArrow.click();
				break;
			case 39:
				testimRightArrow.click();
				break;
			case 39:
				testimRightArrow.click();
				break;
			default:
				break;
		}
	});
	testim.addEventListener("touchstart", function (e) {
		touchStartPos = e.changedTouches[0].clientX;
	});
	testim.addEventListener("touchend", function (e) {
		touchEndPos = e.changedTouches[0].clientX;
		touchPosDiff = touchStartPos - touchEndPos;
		console.log(touchPosDiff);
		console.log(touchStartPos);
		console.log(touchEndPos);
		if (touchPosDiff > 0 + ignoreTouch) {
			testimLeftArrow.click();
		} else if (touchPosDiff < 0 - ignoreTouch) {
			testimRightArrow.click();
		} else {
			return;
		}
	});
};
