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
let image_tabs = document.getElementById("image-tabs").getElementsByTagName("img");
for (let index = 0; index < image_tabs.length; index++) {
    image_tabs[index].addEventListener("click", change_image_tab);
    
}


// set the inital image info to first tab
let image_text_title = document.getElementById("image-text-title");
let image_text_info = document.getElementById("image-text-info");

image_text_title.innerText = document.getElementsByClassName("tab-title")[0].innerText;
image_text_info.innerText = document.getElementsByClassName("tab-info")[0].innerHTML;


// when clicked changes image src, alt and text.
function change_image_tab(){
    let expandImg = document.getElementById("expandedImg");

    expandImg.src = this.src;
    expandImg.alt = this.alt;

    image_text_title.innerText = this.parentElement.getElementsByClassName("tab-title")[0].innerText;
    image_text_info.innerText = this.parentElement.getElementsByClassName("tab-info")[0].innerHTML;
}