// Highlight current nav link
let nav_links = document.querySelectorAll("nav li");
let sections = document.querySelectorAll(".section");


let options = { threshold: 0.6 };

let section_observer = new IntersectionObserver(function (entries) {

    entries.forEach((entry) => {

        // if the current section is in the viewport (at least 60%)
        // change the nav link to the current section

        if (entry.isIntersecting) {
            for (let [index, section] of sections.entries()) {
                if (section.id == entry.target.id) {
                    current_link(index);
                    //
                    section_heading_anim_start(index);
                }
            }
        }
    });
}, options);


sections.forEach((section) => {
    section_observer.observe(section);
});

// makes the link of the current section active
function current_link(current_link) {
    nav_links.forEach((link) => {
        link.classList.remove("active");
    });

    nav_links[current_link].classList.add("active");
}










// about section animation

let slideshow_observer_options = { threshold: 0.8 };
let slideshow_controls = document.querySelector("#slideshow-controls");
let about_observer = new IntersectionObserver(function (entries) {

    entries.forEach((entry) => {

        // if slideshow controls are visible on the viewport add
        // fade in animation once.
        if (entry.isIntersecting) {
            
            if (!slideshow_controls.classList.contains("start")){
            document.querySelector("#slideshow-controls").classList.add("start");
        }
        }
    });
}, slideshow_observer_options);



about_observer.observe(slideshow);



function section_heading_anim_start(index){
    // console.log(sections[index]);
    // console.log(sections[index].querySelector(".section-heading"));
    if (sections[index].querySelector(".section-heading")){
        sections[index].querySelector(".section-heading").classList.add("start");
        
    }
    
}









// Call to action button scroll to section
document.getElementById("call-to-action").addEventListener("click", function(){
    document.getElementById("about-section").scrollIntoView(true);
});

















// Image tabs


let image_tabs =  document.querySelectorAll(".image-tab");
let slideshow_previous_btn =  document.querySelector("#slideshow-previous");
let slideshow_next_btn =  document.querySelector("#slideshow-next");
let imgIndex = 0;

const slideshow_delay = 10000;

    // create slideshow dots
for (let index = 0; index < image_tabs.length; index++) {

    let dot = document.createElement("div");
    dot.classList.add('circle', 'dot');

    dot.addEventListener("click", function(){        

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

    image_tabs[imgIndex].classList.add("active");
    change_dot();
}




// dots change to show active image
function change_dot(){
        let dots = document.querySelectorAll(".dot");

        dots.forEach(dot => { dot.classList.remove("active") });
    
        dots[imgIndex].classList.add("active");
}

slideshow_previous_btn.addEventListener("click", next_image);
slideshow_next_btn.addEventListener("click", next_image);
















// Menu tabs
// tabs clicked on shows menu items
// order is important! changing the html will break this.
let menu_tabs = document.querySelectorAll(".menu-tab");
let menu_items = document.querySelectorAll(".menu-items");

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
    menu_items.forEach(item => {
        item.classList.remove("active"); 
    });

    // adds active state to tab and menu items
    this.classList.add("active");  
    menu_items[menu_tabs.indexOf(this)].classList.add("active");
}






// Hamburger Menu
let hamburger_menu = document.getElementById('hamburger');
let nav_links_container = document.getElementById('nav-content');
let body = document.querySelector("body");


// toggle hamburger menu
hamburger_menu.addEventListener("click", function () {
    nav_links_container.classList.toggle('toggle'); // show links
    hamburger_menu.classList.toggle('active'); // hamburger animation


    // cant scroll if hamburger is active
    body.style.overflow = nav_links_container.classList.contains("toggle") ? "hidden": "visible";

});



// close link box and hamburger when a link is clicked
for (let index = 0; index < nav_links.length; index++) {

    nav_links[index].addEventListener("click", function () {

        if(hamburger_menu.classList.contains('active')){
        nav_links_container.classList.toggle('toggle');
        hamburger_menu.classList.toggle('active');
    }
    });

}

// removes nav active state if window is resized
window.addEventListener("resize", function() {
    if (window.innerWidth >= 1366) {
        nav_links_container.classList.remove("toggle");
        hamburger_menu.classList.remove('active');
        body.style.overflow = "visible";
    }
});



