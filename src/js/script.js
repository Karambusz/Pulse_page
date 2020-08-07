$(document).ready(function(){
    $('.carousel__inner').slick(
        {
            speed: 700,
            //adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            dotsClass: "my-dots",
            prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.png"> </button>', //without ../, because we adding tag to index.html
            nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.png"> </button>',
            responsive: [ // adaptive for phones
                {
                breakpoint: 992, // setting for 0-992px
                settings: {
                dots: true,
                arrows: false
                }
            }
            ]
        }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    
    // validate

    function validateForms(form) {
        $(form).validate({
            rules : {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильный адрес!!! Пример: name@domain.com"
                }
              }
        });
    }

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    // maskedinput
    $('input[name=phone]').mask("+7 (999) 999-9999");

    //post
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn('slow');
        } else {
            $('.pageup').fadeOut('slow');            
        }
    });

    $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

      
  });

 