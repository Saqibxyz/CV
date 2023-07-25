const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursors");
const textArray = [
	"Full Stack Developer",
	"Problem Solver",
	"Programmer",
	"Supervisor",
	"Team Leader",
	"Team member",
];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;
function type() {
	if (charIndex < textArray[textArrayIndex].length) {
		if (!cursorSpan.classList.contains("typing"))
			cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	} else {
		cursorSpan.classList.remove("typing");
		setTimeout(erase, newTextDelay);
	}
}
function erase() {
	if (charIndex > 0) {
		if (!cursorSpan.classList.contains("typing"))
			cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(
			0,
			charIndex - 1
		);
		charIndex--;
		setTimeout(erase, erasingDelay);
	} else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if (textArrayIndex >= textArray.length) textArrayIndex = 0;
		setTimeout(type, typingDelay + 1100);
	}
}
document.addEventListener("DOMContentLoaded", function () {
	if (textArray.length) setTimeout(type, newTextDelay + 250);
});
const myTags = [
	"JavaScript 72%",
	"CSS 95%",
	"HTML 94%",
	"C 94%",
	"C++ 85%",
	"Java 62% ",
	"Python 60%",
	"Typing 45-WPM",
	"Drupal",
	"PhP 78%",
	"Wordpress",
	"MS Word",
	"MS Excel",
	"MS Powerpoint",
	"MySQL 72%",
	"jQuery 80%",
];
var tagCloud = TagCloud(".content", myTags, {
	radius: 190,
	maxSpeed: "fast",
	initSpeed: "fast",
	direction: 135,
	keep: true,
});
var colors = ["#34A853", "#FBBC05", "#4285F4", "#7FBC00", "FFBA01", "01A6F0"];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.querySelector(".content").style.color = random_color;
