let nav_links = document.getElementById("nav-links").getElementsByTagName('li');

for (let index = 0; index < nav_links.length; index++) {
    nav_links[index].addEventListener("click", nav_active); 
    
}

function nav_active(){
  
    for (let index = 0; index < nav_links.length; index++) {
        nav_links[index].classList.remove('nav-active');
        
    }

        this.classList.add('nav-active');
        

}