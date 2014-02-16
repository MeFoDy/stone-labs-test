function parallax( koef ) {
    var scrolled = $(window).scrollTop();
    $('body').css('background-position', '50% ' + (-(scrolled / koef)) + 'px');
}

$(document).ready(function() {
	$(window).scroll(function(e){
	    parallax(3);
	});
});



/**
$(document.body).on('appear', 'section h3', function(e, $affected) {
    // this code is executed for each appeared element
    $(this).yellowFade();

    $appeared.empty();
    $affected.each(function() {
      $appeared.append(this.innerHTML+"\n");
    })
  });

  $(document.body).on('disappear', 'section h3', function(e, $affected) {
    // this code is executed for each disappeared element
    $disappeared.empty();
    $affected.each(function() {
      $disappeared.append(this.innerHTML+"\n");
    })
  });


  [a-zA-Z][a-zA-Z0-9\.,\-_]{5,31}
  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
  */