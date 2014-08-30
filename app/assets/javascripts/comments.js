$( document ).ready(function() {
    $('.more').on('click', function() {
        var $avatar = $(this).parent().parent().parent().find('.avatar');
        $(this).parent().parent().parent().animate({
            height: 250
        }, 450);

        if ($avatar.hasClass('animated')) {
            $avatar.removeClass('animated bounce');
        } else {
            $avatar.addClass('animated bounce');
        }
    });

    $('.send').on('click', function() {


        $('.sidebar').on({
            mouseenter: function() {
                var top = parseInt($(this).find('.avatar').css('top'));
                $(this).find('.avatar').animate({
                    top: 36
                }, 450);
                $(this).find('#socialize').removeClass();
                $(this).find('#socialize').addClass('animated fadeInDown');
            },
            mouseleave: function() {
                var top = parseInt($(this).css('top'));
                $(this).find('.avatar').animate({
                    top: '50%'
                }, 450);
                $(this).find('#socialize').addClass('animated fadeOutUp');
            }
        });
    });

    $('.sidebar').on({
        mouseenter: function() {
            var top = parseInt($(this).find('.avatar').css('top'));
            $(this).find('.avatar').animate({
                top: 36
            }, 250);
            $(this).find('#socialize').removeClass();
            $(this).find('#socialize').addClass('animated fadeInDown');
        },
        mouseleave: function() {
            var top = parseInt($(this).css('top'));
            $(this).find('.avatar').animate({
                top: '50%'
            }, 250);
            $(this).find('#socialize').addClass('animated fadeOutUp');
        }
    });
});