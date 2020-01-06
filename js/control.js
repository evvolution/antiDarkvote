$(document).ready(function(){

})

window.onload = function() {
	initSlide();
}


function initSlide(){
    var tabsSwiper = new Swiper('.tabs-container', {
        speed: 800,
        on: {
            slideChangeTransitionStart: function() {
                $(".tabs .active").removeClass('active');
                $(".tabs a").eq(this.activeIndex).addClass('active');
            }
        }
    })
    $(".tabs a").on('click', function(e) {
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
    })
}