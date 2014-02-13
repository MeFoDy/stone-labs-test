function parallax( koef ) {
    var scrolled = $(window).scrollTop();
    $('body').css('background-position', '50% ' + (-(scrolled / koef)) + 'px');
}

$(document).ready(function() {
	$(window).scroll(function(e){
	    parallax(3);
	});
});