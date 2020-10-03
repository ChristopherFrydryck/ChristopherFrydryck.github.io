
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
  

var skills = [
  {
    name: "HTML",
    className: "dev"
  },
  {
    name: "CSS/SCSS",
    className: "dev"
  },
  {
    name: "Javascript (ES7)",
    className: "dev"
  },
  {
    name: "Typescript",
    className: "dev"
  },
  {
    name: "React",
    className: "dev"
  },
  {
    name: "React Native",
    className: "dev"
  },
  {
    name: "Node.js",
    className: "dev"
  },
  {
    name: "Git",
    className: "dev"
  },
  {
    name: "Java",
    className: "dev"
  },
  {
    name: "MySQL",
    className: "dev"
  },
  {
    name: "Firebase",
    className: "dev"
  },
  {
    name: "UX design",
    className: "des"
  },
  {
    name: "UI design",
    className: "des"
  },
  {
    name: "Interaction design",
    className: "des"
  },
  {
    name: "Wireframing",
    className: "des"
  },
  {
    name: "Rapid prototyping",
    className: "des"
  },
  {
    name: "Photography",
    className: "des"
  },
  {
    name: "Usability testing",
    className: "res"
  },
  {
    name: "Stakeholder mapping",
    className: "res"
  },
  {
    name: "A/B testing",
    className: "res"
  },
  {
    name: "Sketch",
    className: "tool"
  },
  {
    name: "Figma",
    className: "tool"
  },
  {
    name: "Axure RP",
    className: "tool"
  },
  {
    name: "Adobe XD",
    className: "tool"
  },
  {
    name: "Origami Studio",
    className: "tool"
  },
  {
    name: "Zeplin",
    className: "tool"
  },
  {
    name: "Abstract",
    className: "tool"
  },
  {
    name: "Invision",
    className: "tool"
  },
  {
    name: "Adobe Photoshop",
    className: "tool"
  },
  {
    name: "Adobe Illustrator",
    className: "tool"
  },
  {
    name: "Adobe InDesign",
    className: "tool"
  },
  {
    name: "Adobe After Effects",
    className: "tool"
  },
  {
    name: "XCode",
    className: "tool"
  },
  {
    name: "Android Studio",
    className: "tool"
  },
  {
    name: "UserZoom",
    className: "tool"
  },
  {
    name: "Stripe API",
    className: "tool"
  },
  {
    name: "Journey mapping",
    className: "res"
  },
  {
    name: "Persona validation",
    className: "res"
  },
  {
    name: "User surveys",
    className: "res"
  },
  {
    name: "System usability scale (SUS)",
    className: "res"
  },
  {
    name: "User interviews",
    className: "res"
  },
  {
    name: "Ethnographic field studies",
    className: "res"
  },
]
var skillsAlphabetical = skills.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 0)


document.addEventListener('DOMContentLoaded', function() {
  let returnVal = "";
 
  for(let i = 0; i < skillsAlphabetical.length; i++){
    returnVal += `<a onclick="return filterSkills('${skillsAlphabetical[i].className}');" class="${skillsAlphabetical[i].className}">${skillsAlphabetical[i].name}</a>`
  }

  document.getElementById('skillsList').innerHTML = returnVal
})

function filterSkills(skill){
  let returnarr = null;
  let returnVal = "";
  if(skill === "all"){
    returnarr = skillsAlphabetical
  }else{
    returnarr = skillsAlphabetical.filter(x => x.className === skill);
  }
  document.getElementById('skillsList').innerHTML = ""

  document.querySelectorAll(".tab").forEach(x => x.classList.remove('active'))
  document.querySelectorAll(`.tab.${skill}`)[0].classList.add('active')

  for(let i = 0; i < returnarr.length; i++){
    if(skill === 'all'){
      returnVal += `<a onclick="return filterSkills('${returnarr[i].className}');" class="${returnarr[i].className}">${returnarr[i].name}</a>`
    }else{
      returnVal += `<a onclick="return filterSkills('all');" class="${returnarr[i].className}">${returnarr[i].name}</a>`
    }
  }
  document.getElementById('skillsList').innerHTML = returnVal;


}



$(document).ready(function() {
  var showing = false;

  $('.mobile-toggle').click(function() {
    if (showing == false) {
      $('#nav').css('visibility', 'visible');
      $('#nav').css('display', 'block')
      showing = !showing;
      // $('#nav').slideDown(300);
      this.classList.toggle('change');
      //alert(showing);

    } else {
      showing = !showing;
      $('#nav').css('visibility', 'hidden');
      $('#nav').css('display', 'none')
      // $('#nav').slideUp();
      this.classList.toggle('change');
     // alert(showing);

    }

  });

  $('.m-link').click(function() {
    $('.m-link').removeClass('active');
    $(this).addClass('active');
    
  });






$(window).resize(function(){

  if ($(window).width() <= 768) {
    $('#nav').css('display', 'none');
    $('#nav').css('visibility', 'hidden');
    $('.mobile-toggle').removeClass('change');
    showing = false;
   
  } else {
    $('#nav').css('display', 'flex');
    $('#nav').css('visibility', 'visible');
  }
  });

    

$(document).scroll(function() {
  var y = $(this).scrollTop();
  var about = $('#aboutDiv').offset();
  var portfolio = $('#portfolioDiv').offset();
  var contact = $('#contactDiv').offset();

  $('#appearBox').fadeOut(300);

  if(y < portfolio.top - 120){
    $('.m-link').removeClass('active');
    $('.home').addClass('active')
  }
  if(y >= portfolio.top - 120){
    $('.m-link').removeClass('active');
    $('.portfolio').addClass('active')
  }if (y >= about.top - 120){
    $('.m-link').removeClass('active');
    $('.about').addClass('active')
  }if (y >= contact.top - 120 || $(window).scrollTop() + $(window).height() == $(document).height()){
    $('.m-link').removeClass('active');
    $('.contact').addClass('active')
  }


  });



});  
  
  