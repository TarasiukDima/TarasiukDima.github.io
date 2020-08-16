document.addEventListener('DOMContentLoaded', function () {

    const menu = document.querySelector(".header");
    const hamburger = document.querySelector('.close__menu');
    const speed = 1000;
    const moving_frequency = 15; 
    const links = document.getElementsByClassName('header__anchor');
    const btn = document.createElement('button');
    btn.classList.add('btn__up');
    document.querySelector('body').append(btn);
    const btnUp = document.querySelector('.btn__up');
    const btnLanguage = document.querySelector('input.language__input');
    const russianElement = document.querySelectorAll('.Russian');
    const englishElement = document.querySelectorAll('.English');
    const contactsVarient = document.querySelectorAll('.contact__link');
    const arrayPhrasesRuss = ['Соцсеть linkedin', 'Соцсеть Вконтакте', 'Написать письмо', 'Связаться в скайпе']; 
    const arrayPhrasesEngl = ['Social Network linkedin', 'Social Network Vkontakte', 'Write a letter', 'Contact on Skype'];
    const hiddenImg = document.querySelectorAll('img[data-src]');
    const btnsPortfolio = document.querySelectorAll('.work__btn');
    const portfolioExample = document.querySelectorAll('.site__example');
    const cubeFigure = document.querySelector('.footer__cube');



    /*   open - close menu start */
    document.querySelector('.close__menu').addEventListener('click', () => {
        menu.classList.toggle('left__menu');
    })

    document.addEventListener('click', e => {
        let target = e.target;
        let its_menu = target == menu || menu.contains(target);
        let its_hamburger = target == hamburger;
        let menu_is_active = menu.classList.contains('left__menu');
        if (!its_menu && !its_hamburger && menu_is_active) {
            menu.classList.toggle('left__menu');
        }

        if (target.classList.contains('close')) {
            portfolioExample.forEach(el => el.classList.remove('site_active'));
        }
    })
/*   open - close menu end */
    
    
    /*  menu scroll anchor  start */
    for (let i of links) {   
        let href = (i.attributes.href === undefined) ? null : i.attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.substr(0, 1) == '#'){
            i.onclick = function(){
                let element;
                href = this.attributes.href.nodeValue.toString();
                if(element = document.getElementById(href.substr(1))){
                    let hop_count = speed/moving_frequency
                    let getScrollTopDocumentAtBegin = getScrollTopDocument();
                    let gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                    for(let i = 1; i <= hop_count; i++){
                        (function(){
                            let hop_top_position = gap*i;
                            setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                        })();
                    }
                }
                menu.classList.toggle('left__menu');
                return false;
            };
        }
    }
    const getScrollTopElement =  function (e){
        let top = 0;
        while (e.offsetParent != undefined && e.offsetParent != null){
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }
        return top;
    };
    const getScrollTopDocument = function () {
        return document.documentElement.scrollTop + document.body.scrollTop;
    };
    /*  menu scroll anchor end  */


    /*  button up start  */
    window.addEventListener('scroll', trackScroll);
    btnUp.addEventListener('click', backToTop);

    function trackScroll() {
        let scrolled = window.pageYOffset;
    
        if (scrolled > 150 ) {
          btnUp.classList.add('active__btn');
        } else {
          btnUp.classList.remove('active__btn');
        }
    }
    function backToTop() {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -80);
          setTimeout(backToTop, 10);
        }
    }
    /*  button up end  */
    

    /*  btn language start  */
    btnLanguage.addEventListener('click', function () {
        if (this.checked) {
            for (let i = 0; i < contactsVarient.length; i++){
                contactsVarient[i].children[0].setAttribute('title', arrayPhrasesEngl[i])
            }
            russianElement.forEach(el => el.style.display = 'none' );
            englishElement.forEach(el => el.style.display = 'block' );
        } else {
            for (let i = 0; i < contactsVarient.length; i++){
                contactsVarient[i].children[0].setAttribute('title', arrayPhrasesRuss[i])
            }
            russianElement.forEach(el => el.style.display = 'block' );
            englishElement.forEach(el => el.style.display = 'none');
        };
    })
    /*  btn language  end */


    /* portfolio open and load img  start  */
    let once = true;
    btnsPortfolio.forEach(el => el.addEventListener('click', function () {
        let content = this.nextElementSibling;

        if (once) {
            hiddenImg.forEach(el => {
                el.setAttribute('src', el.getAttribute('data-src'))
                el.removeAttribute('data-src');
            });
            once = false;
        }

        content.classList.add('site_active');
    }))
    /* portfolio open and load img  end  */

    /*text no select start*/
     document.onselectstart = noselect;
     function noselect() { return false; }
    /*text no select end*/
    
    
    /*    cube  start  */
    let rotateY = 50;
    let rotateX = 40;
    document.addEventListener('keydown', (e) => {
             if (e.keyCode === 65) rotateY -= 15;
        else if (e.keyCode === 87) rotateX += 15;
        else if (e.keyCode === 68) rotateY += 15;
        else if (e.keyCode === 83) rotateX -= 15;
        
        if ((rotateX >= 360) || (rotateX <= -360)) {
            rotateX = 0
        }
        if ((rotateY >= 360) || (rotateY <= -360)) {
            rotateY = 0
        }
        cubeFigure.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    /*    cube   end */

    
    /* animate title start */
    const position = document.querySelector('.about__facts');
    const positionTitle = document.querySelectorAll('.title');
    window.addEventListener('scroll', function (e) {
	    posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (position.offsetTop - 750 <= posTop && !position.classList.contains('fade__in')) {
            position.classList.add('fade__in')
        }

        for (let i of positionTitle) {
            if (i.offsetTop - 750 <= posTop && !i.classList.contains('fade__in')) {
                i.classList.add('fade__in')
            }
        }
    });
    /* animate title end */
    
});