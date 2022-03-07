class $ {
    constructor(selector, where = document){
        this.$s = where.querySelector(selector);
        this.$All = where.querySelectorAll(selector);
    }
}



const slides = new $('.offer__slide').$All,
    prev = new $('.offer__slider-prev').$s,
    next = new $('.offer__slider-next').$s,
    total = new $('#total').$s,
    current = new $('#current').$s;


    let slideIndex = 1;
    showSlides(slideIndex);
    if(slides.length < 10){
        total.textContent =`0${slides.length}`;
    }else{
        total.textContent =slides.lenght;
    }

    function showSlides(n){
        if(n > slides.length){
            slideIndex =1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((element) => {
            return element.style.display ="none";
        });
        slides[slideIndex -1].style.display ="block";

        if(slides.length < 10){
            current.textContent =`0${slideIndex}`;
        }else{
            current.textContent =slideIndex;
        }
        
    }
    function plusSlides(n){
        showSlides(slideIndex +=n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    })
    next.addEventListener('click', () => {
        plusSlides(1);
    })




