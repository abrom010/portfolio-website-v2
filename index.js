
// observer for if runner is in view (footer icon)
let inView = false;
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// entry.target.classList.add('footer-icon');
			inView = true;
		} else {
			inView = false;
		}
	});
});
let runner = document.querySelector(".runner");
observer.observe(runner);
// observer for if runner is in view (footer icon)

// setting up a starter/stopper for runner animation
let cease = false;
function toggleStop() {
	if (cease) {
		cease = false;
	} else {
		cease = true;
	}
}
// setting up a starter/stopper for runner animation

// animating the runner
let count = 0;
let negating = false;
let container = document.querySelector("footer");
let id = setInterval(() => {
	if (inView && !cease) {
		let width = container.clientWidth - 42;
		if (count < width && negating == false) {
			runner.style.transform = "translate(" + count + "px, 4px)";
			count += 2;
		} else {
			runner.style.transform = "translate(" + count + "px, 4px) rotateY(180deg)";
			if (count < 1) negating = false;
			else negating = true;
			count -= 2;
		}
		;
	}
}, 6);
// animating the runner


function clickedCarouselButton(element) {
	let siblings = getSiblings(element);
	siblings.forEach(function (element) {
		if (element.classList.contains("active-button")) {
			element.classList.remove("active-button");
		}
	});
	element.classList.add("active-button");
}

function getSiblings(element) {
	let siblings = [];
	// if no parent, return no sibling
	if (!element.parentNode) {
		return siblings;
	}
	// first child of the parent node
	let sibling = element.parentNode.firstChild;

	// collecting siblings
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== element) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
}

let allCarouselButtons = document.querySelectorAll(".carousel-button");
allCarouselButtons.forEach(function (button) {
	button.addEventListener('click', function () {
		if (button.classList.contains("active-button")) return;
		clickedCarouselButton(button);
		scroll(button);
	});
});

function scroll(button) {
	// index for distinguishing work experience buttons from project buttons
	let index;
	if (button.classList.contains("carousel-button-1")) index = 0;
	else index = 1;
	let container = document.querySelectorAll(".previews-container")[index];
	let previews = container.children;

	function getRelativePos(elm, container) {
		var pPos = container.getBoundingClientRect(), // parent pos
			cPos = elm.getBoundingClientRect(), // target pos
			pos = {};

		pos.top = cPos.top - pPos.top + container.scrollTop,
			pos.right = cPos.right - pPos.right,
			pos.bottom = cPos.bottom - pPos.bottom,
			pos.left = cPos.left - pPos.left;

		return pos;
	}

	let siblingsOfButton = button.parentElement.children;
	function removeHidden(arr) {
		let ret = [];
		Array.from(arr).forEach(entry => {
			if (window.getComputedStyle(entry).display != "none")
				ret.push(entry);
		})
		return ret;
	}
	let indexOfButton = Array.prototype.indexOf.call(siblingsOfButton, button);

	let i;
	let j;

	if (removeHidden(siblingsOfButton).length > 3) {
		if (indexOfButton == 0) {
			i = 0;
			j = 0;
		} else if (indexOfButton == 1) {
			i = 0;
			j = 1;
		} else if (indexOfButton == 2) {
			i = 1;
			j = 0;
		} else if (indexOfButton == 3) {
			i = 1;
			j = 1;
		} else if (indexOfButton == 4) {
			i = 2;
			j = 0;
		} else if (indexOfButton == 5) {
			i = 2;
			j = 1;
		}
	} else {
		i = indexOfButton;
		j = 0;
	}

	let pos = previews[i].children[j].offsetTop;
	let start = container.scrollTop;
	let to = pos;
	let change = to - start;
	let startTime = performance.now();
	let now;
	let elapsed;
	let t;
	let duration = 0.5;

	function animateScroll() {
		now = performance.now();
		elapsed = (now - startTime) / 1000;
		t = (elapsed / duration);

		container.scrollTop = start + change * easeInOutQuad(t);

		if (t < 1)
			window.requestAnimationFrame(animateScroll);
	};

	animateScroll();
}

function easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };

