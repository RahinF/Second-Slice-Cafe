// Highlight current nav link
// if the screen falls within the sections area
// change the link appearance to indicate that it is active

let nav_links = document.getElementById("nav-links").getElementsByTagName("li");
let sections = document.getElementsByTagName("section");

window.onscroll = function() {

    for (let index = 0; index < sections.length; index++) {
        let section_top = sections[index].offsetTop;
        let section_bottom = section_top + sections[index].offsetHeight;

        if (window.scrollY >= section_top && window.scrollY < section_bottom) {
            nav_links[index].classList.add("nav-active");
        } 

        else {
            nav_links[index].classList.remove("nav-active");
        }
    }

};


// Call to action button scroll to section
document.getElementById("call-to-action").addEventListener("click", function(){
    document.getElementById("about-section").scrollIntoView(true);
});





// Image tabs
// image and text change when a tab is clicked

// add action lister to tabs
document.querySelectorAll(".image-tab").forEach(tab => {
    tab.addEventListener("click", change_image_tab);
});


// set the inital image info to first tab
let image_text_title = document.getElementById("image-text-title");
let image_text_info = document.getElementById("image-text-info");

image_text_title.innerText = document.querySelector(".tab-title").innerText;
image_text_info.innerText = document.querySelector(".tab-info").innerHTML;


// when clicked changes image src, alt and text.
function change_image_tab(){
    let expandImg = document.getElementById("expandedImg");
    let current_tab_image = this.querySelector(".tab-picture");

    // change image and alt
    expandImg.src = current_tab_image.src;
    expandImg.alt = current_tab_image.alt;

    // change the text and title
    image_text_title.innerText = this.querySelector(".tab-title").innerText;
    image_text_info.innerText = this.querySelector(".tab-info").innerHTML;
}




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
        tab.classList.remove("current-menu-tab"); 
    });

    // remove active state from all menu items
    menu_items.forEach(item => {
        item.classList.remove("active"); 
    });

    // adds active state to tab and menu items
    this.classList.add("current-menu-tab");  
    menu_items[menu_tabs.indexOf(this)].classList.add("active");
}






// Hamburger Menu
let hamburger_menu = document.getElementById('hamburger');
let nav_links_container = document.getElementById('nav-content');


// toggle hamburger menu
hamburger_menu.addEventListener("click", function () {
    nav_links_container.classList.toggle('toggle-nav'); // show links
    hamburger_menu.classList.toggle('active'); // hamburger animation
});



// close link box and hamburger when a link is clicked
for (let index = 0; index < nav_links.length; index++) {

    nav_links[index].addEventListener("click", function () {

        if(hamburger_menu.classList.contains('active')){
        nav_links_container.classList.toggle('toggle-nav');
        hamburger_menu.classList.toggle('active');
    }
    });

}

// removes nav active state if window is resized
window.addEventListener("resize", function() {
    if (window.innerWidth >= 1366) {
        nav_links_container.classList.remove("toggle-nav");
        hamburger_menu.classList.remove('active')};
  });



