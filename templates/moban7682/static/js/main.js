/*---------------------------------------------------------
*	Author:			Travolgi
*	Theme:			Tech Corp HTML5
*	Version:			1.0.0
*	Created: 		25/12/2023
*	Last update:	25/12/2023
---------------------------------------------------------*/

/*--------------------------------------------------------
*	HELPER FUNCTIONS
--------------------------------------------------------*/
const delay = (callback, ms) => setTimeout(callback, ms);

const getElement = (selector) => document.querySelector(selector);

const getAllElements = (selector) => document.querySelectorAll(selector);

const changeAttribute = (target, dataAttribute, val=true) => target.setAttribute(dataAttribute, val);

const changeClass = (target, removeClass, addClass) => {
	target.classList.remove(removeClass);
	target.classList.add(addClass);
}


/*--------------------------------------------------------
*	PRELOAD
--------------------------------------------------------*/
(() => {
	const preload = getElement('#preload');
	window.addEventListener('load', () => {
		delay(() => changeClass(preload, null, 'loaded'), 250);
	});
})();

const footerDate = getElement('#thisYear');
if (footerDate) {
	footerDate.innerHTML= new Date().getFullYear();
}


/*--------------------------------------------------------
*	NAVBAR
--------------------------------------------------------*/
const header = getElement('header'),
		navToggle = getElement('.nav-toggle'),
		nav = getElement('#navbar');

const openNavBar = (val=true) => {
	changeAttribute(nav, 'data-visible', val);
	changeAttribute(navToggle, 'aria-expanded', val);
}

navToggle.addEventListener('click', () => {
	const visible = nav.getAttribute('data-visible');
	if(visible === 'false') {
		openNavBar();
	} else {
		openNavBar(false);
	}
});

const subMenuLi = getAllElements('.has-submenu');
subMenuLi.forEach(li => {
	li.addEventListener('click', e => {
		const li = e.target;
		const liActive = li.nodeName === 'SPAN' ? li.parentNode : li;
		if (liActive.classList.contains('active')) {
			liActive.classList.remove('active')
		} else {			
			liActive.classList.add('active')
		}
	})
});

document.addEventListener('click', e => {
	if (!header.contains(e.target))  {
		openNavBar(false);
	}
});


/*--------------------------------------------------------
*	GO TO TOP BUTTON
--------------------------------------------------------*/
const goTop = getElement('.gotop');

window.onscroll = () => {
	if(document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
		goTop.classList.add('visible');
	} else {
		goTop.classList.remove('visible');
	}
}

goTop.addEventListener('click', () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});


/*--------------------------------------------------------
*	AOS INIT
--------------------------------------------------------*/
AOS.init({
	duration: 650,
	easing: 'ease-in-sine',
	delay: 300
});
