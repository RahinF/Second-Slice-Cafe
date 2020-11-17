const slideshow = document.querySelector("#slideshow");

const nav_links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const cta_btn = document.querySelector("#call-to-action");

const image_tabs = document.querySelectorAll(".slideshow-tab");
const slideshow_previous_btn = document.querySelector("#slideshow-previous");
const slideshow_next_btn = document.querySelector("#slideshow-next");
const slideshow_delay = 10000;

let menu_tabs = document.querySelectorAll(".menu-tab");
let menu_lists = document.querySelectorAll(".menu-list");
let menu_tab_indicator = document.querySelector(".menu-tab-indicator");










/* -------------------------------------------------------------------------- */
/*                          Section heading under bar                         */
/* -------------------------------------------------------------------------- */

const section_headings = document.querySelectorAll(".section-heading");


section_headings.forEach(heading => {

    // create bar under the section heading 
    let heading_bar = document.createElement("div");
    heading_bar.classList.add("section-heading-bar");

    heading.parentNode.insertBefore(heading_bar, heading.nextSibling);
});























/* -------------------------------------------------------------------------- */
/*                         Highlight current nav link                         */
/* -------------------------------------------------------------------------- */



let section_observer_options = { threshold: 0.6 };

let section_observer = new IntersectionObserver(function (entries) {

    entries.forEach((entry) => {

        // if the current section is in the viewport (at least 60%)
        // change the nav link to the current section

        if (entry.isIntersecting) {
            for (let [index, section] of sections.entries()) {

                if (section.id == entry.target.id) {

                    highlight_current_nav_link(index);
                    section_heading_anim(index);
                }
            }
        }
    });
}, section_observer_options);


sections.forEach((section) => {
    section_observer.observe(section);
});

/* -------------------------------------------------------------------------- */


// makes the link of the current section active
function highlight_current_nav_link(current_link) {

    nav_links.forEach((link) => { link.classList.remove("active") });
    nav_links[current_link].classList.add("active");
}



/* -------------------------------------------------------------------------- */


function section_heading_anim(index) {

    let current_section = sections[index];
    let heading_text = current_section.querySelector(".section-heading");
    let heading_bar = current_section.querySelector(".section-heading-bar");

    if (current_section.querySelector(".section-heading")) {
        heading_text.classList.add("start");
        heading_bar.classList.add("start");

    }

}




















/* -------------------------------------------------------------------------- */
/*                            Call to Action Button                           */
/* -------------------------------------------------------------------------- */

// Moves to about section 

cta_btn.addEventListener("click", function () {
    slideshow.scrollIntoView(true);
});


















/* -------------------------------------------------------------------------- */
/*                           About Section Animation                          */
/* -------------------------------------------------------------------------- */

let slideshow_observer_options = { threshold: 0.5 };

let about_observer = new IntersectionObserver(function (entries, about_observer) {

    entries.forEach((entry) => {

        // if slideshow controls are visible on the viewport add
        // fade in animation once.

        if (entry.isIntersecting) {

            document.querySelector("#slideshow-controls").classList.add("start");
            document.querySelector(".tab-picture").classList.add("start");
            document.querySelector(".tab-text").classList.add("start");

            about_observer.unobserve(slideshow);
        }
    });

}, slideshow_observer_options);



about_observer.observe(slideshow);




















/* -------------------------------------------------------------------------- */
/*                           Menu Section Tab Animation                       */
/* -------------------------------------------------------------------------- */

let menu_tab_observer_options = { threshold: 1 };
let menu_tabs_container = document.querySelector("#menu-tabs");

let menu_tab_observer = new IntersectionObserver(function (entries, menu_tab_observer) {

    entries.forEach((entry) => {


        if (entry.isIntersecting) {

            // add delay to each tabs animation
            let animation_delay = 0;
            menu_tabs.forEach(tab => {
            
                tab.classList.add("start");
                tab.style.animationDelay = `${animation_delay}s`;
                animation_delay = animation_delay + 0.5;
            });
            
            menu_tab_indicator.classList.add("start");
            menu_tab_observer.unobserve(menu_tabs_container);
        }
    });

}, menu_tab_observer_options);



menu_tab_observer.observe(menu_tabs_container);


/* -------------------------------------------------------------------------- */
/*                             Menu Item Animation                            */
/* -------------------------------------------------------------------------- */

let menu_lists_observer_options = { threshold: 0.5 };
let menu = document.querySelector("#menu");
let menu_lists_observer = new IntersectionObserver(function (entries, menu_lists_observer) {

    entries.forEach((entry) => {


        if (entry.isIntersecting) {

            // add delay to each item animation
            let animation_delay = 0;


            // list of lists containing menu items
            menu_lists.forEach(list => {
                list.querySelectorAll("li").forEach(menu_item => {



                    menu_item.classList.add("start");
                    menu_item.style.animationDelay = `${animation_delay}s`;
                    animation_delay = animation_delay + 0.05;
                });

                animation_delay = 0;

            });



            menu_lists_observer.unobserve(menu);
        }
    });

}, menu_lists_observer_options);



menu_lists_observer.observe(menu);


/* -------------------------------------------------------------------------- */
/*                                 Image tabs                                 */
/* -------------------------------------------------------------------------- */



let imgIndex = 0;



// create slideshow dots
for (let index = 0; index < image_tabs.length; index++) {

    let dot = document.createElement("div");
    dot.classList.add('circle', 'dot');

    dot.addEventListener("click", function () {

        image_tabs.forEach(tab => { tab.classList.remove("active") });

        image_tabs[index].classList.add("active");
        imgIndex = index;

        change_dot();

    });

    document.querySelector("#dots").appendChild(dot);

}

// sets first image 
document.querySelector(".dot").classList.add("active");


setInterval(next_image, slideshow_delay);


function next_image() {
    image_tabs[imgIndex].classList.remove("active");

    // if prev button is clicked go back 1 image else go foward 1 image
    let pos = this.id == slideshow_previous_btn.id ? imgIndex + image_tabs.length - 1 : imgIndex + 1;
    imgIndex = pos % image_tabs.length;

    // image tab text is given animation after initial fade in
    let current_tab_text = image_tabs[imgIndex].querySelector('.tab-text');
    if (!current_tab_text.classList.contains("start")) {
        current_tab_text.classList.add('start');
    }

    // image tab picture is given animation after initial fade in
    let current_tab_picture = image_tabs[imgIndex].querySelector('.tab-picture');
    if (!current_tab_picture.classList.contains("start")) {
        current_tab_picture.classList.add('start');
    }


    image_tabs[imgIndex].classList.add("active");
    change_dot();
}




// dots change to show active image
function change_dot() {
    let dots = document.querySelectorAll(".dot");

    dots.forEach(dot => { dot.classList.remove("active") });

    dots[imgIndex].classList.add("active");
}

slideshow_previous_btn.addEventListener("click", next_image);
slideshow_next_btn.addEventListener("click", next_image);
















/* -------------------------------------------------------------------------- */
/*                                   Menu tabs                                */
/* -------------------------------------------------------------------------- */




// add action listener
menu_tabs.forEach(tab => {
    tab.addEventListener("click", change_menu_tab);
});


function change_menu_tab() {

    // array from nodelist
    menu_tabs = Array.from(menu_tabs);

    // remove the active state from menu tabs
    menu_tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    // remove active state from all menu items
    menu_lists.forEach(item => {
        item.classList.remove("active");
    });

    // adds active state to tab and menu items
    this.classList.add("active");
    menu_lists[menu_tabs.indexOf(this)].classList.add("active");


    // change the position of the menu tab indicator
    let grid_col = menu_tabs.indexOf(this) + 1;
    

    // restart animation
    menu_tab_indicator.classList.remove("start");
    void menu_tab_indicator.offsetWidth; // restart css animation fix
    menu_tab_indicator.classList.add("start");

    menu_tab_indicator.style.gridColumn = grid_col;
    
    
}






/* -------------------------------------------------------------------------- */
/*                               Hamburger Menu                               */
/* -------------------------------------------------------------------------- */

let hamburger_menu = document.getElementById('hamburger');
let nav_links_container = document.getElementById('nav-content');
let body = document.querySelector("body");


// toggle hamburger menu
hamburger_menu.addEventListener("click", function () {
    nav_links_container.classList.toggle('toggle'); // show links
    hamburger_menu.classList.toggle('active'); // hamburger animation


    // cant scroll if hamburger is active
    body.style.overflow = nav_links_container.classList.contains("toggle") ? "hidden" : "visible";

});



// close link box and hamburger when a link is clicked
for (let index = 0; index < nav_links.length; index++) {

    nav_links[index].addEventListener("click", function () {

        if (hamburger_menu.classList.contains('active')) {
            nav_links_container.classList.toggle('toggle');
            hamburger_menu.classList.toggle('active');
        }
    });

}

// removes nav active state if window is resized
window.addEventListener("resize", function () {
    if (window.innerWidth >= 1366) {
        nav_links_container.classList.remove("toggle");
        hamburger_menu.classList.remove('active');
        body.style.overflow = "visible";
    }
});



