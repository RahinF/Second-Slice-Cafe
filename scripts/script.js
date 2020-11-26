

let nav_links = document.querySelectorAll(".nav-link");


/* -------------------------------------------------------------------------- */
/*                          Section heading under bar                         */
/* -------------------------------------------------------------------------- */

let section_headings = document.querySelectorAll(".section-heading");

section_headings.forEach(heading => {

    // create bar under the section heading 
    let heading_bar = document.createElement("div");
    heading_bar.classList.add("section-heading-bar");

    heading.parentNode.insertBefore(heading_bar, heading.nextSibling);
});



/* -------------------------------------------------------------------------- */
/*                         Highlight current nav link                         */
/* -------------------------------------------------------------------------- */


let sections = document.querySelectorAll(".section");
let section_observer_options = { threshold: 0.6 };

let section_observer = new IntersectionObserver(function (entries) {

    entries.forEach((entry) => {

        // if the current section is in the viewport (at least 60%)
        // change the nav link to the current section

        if (entry.isIntersecting) {
            for (let [index, section] of sections.entries()) {

                if (section.id == entry.target.id) {

                    highlight_current_nav_link(index);
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
/*                                  Animation                                 */
/* -------------------------------------------------------------------------- */


let section_heading_text = document.querySelectorAll(".section-heading");
let section_heading_bar = document.querySelectorAll(".section-heading-bar");

let slideshow_controls = document.querySelector("#slideshow-controls");
let slideshow_tab_text = document.querySelector(".slideshow-tab.active .tab-text");
let slideshow_tab_picture = document.querySelector(".slideshow-tab.active .tab-picture");

let menu_tabs_container = document.querySelector("#menu-tabs");

let google_map = document.querySelector("#google-map");
let contact_links = document.querySelector("#contact-section .contact-links");
let opening_hours = document.querySelector("#opening-hours");
let cafe_location = document.querySelector("#location");

let observer = new IntersectionObserver(function (entries, observer) {

    entries.forEach((entry) => {


        if (entry.isIntersecting) {


            if (entry.target.id == menu_tabs_container.id) {

                // add delay to each tabs animation
                let animation_delay = 0;
                menu_tabs.forEach(tab => {

                    tab.classList.add("start");
                    tab.style.animationDelay = `${animation_delay}s`;
                    animation_delay = animation_delay + 0.5;
                });
            }

            else {

                entry.target.classList.add("start");
            }

            observer.unobserve(entry.target);
        }


    })
});






observer.observe(slideshow_controls);
observer.observe(slideshow_tab_text);
observer.observe(slideshow_tab_picture);


section_heading_text.forEach(heading => {
    observer.observe(heading);
});

section_heading_bar.forEach(heading_bar => {
    observer.observe(heading_bar);
});

observer.observe(menu_tabs_container);

observer.observe(google_map);
observer.observe(opening_hours);
observer.observe(cafe_location);
observer.observe(contact_links);



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

let slideshow_previous_btn = document.querySelector("#slideshow-previous");
let slideshow_next_btn = document.querySelector("#slideshow-next");
let slideshow_delay = 10000;
let image_tabs = document.querySelectorAll(".slideshow-tab");

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


let slideshow_timer = setInterval(next_image, slideshow_delay);


// reset timer when next/prev is clicked
// smoother slideshow
function reset_slideshow_timer() {
    clearInterval(slideshow_timer);
    slideshow_timer = setInterval(next_image, slideshow_delay);
}

function next_image() {

    reset_slideshow_timer();


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

let menu_tabs = document.querySelectorAll(".menu-tab");
let menu_lists = document.querySelectorAll(".menu-list");
let menu_tab_indicator = document.querySelector(".menu-tab-indicator");



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
            body.style.overflow = "visible";
        }
    });

}

// removes nav active state if window is resized

let desktop_min_width = 1366;
window.addEventListener("resize", function () {
    if (window.innerWidth >= desktop_min_width) {
        nav_links_container.classList.remove("toggle");
        hamburger_menu.classList.remove('active');
        body.style.overflow = "visible";
    }
});



