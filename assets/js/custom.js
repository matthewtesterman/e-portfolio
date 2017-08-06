/*
* @author mtesterman
* @file
* @description
*/

var scrollPos = $(window).scrollTop(); // get current position of user scroll
var coloredBGNav = false; //determined if navbar has colored bg
var viewWidth = $(window).width(); //get current window width size

$(function() {

  //Iniital page load operations:

  //If scroll position is not in top position then set navigation bg color.
  changeNavColor();
  scrollToLink();
   $('[data-toggle="tooltip"]').tooltip();   
  $('nav').toggle( "slide", {"direction": "up"});

  $('#ep-intro .text-box').toggle( "slide", {"direction": "right"}, function(){
    $('#ep-intro .text-box .text').animate({'opacity':'1.0'});
  });

  $('#ep-quote-1 .text-box').toggle( "slide", {"direction": "left"} );

  $('.ep-wh-text-boxes').toggle('slide', {'easing': 'easeOutBack', 'duration': 500});
  $('#ep-wh  .ep-wh-potrait').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 1500});

  //METHOD EFFECTS:
  $('#ep-methodology h1').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
  $('#ep-methodology .column-1').toggle('slide', {'direction': 'left','easing': 'easeInCirc', 'duration': 500});
  $('#ep-methodology .column-2').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
  $('#ep-methodology .column-3').toggle('slide', {'direction': 'right','easing': 'easeInCirc', 'duration': 500});


  //animateSkillsSection();

  //Work History
  var cardPos = 1;
$('.btn-read-more').click(function(e){
  e.preventDefault();
  $('.ep-wh-text-boxes').toggle('slide', {'direction':'right','easing': 'easeOutBack', 'duration': 500}, function() {
    if (cardPos === 1) {
      cardPos++;
      $('#text-1').css('display','none');
      $('#text-2').fadeIn();
    }
    else if(cardPos === 2) {
      cardPos++;
      $('#text-2').css('display','none');
      $('#text-3').fadeIn();
    }
    else if (cardPos === 3) {
      cardPos = 1;
      $('#text-3').css('display','none');
      $('#text-1').fadeIn();
    }
    else {
      cardPos = 1;
      $('#text-3').css('display','none');
      $('#text-1').fadeIn();
    }
    console.log(cardPos);

    $('.ep-wh-text-boxes').toggle('slide', {'easing': 'easeOutBack', 'duration': 500});
  }
);
});

  //Navigation Effects

  //Change background-color of navigation bar to GREEN or NONE based on scroll postion
  $(window).scroll(function(){
    changeNavColor();

  });

  loop();
  hotAirBalloonDrift();
  moveClouds();
  hotAirBalloonDrift2();
});

/*When user clicks link from navbar then scroll them to the
desired section.*/
function scrollToLink() {
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
}

$()

/*Toggle the navigation bar's background-color to green or none
(depending on view width and scroll position)*/
function changeNavColor() {
  scrollPos = $(window).scrollTop();
  var viewWidth = $(window).width();

  if ((scrollPos > 0 && !coloredBGNav) || viewWidth <  768)
  {
    $('.navbar ').animate({'background-color':'rgba(34,181,115,0.8)'});
    coloredBGNav = true;
  }
  else if (scrollPos <= 0 && coloredBGNav) {
    $('.navbar ').animate({'background-color':'transparent'});
    coloredBGNav = false;
  }
}

//Using JQuery and JQuery UI to animate this section
function animateSkillsSection()
{
  $("#ep-skills .title").toggle("blind", function() {
    $('#ep-skills .img-1').toggle( "explode", function(){

      $("#ep-skills .column-1 h1").toggle("blind",function(){
        $("#ep-skills .column-1 h4").toggle("blind");
      });
    });
    $('#ep-skills .img-2').toggle( "explode", function(){
      $("#ep-skills .column-2 h1").toggle("blind",function(){
        $("#ep-skills .column-2 h4").toggle("blind");
      });
    });
    $('#ep-skills .img-3').toggle( "explode", function(){
      $("#ep-skills .column-3 h1").toggle("blind",function(){
        $("#ep-skills .column-3 h3").toggle("blind");
      });
    });
  });
}

function loop() {
  $('#ep-ty #ep-ty-astronaut').animate({'top': '30vh'}, {
    duration: 1000,
    complete: function() {
      $('#ep-ty #ep-ty-astronaut').animate({'top': '25vh'}, {
        duration: 1000,
        complete: loop});
      }});


    }
    function hotAirBalloonDrift() {
      $('#ep-intro .hot-air-balloon ').animate({'top': '18vh'}, {
        duration: 1500,
        easing: 'linear',
        complete: function() {
          $('#ep-intro .hot-air-balloon ').animate({'top': '20vh'}, {
            duration: 1500,
            easing: 'linear',
            complete: hotAirBalloonDrift});
          }});
        }
        var balloonStep = 0;
        var left1 = '+=1vw';
        var left2 = '+=2vw';

        //Hot Air balloon effects from first quote
        function hotAirBalloonDrift2() {
          //If steps greater than 10 then reverse directions; if greater than 20 then reset
          if (balloonStep >= 10 && balloonStep < 20){
          left1 = '-=1vw';
          left2 = '-=2vw';
          }
          else if (balloonStep >= 20)
          {
            left1 = '+=1vw';
            left2 = '+=2vw';
            balloonStep = 0;
          }
          //Move object up/down and/or left/right
          $('#ep-quote-1 .hot-air-balloon').animate({'top': '-=2vh','left': left1}, {
            duration: 2000,
            easing: 'linear',
            complete: function() {
              $('#ep-quote-1 .hot-air-balloon').animate({'top': '+=2vh', 'left': left2}, {
                duration: 2000 ,
                easing: 'linear',
                complete: hotAirBalloonDrift2});
              }});
                balloonStep++;
            }

            function moveClouds() {
              $('#ep-intro .clouds').css('display','none');
              var randTopPos = (Math.floor((Math.random() * 40) +20)) + "vh";
              $('.clouds').css('top',randTopPos);
              $('#ep-intro .clouds').animate({'right': '100%'}, {
                duration: 0,
                complete: function() {
                  $('#ep-intro .clouds').css('display','block');
                  $('#ep-intro .clouds').animate({'right': '-150%'}, {
                    duration: 8000,
                    easing: 'linear',
                    complete: moveClouds}
                  );
                }
              });
            }
            /* todo:

            Nav

            Intro Title
            ~need hyperlink scrollto to div for the first button.
            ~need the text box to animate using jquery
            ~
            Quote #1 ~
            ~animate the div opening up upon scroll. Make it grow to x height.
            ~animate text appearing and background appear?
            Skills ~
            ~animate the entire section to open up to vh size and animate columns onto the screen.
            */

            //If view height is less than x pixels then hide all the moving objects
