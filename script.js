function parallax( koef ) {
    var scrolled = $(window).scrollTop();
    $('body').css('background-position', '50% ' + (-(scrolled / koef)) + 'px');
}

function addToggleListener(from, to) {
	var duration = 200;
	$(document).on('click', 'a[href=' + to + ']', function(e) {
		e.preventDefault();
		$(from).slideUp(duration, function() {
			$(to).slideDown(duration);
		});
		$(this).parent().find('a').each(function() { $(this).removeClass('active') });
		$(this).addClass('active');
	});
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateSkype(skype) {
	var re = /^[a-zA-Z][a-zA-Z0-9\.,\-_]{5,31}$/;
	return re.test(skype);
}

function setNospamming(text) {
	var duration = 200;
	$('#nospamming').fadeOut(duration, function() {
		$('#nospamming').html(text).fadeIn(duration);
		$('#sendEmail').removeAttr("disabled").text("Send");
	});
}

function currentDateTime() {
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " в "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	return datetime;
}

$(document).ready(function() {
	$(window).scroll(function(e){
	    parallax(3);
	});

	addToggleListener('#lith', '#us');
	addToggleListener('#us', '#lith');

	$(document).on('click', 'a[href=#]', function(e) { e.preventDefault(); });

	var nospamming = $('#nospamming').html();
	$(document).on('click', '#sendEmail', function() {
		$(this).attr("disabled", "disabled").text("Sending...");
		var input = $('#email').val().trim();
		if (input.length < 50 && (validateSkype(input) || validateEmail(input))) {

			$.ajax({
				type: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				data: {
					'key': 'Nt5JCseE1DTZHRPcAy4qgQ',
					'message': {
					  'from_email': 'mefody93@mail.ru',
					  'to': [
					      {
					        'email': 'ek@stone-labs.com',
					        'type': 'to'
					      }
					    ],
					  'autotext': 'true',
					  'subject': 'Stone Labs Test',
					  'html': '<p>На сайте stone-labs ' + currentDateTime() + ' вам оставили сообщение: "' + input + '"</p>'
					}
				}
			}).done(function(response) {
				setNospamming("Thank you for your query. We'll get in touch with you in 24 hours.")
			});
		} else {
			setNospamming("Please, enter correct e-mail or skype.");
		}
	});

	$('.scrollup').appear();
	$.force_appear();
	$(document).on('appear', '.scrollup', function(e, $elements) {
		$elements.each(function() {
			$(this).animate({'padding-top': '0'}, 700, 'swing');
		});
	});
});
