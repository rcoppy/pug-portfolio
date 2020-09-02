// import './../assets/sass/main.scss';
import 'bootstrap';
import 'waypoints/lib/noframework.waypoints';

const header = document.getElementById('page-header');
const navbar = document.getElementById('navbar');
const wrapper = document.querySelector('.wrapper.content');

const scrollingDownWaypoint = new Waypoint({
    element: navbar,
    handler: (direction) => setNavPositioning(direction),
});

const scrollingUpWaypoint = new Waypoint({
    element: wrapper,
    handler: (direction) => setNavPositioning(direction),
    offset: navbar.offsetHeight,
});

const cachedCSSAttributes = {
    headerPosition: 'relative',
    headerTop: getComputedStyle(header).top,
    wrapperMarginTop: getComputedStyle(wrapper).marginTop,
};

const setNavPositioning = (direction) => {
    console.log(window.scrollY);

    if (direction === 'up') {
        header.style.position = cachedCSSAttributes.headerPosition;
        header.style.top = cachedCSSAttributes.headerTop;
        wrapper.style.marginTop = cachedCSSAttributes.wrapperMarginTop;
    } else {
        header.style.position = 'fixed';
        header.style.top = `-${header.offsetHeight - navbar.offsetHeight}px`;
        wrapper.style.marginTop = `${parseInt(cachedCSSAttributes.wrapperMarginTop) + header.offsetHeight}px`;
    }
};