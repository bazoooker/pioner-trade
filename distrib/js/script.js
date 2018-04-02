
	// свайпер
	var swiperMain = new Swiper('.swiper-container-main', {
	  slidesPerView: 1,
	  spaceBetween: 0,
	  navigation: {
	    nextEl: '.js-hero-slider-btn_next',
	    prevEl: '.js-hero-slider-btn_prev',
	  }	  
	});

    var swiperProd = new Swiper('.swiper-container-products', {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.js-products-slider-btn_next',
        prevEl: '.js-products-slider-btn_prev',
      }   
    });

    var swiperNews = new Swiper('.swiper-container-news', {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.js-news-slider-btn_next',
        prevEl: '.js-news-slider-btn_prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },   
    });


	/* МОДАЛЬНЫЕ ОКНА */
$(document).ready(function(){        
    $(".callback-link").on('click', function(){
        var btn = $(this);                        
        $("#overlay").fadeIn(100, function(){
            $($(btn).data('window')).show();                        
        }); 
       $('#callback-window').show();
        return false;
    });
    
    $("#overlay, .modal .modal-close").on('click', function(){
        $("#overlay, .modal").fadeOut();
    $('.modal').find('input, textarea').val('');
        return false;
    });    
    $('.modal').each(function(){
        var f=$(this).find('.modal-content');
        var t=$(this).find('.modal-content-copy');
        t.html(f.html());
        t.hide();

    });
});
/* МОДАЛЬНЫЕ ОКНА END */

// отправка колбека
$(".modal form").on('submit', function(e){
        e.preventDefault();
        var modal = $(this).parents('.modal');
        var form = $(this);         
        $(this).ajaxSubmit({  
            url: "/ajax.php?file="+$(form).data('file'),
            data: $(form).serialize(),
            dataType: "JSON",
            type: "POST",
            success: function(data){
                if(data.done) {
      $(modal).find('.modal-result').html(data.message);
      $(modal).find('.modal-result').show('fast')
      setTimeout("$('.modal-result').hide('fast')",1500);

      setTimeout("$('.modal').hide()",2000);
                  setTimeout("$('#overlay').hide()",2000);
      var f=$(modal).find('.modal-content-copy');
      var t=$(modal).find('.modal-content');
                  setTimeout("$('.modal').find('input, textarea').val('')",3000);
      
                } else {
                    $(modal).find('.modal-errors').html(data.message);
    $(modal).find('.modal-errors').show('fast')
    setTimeout("$('.modal-errors').hide('fast')",1000);
                    $(modal).children(".spinner").hide();
                }
            },
            complete: function(){
                $(modal).children(".spinner").hide();                     
            }
        });
        return false;
    });




// TABS
// =================================
    $('.section-tabs .section-tabs__tabs ul li').click(function() {
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');
        var sectionTabs = $(this).parent().parent().parent().find('.section-tabs__content_type-small');
        sectionTabs.removeClass('concatenated');
        var arrowDirection = $('.collapsable__btn');
        arrowDirection.addClass('untoggled');
        var index = $(this).index();
        $(this).parent().parent().parent().find('.slide').each(function(i, elem) {
            if (i == index) {
                $(elem).slideDown(300);
            } else {
                $(elem).slideUp(300);
            }
        });
    });


    $('.collapsable__btn').on("click", function() {
        $(this).toggleClass('untoggled');
    });



    // TABS SHOW/HIDE FULL CONTENT ON BUTTON CLICK
    // =================================
    $(document).ready(function() {
        $('.collapsable__btn').on("click", function() {
            var sectionTabs = $(this).parent().find('.section-tabs__content_type-small');
            if (sectionTabs.hasClass('concatenated')) {
                sectionTabs.removeClass('concatenated');
            } else {
                sectionTabs.addClass('concatenated');
            }
        });
    });
    // мини табы_____________
    // обьявление масив li
    var li_name = [];
    // расчет количества
    $('.section-tabs .section-tabs__tabs').each(function(i, elem) {
        elem.setAttribute('rel', i);
        $('.section-tabs .section-tabs__tabs[rel=' + i + ']').parent().find('.section-tabs__content').attr('rel', i);
        super_sbor(i);
    });
    // логика сборки 
    function super_sbor(number) {
        $('.section-tabs .section-tabs__tabs[rel=' + number + '] ul li').each(function(i, elem) {
            li_name[i] = elem.innerHTML;
            // console.log('номер '+number+" колич"+i);
        });
        // var el=$('.section-tabs .section-tabs__tabs[rel='+number+'] ul li')
        // console.log(li_name);
        // обьявление контента
        var content = [];
        // сборка контента 
        $('.section-tabs__content[rel=' + number + '] .slide').each(function(i, elem) {
            content[i] = elem.innerHTML;
        });            
        paint_dom(content, li_name, number);
         // функция delete нефигу не пашит на масивах поэтому просто обьявляю пустой массив
        content = new Array();
        li_name = new Array();
    }

    // логика кликов по mini_tab
    $('#mini_tab ul.cd-accordion-menu .has-children').click(function() {
        if ($(this).attr('class') == 'has-children active') {
            $(this).children('.slide_children').slideUp(200);
            $(this).removeClass('active');
        } else {
            $('.slide_children').hide(200);
            console.log("hide me");
            $('#mini_tab ul.cd-accordion-menu .has-children.active').removeClass('active');
            $(this).addClass('active');
            $(this).children('.slide_children').slideDown(200);
        }
    });


// отрисовка нового мини-меню
function paint_dom(content, li_name, number, name_home_dom='section-tabs__tabs') {
    var structur_dom = '<ul class="cd-accordion-menu">';
    for (var i = 0; i < li_name.length; i++) {
        // делаем пустышку пустышкой
        if (content[i] == undefined) {
            content[i] = ' ';
        }
        structur_dom = structur_dom + '<li rel=' + i + ' class="has-children"><label class="group-1">' + li_name[i] + '</label><div style="display:none;" class="slide_children">' + content[i] + '</div></li>';
    }
    structur_dom = structur_dom + '</ul>';
    // вывод структуры mini_tab
    if (name_home_dom=='section-tabs__tabs') {
     $('.section-tabs__tabs[rel=' + number + '] ').append("<div id='mini_tab'>" + structur_dom + "</div>");
    }else{

      $('.'+name_home_dom+'').append("<div id='mini_tab'>" + structur_dom + "</div>");
    }
}




// ACCORDEON
// =================================

$(document).ready(function () {
    // $('.js-accordeon .js-accordeon__content').slideUp(0);
    
    $('.js-accordeon .js-accordeon__label').click(function() {

        // подсвечиваем открытый аккордеон
        if ( $(this).parent().hasClass('opened') ) {
            $(this).parent().removeClass('opened');
            $(this).parent().find('.js-accordeon__content').slideUp(300);
        }
        else {
            $(this).parent().addClass('opened');
            $(this).parent().find('.js-accordeon__content').slideDown(300);
        }
    });
})
    


    // $('.collapsable__btn').on("click", function() {
    //     $(this).toggleClass('untoggled');
    // });