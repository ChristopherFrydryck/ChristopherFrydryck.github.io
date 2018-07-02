
	$(function(){
		$(".welcome-one").delay(500).fadeIn(1000);
		$(".getStarted").delay(1500).fadeIn(1000);
		$(".indexpara").delay(2500).fadeIn(1000);
    $("#bkgImg").delay(2000).fadeIn(1000);
    $("#bkgImgBottom").delay(2600).show();
    $("#portfolioDiv").delay(2600).fadeIn(1000);
    $("#contactDiv").delay(2600).fadeIn(1000);
    $(".arrowDownContact").delay(2600).fadeIn(1000);
    $("#bottomDiv").delay(2600).fadeIn(1000);


  

	});

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

	var helloArray = ['Hello','Bonjour','Hola','Nǐ hǎo','Ciao','Dobrý den','Guten Tag','Namasté','Kon\'nichiwa','Olá','Aloha','Xin chào','Shalom','Hallo','Dia duit'], i = 0;
	var colorArray = ['green', '#4a75c7', '#b260bb', 'orange', 'red', '#f4da55', '#cc1c85', 'pink'], i = 0;
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

   if (w > 890) {
     $('nav').css('display', 'block');
  }
  }

  

  $('.mobile-toggle').click(function() {
    if (showing == false) {
      $('nav').css('visibility', 'visible');
      showing = !showing;
      $('nav').delay(300).slideDown(300);
      $('#appearBox').fadeOut(300);
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

  $('.name').click(function(){
      if (w <= 890) {
      $('nav').slideUp(300);
      showing = false;
      $('#appearBox').delay(300).fadeToggle(300);
      $('.mobile-toggle').removeClass('change');
    }else{
      $('#appearBox').delay(300).fadeToggle(300);
    }

  });



$(window).resize(function(){

  if (w <= 890) {
    $('nav').css('display', 'none');
    $('.mobile-toggle').removeClass('change');
    showing = false;
   
  } else {
    $('nav').css('display', 'block');
  }
  });

    

$(document).scroll(function() {
  var y = $(this).scrollTop();
  var about = $('#spacerOne').offset();
  var portfolio = $('#spacerTwo').offset();
  var contact = $('#spacerThree').offset();

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
  }if (y >= contact.top - 120){
    $('.m-link').removeClass('active');
    $('.contact').addClass('active')
  }


  });

  $('.portSub').click(function(){
   
    if($(this).hasClass('portValet') == true){
      $('.portSub').removeClass('portActive');
      $('.portValet').addClass('portActive');
      $('.portInfo').html('Valet is an app design I am working on that is a parking solutions app for the public.  From early stages to logo design, Valet was a barebones challenge to redesign what never existed in the first place.  The design is an attempt at minimalist and flat design to maximize usability without providing a three dimensional hierarchy.');
      $('.container').fadeOut();
      $('.containerValet').delay(250).fadeIn();
    }if($(this).hasClass('portLiveTracking') == true){
      $('.portSub').removeClass('portActive');
      $('.portLiveTracking').addClass('portActive');
      $('.portInfo').html('Working with Freedom Transit in Washington, Pennsylvania to design and develop a live tracking web app was a challenge myself and my teammates were willing to step up to.  Using Google Firebase, Java, Javascript, HTML, CSS and JQuery to match their current website aesthetic, we accomplished and successfully completed a responsive web app that works for most devices, regardless of their browser or operating system.');
      $('.container').fadeOut();
      $('.containerLiveTracking').delay(250).fadeIn();
    }if($(this).hasClass('portHumanIntrusion') == true){
      $('.portSub').removeClass('portActive');
      $('.portHumanIntrusion').addClass('portActive');
      $('.portInfo').html('When I traveled out to the southwestern United States, I never expected to experience what I witnessed.  Scolding heat, flat plains and cacti everywhere is the stereotypical trip out west; what I really witnessed was a still beautiful, but well-established human sanctuary.  Water is soon becoming a luxury and what was once natural is now habited where humans don’t belong.  These are the photographs of human interaction with nature, but where we define intrusion varies.');
      $('.container').fadeOut();
      $('.containerHumanIntrusion').delay(250).fadeIn();
    }if($(this).hasClass('portMega') == true){
      $('.portSub').removeClass('portActive');
      $('.portMega').addClass('portActive');
      $('.portInfo').html('As a case study and overview of a security project, I was assigned Mega.nz, the successor to the infamous MegaUpload that was shut down by the FBI in 2012.  Mega.nz is a similar file sharing network among private parties that allows end-to-end encryption using AES.  This pamphlet was a project I designed and decided to add to my portfolio to showcase print design.');
      $('.container').fadeOut();
      $('.containerMega').delay(250).fadeIn();

    }
  });

});  
  
  