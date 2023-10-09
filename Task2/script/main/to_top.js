let btn = document.querySelector("#scroll-button");

window.addEventListener('scroll',() =>{
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});

btn.addEventListener('click', () => {
    window.scrollTo(0,0)
})