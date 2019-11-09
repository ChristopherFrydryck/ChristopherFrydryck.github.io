
	$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

	var helloArray = ['Hello','Bonjour','Hola','Nǐ hǎo','Ciao','Dobrý den','Guten Tag','Namasté','Kon\'nichiwa','Olá','Aloha','Xin chào','Shalom','Hallo','Dia duit', 'Ahlan', 'Yassas'], i = 0;
	var colorArray = ['#4d69a0', '#4a75c7', '#b260bb', '#85348e', '#d66691', '#e892c1', '#cc1c85', '#a675d1'], i = 0;
	//console.log(helloArray);
	setInterval(function () {       // \/ \/ callback function
		$('#wordChange').fadeOut(800, function() {
		var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
	  	$(this).text( helloArray[(i === helloArray.length-1) ? i = 0 : i += 1 ]).fadeIn(800).css('color', rand);
	  });
	}, 3500);


$(document).ready(function() {
  var myVar = setInterval(myTimer, 200);
  var showing = false;
  var w;
  

  function myTimer() {
   w = $(window).width();

   if (w > 768) {
     $('nav').css('display', 'block');
  }


  }

  

  $('.mobile-toggle').click(function() {
    if (showing == false) {
      $('nav').css('visibility', 'visible');
      showing = !showing;
      $('nav').slideDown(300);
      this.classList.toggle('change');
      //alert(showing);

    } else {
      showing = !showing;

      $('nav').slideUp();
      this.classList.toggle('change');
     // alert(showing);

    }

  });

  $('.m-link').click(function() {
    $('.m-link').removeClass('active');
    $(this).addClass('active');
    
  });




$(window).resize(function(){

  if (w <= 769) {
    $('nav').css('display', 'none');
    $('.mobile-toggle').removeClass('change');
    showing = false;
   
  } else {
    $('nav').css('display', 'block');
  }
  });

    

$(document).scroll(function() {
  var y = $(this).scrollTop();
  var about = $('#aboutDiv').offset();
  var portfolio = $('#portfolioDiv').offset();
  var contact = $('#contactDiv').offset();

  $('#appearBox').fadeOut(300);

  if(y < about.top - 120){
    $('.m-link').removeClass('active');
    $('.home').addClass('active')
  }
  if(y >= about.top - 120){
    $('.m-link').removeClass('active');
    $('.about').addClass('active')
  }if (y >= portfolio.top - 120){
    $('.m-link').removeClass('active');
    $('.portfolio').addClass('active')
  }if (y >= contact.top - 120 || $(window).scrollTop() + $(window).height() == $(document).height()){
    $('.m-link').removeClass('active');
    $('.contact').addClass('active')
  }


  });



});  
  
  