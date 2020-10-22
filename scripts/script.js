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