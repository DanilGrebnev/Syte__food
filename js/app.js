window.addEventListener('DOMContentLoaded', () => {
// 1) Создаём функцию, которая будет скрывать не нужные табы;
// 2) Показать нужный таб;
// 3) Назначить обработчики событий на меню справа о табов, которое и будет манипулировать двумя предыдущими функциями.

const tabs = document.querySelectorAll('.tabheader__item'),  // Табы меню справа;
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');// Получаем родителя контекстного меню справа.

    // 1) скрываем все ненужные табы:

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none"; //Скрываем все табы с помощью цикла forEach;
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');//убераем класс активности у элементов меню справа;
        });
    }
    // 2) Создаём функцию, которая будет показывать нам табы;

    function showTabContent(i = 0){// сразу передаём параметр;
        tabsContent[i].style.display = "block";   //В качестве параметра мы передадим индекс таба (0);
        tabs[i].classList.add('tabheader__item_active');   
    }
hideTabContent();
showTabContent() ;  
    // 3) Создаём обработчик события с помощью делегирования:
    tabsParent.addEventListener('click', event => {
        let target = event.target;    
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{ // второй параметр по синтаксису forEach "i" - всегда номер элемента, который мы перебираем;
                if(target == item){
                    hideTabContent();
                    showTabContent(i);// i - номер элемента, котоырй совпал в условии с целью на которую мы кликаем. Таким образом мы синхранизируем правое контекстное меню и табы, к которым будет преминяться функция
                }
            });
        }
    });



    // Таймер обратного отсчёта(универсальный)

const deadLine = "2022-02-10" //помещаем дату в виде строки. Это дата, до которой будет отсчитывать таймер от настоящего времени. Это ДЕДЛАЙН.
//Создаём функцию, которая будет определять разницу между дедлайном и текущем временем;

function getTimeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date()),// в переменную t получаем разницу между датами в миллисекундах;
    //считаем количество дней, которые будут отображаться в нашем таймере;
    days = Math.floor(t /(1000 * 60 * 60 * 24)),//(поссчитали кол. мс/ в дне )
    hours = Math.floor((t / 1000 * 60 * 60) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t/1000)%60);
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };

}
//Функция установки таймера;

function setClock(selector, endTime){
const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock, 1000);

    updateClock();//вызовим функцию, чтобы при обновлении не было бага. Можно удалить и проверить, что изменится.

    function getZero(num){//функция, которая добавляет 0, если число меньше 10;
        if(num >=0 && num <10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    //функция обновления таймера 
    function updateClock(){
        const t = getTimeRemaining(endTime);
        days.innerText = getZero(t.days);
        hours.innerText = getZero(t.hours);
        seconds.innerText = getZero(t.seconds);
        minutes.innerText = getZero(t.minutes);

        //Создаём условие остановки таймера:

        if(t.total<=0){
            clearInterval(timeInterval);
        }
    }
    
}
        setClock('.timer', deadLine);

        //ФУНКЦИИ ПО ВЫЗОВУ МОДАЛЬНОГО ОКНА;
        let btn = document.querySelectorAll('[data-btn]');
        let modalWindow = document.querySelector('.modal');
        let modalCloseBtn = document.querySelector('.modal__close');

        function modalOn() {
            modalWindow.style.display ="block";
            document.body.style.overflow="hidden"
        }
        function modalClose() {
            modalWindow.style.display ="none";
            document.body.style.overflow=""
            window.removeEventListener('scroll', modalScrollBottom);
        }

        btn.forEach(item => {
            item.addEventListener('click', modalOn);
            item.addEventListener('click', clerTimerModal);
            window.removeEventListener('scroll', modalScrollBottom);
            
        })

        modalCloseBtn.addEventListener('click', modalClose);
        modalWindow.addEventListener('click', e => {
            let target = e.target; 
            if(target === document.querySelector('.modal')){
                modalClose();
            }
        })
        
        
        // let modelTimerId = setTimeout(modalOn, 5000);//вызов функции спустя время;

        function clerTimerModal() {//функция отмена вызова функции по времени;
            clearInterval(modelTimerId);
        }
        
        // Функция появления модального окна при пролистывании сайта до конца:
        function modalScrollBottom(){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                modalOn();
            }
        }

       window.addEventListener('scroll', modalScrollBottom);//вызов функции по достижению низа страницы пользователем;
        


       //Карточки;
       class MenuCards {
           constructor(src, alt, title, textContent, price, parentSelector){
               this.src = src;
               this.alt = alt;
               this.title = title;
               this.textContent = textContent;
               this.price = price;
               this.parent = document.querySelector(parentSelector);
           }

            render(){
                const element = document.createElement('div');
                element.classList.add('menu__item');
                element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.textContent}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
                this.parent.append(element);
            }
       }
       new MenuCards(
        '"img/tabs/vegy.jpg"',
        '"vegy"',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        299,
        ".menu .container",
        ).render();

        new MenuCards(
            '"img/tabs/elite.jpg"',
            '"premium"',
            'Меню "Премиум"',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            299,
            ".menu .container",
            ).render();

        new MenuCards(
            '"img/tabs/post.jpg"',
             '"post"',
            'Меню "Постное"',
             'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
             299,
             ".menu .container",
             ).render();


                //Связь с JSON
        //   fetch('db.json')
        //   .then(data => data.json())
        //   .then(res => console.log(res));







        //Калькулятор 


// для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
// для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)

class $s{
    constructor(selector){
        this.s = document.querySelector(selector);
        this.all = document.querySelectorAll(selector);
    };
};

const result = new $s('.calculating__result span').s;
    let sex = 'female', 
    height, weight, age, 
    ratio = 1.375;
    
    
function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent ="____";
        return;
    }
    if(sex === 'female'){
        result.textContent =Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))* ratio);
        

    }else{
        result.textContent =Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))* ratio);
        

    }
}

calcTotal();

function getStaticInfo(parentSelector, activeClass){
    const elements = new $s(`${parentSelector} div`).all;
    new $s(parentSelector).s.addEventListener('click', (e) => {
        let target = e.target;
        if(target.classList.contains('calculating__choose-item')){

            if(target.getAttribute('data-ratio')){
                ratio = +target.getAttribute('data-ratio');
            }else{
                sex = target.getAttribute('id');
            }
            
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            target.classList.add(activeClass);

            calcTotal();
        }
    });
}

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('#ratio', 'calculating__choose-item_active');

function getDynamicInfo(selector){
    const input = new $s(selector).s;
    input.addEventListener('input', () => {
        switch(input.getAttribute('id')){
        case'height':
            height = +input.value;
            calcTotal();
            break;
        case'weight':
            weight = +input.value;
            calcTotal();
            break;
        case'age':
            age = +input.value;
            calcTotal();
            break;
        };
        
    });calcTotal();
    
}
getDynamicInfo('#height');
getDynamicInfo('#weight');
getDynamicInfo('#age');

//Forms

const forms = new $s('form').all;


const messages = {
    loading:'загрузка',
    success:'Спасибо, скоро мы с вами свяжемся',
    error:'Что-то пошло не так...'
}

forms.forEach(item => {
    postData(item)
});

//Функция для очистки полей формы;
function clearInputValue() {
    for(let i =0; i < forms.length; i++){
        let inputArr = forms[i].querySelectorAll('input');
        inputArr.forEach(item => {
            item.value =""
        })
    }
}


function postData(form){
    form.addEventListener('submit', (e) => {
       e.preventDefault();//Эта команда в ajax должна идти всегда в самом начале.
        
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = messages.loading; 
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // request.setRequestHeader('Content-type', 'multipart/form-data');//При работе с конструктором FormData, который у нас ниже, заголовок создавать не нужно, он создастся автоматически.

        const formData = new FormData(form);//Этот объект САМ собирает все фомры и берет из них значение по атрибуту "name";
        request.send(formData);
        request.addEventListener('load', () => {
            if(request.status === 200){
                // console.log(request.response);
                statusMessage.textContent = messages.success; 
                setTimeout(function(){
                    statusMessage.textContent ="";
                    clearInputValue();
                }, 3000)
            }else{
                statusMessage.textContent = messages.error; 
                setTimeout(function(){
                    statusMessage.textContent ="";
                }, 3000)
            }
        })
    });
}







































});



















