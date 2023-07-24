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
const slider = document.querySelector(".slider");
const trail = document.querySelector(".trail").querySelectorAll("div");
let value = 0;
let trailValue = 0;
let interval = 4000;
const slide = (condition) => {
	clearInterval(start);
	condition === "increase" ? initiateINC() : initiateDEC();
	move(value, trailValue);
	start = setInterval(() => slide("increase"), interval);
};
const initiateINC = () => {
	trail.forEach((cur) => cur.classList.remove("active"));
	value === 80 ? (value = 0) : (value += 20);
	trailUpdate();
};
const initiateDEC = () => {
	trail.forEach((cur) => cur.classList.remove("active"));
	value === 0 ? (value = 80) : (value -= 20);
	trailUpdate();
};
const move = (S, T) => {
	slider.style.transform = `translateX(-${S}%)`;
	trail[T].classList.add("active");
};
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.inOut" } });
tl.from(".bg", { x: "-100%", opacity: 0 })
	.from(".work-exp-det", { opacity: 0, y: "30px" }, "-=0.3")
	.from("h2", { opacity: 0 }, "-=0.3");
const animate = () => tl.restart();
const trailUpdate = () => {
	if (value === 0) {
		trailValue = 0;
	} else if (value === 20) {
		trailValue = 1;
	} else if (value === 40) {
		trailValue = 2;
	} else if (value === 60) {
		trailValue = 3;
	} else {
		trailValue = 4;
	}
};
let start = setInterval(() => slide("increase"), interval);
document.querySelectorAll("svg").forEach((cur) => {
	cur.addEventListener("click", () =>
		cur.classList.contains("next") ? slide("increase") : slide("decrease")
	);
});
const clickCheck = (e) => {
	clearInterval(start);
	trail.forEach((cur) => cur.classList.remove("active"));
	const check = e.target;
	check.classList.add("active");
	if (check.classList.contains("box1")) {
		value = 0;
	} else if (check.classList.contains("box2")) {
		value = 20;
	} else if (check.classList.contains("box3")) {
		value = 40;
	} else if (check.classList.contains("box4")) {
		value = 60;
	} else {
		value = 80;
	}
	trailUpdate();
	move(value, trailValue);
	animate();
	start = setInterval(() => slide("increase"), interval);
};
trail.forEach((cur) => cur.addEventListener("click", (ev) => clickCheck(ev)));
const touchSlide = (() => {
	let start, move, change, sliderWidth;
	slider.addEventListener("touchstart", (e) => {
		start = e.touches[0].clientX;
		sliderWidth = slider.clientWidth / trail.length;
	});
	slider.addEventListener("touchmove", (e) => {
		e.preventDefault();
		move = e.touches[0].clientX;
		change = start - move;
	});
	const mobile = (e) => {
		change > sliderWidth / 4 ? slide("increase") : null;
		change * -1 > sliderWidth / 4 ? slide("decrease") : null;
		[start, move, change, sliderWidth] = [0, 0, 0, 0];
	};
	slider.addEventListener("touchend", mobile);
})();
