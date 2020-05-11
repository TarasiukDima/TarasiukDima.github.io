$(document).ready(() => {
    /*  menu scroll anchor   */
    $('a.header_nav-link[href^="#').click(function (e) {
        let anchor = $(this).attr('href');
        $('html, body').animate({scrollTop: $(anchor).offset().top }, 1000);
        e.preventDefault();
        $(".header").removeClass('left_menu');
    });
    /*  menu scroll anchor   */

    /*  btn language   */
    $('input.header_language_input[type="checkbox"]').click(function() {
        let inputCheck = $('input.header_language_input[type="checkbox"]').prop("checked");
        if (inputCheck) {
            $('.Russian').css('display', 'none');
            $('.English').css('display', 'block');
        } else {
            $('.Russian').css('display', 'block');
            $('.English').css('display', 'none');
        };
    });
    /*  btn language   */

    /*   close menu  */
    $('.close_menu').click(() => {
        $(".header").toggleClass('left_menu');
    })
    $('html, body').click((e) => {
        let menu = $(".header"); 
        if (!menu.is(e.target) && menu.has(e.target).length === 0) { 
            $(".header").removeClass('left_menu');
        }
    });
    /*   close menu  */

    /*   portfolio open and load img    */
    $('.portfolio_work_btn').click(function() {
        console.log('lol')
        let content = $(this).next();
        // lazy loading img
        $('img[data-src]').each(function() {
            let img = $(this);
            img.attr('src',img.attr('data-src'));
            img.removeAttr('data-src');
        });

        content.addClass('site_active');
        $('.close').click(() => {
            $('.site-example').removeClass('site_active');
        });
    });

    /*   portfolio open and load img    */

    //text no select
     document.onselectstart = noselect;
     function noselect() {return false;}

    /*    cube    */
    let rotateY = 50,
        rotateX = 40;
    document.onkeydown = (e) => {
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

        $('.footer_cube').css('transform', 
        'rotateX('+ rotateX + 'deg)'+ 
        'rotateY('+ rotateY + 'deg)');
    };
    /*    cube    */

     // button up
     $('body').append('<button class="btn_up_site"/>');
     $('.btn_up_site').click(function () {
         $('html, body').animate({ 'scrollTop': 0 }, 1000);
     });
     $(window).scroll(function () {
         if ($(window).scrollTop() > 400) {
             $('.btn_up_site').addClass('active_btn');
         } else {
             $('.btn_up_site').removeClass('active_btn');
         }
 
         // about facts visible on scroll
         let aboutFactsTop = $('.about_inform').offset().top;
         let aboutFactsHeight = $('.about_inform').height();
         if($(window).scrollTop() > (aboutFactsTop + (aboutFactsHeight / 15))) {
             $('.about_inform_facts').fadeIn(1500);
         };
     });
     // button up
})




