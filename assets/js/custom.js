/***********************************
* @author matthewtesterman
* @file custom.js
* @description Applies JQuery and JQuery UI effects to the root index.html file.
************************************/

//Global Variables
var scrollPos = $(window).scrollTop(); // get current position of user scroll
var coloredBGNav = false; //determined if navbar has colored bg
var viewWidth = $(window).width(); //get current window width size
var cardPos = 1; //Keep Track of Card Position in the #ep-wh section.
var currentSection = ""; //Track position in which section (ex: intro, skills, etc.)
var posIntro, posQuote1, posSkills, posMethod, posQuote2, posWorkHist, posSampleWork, posContact, posGoodBye; //Scroll Postions of Sections
var animateIntroIsOn = false, animateIntroIsOn = false, animateSkillsIsOn = false, animateQuote1IsOn = false, animateWorkHistoryIsOn = false, animateQuote2IsOn = false, animateSampleWorkIsOn = false; animateGoodByeIsOn = false; animateContactIsOn = false, animateMethodologyIsOn = false;
var priorScrollPos, currentScrollPos, firstScroll = true, navHidden = false; //For navbar functionality

//On ready Function
$(function() {
  changeNavColor(); //Display the navigation bar according to scroll location
  getSectionScrollPos(); //Get scroll positions of every section and assign them to vars.
  scrollToLink(); //Enables user to scroll to section upon clicking the nav link.

  //If in mobile then do not animate any effects
  if ($(window).width() < 768) {
    //Remove fixed from images for mobile devices.
    $('#ep-intro').css('background-attachment','scroll');
    $('#ep-wh').css('background-attachment','scroll');
    $('#ep-ty').css('background-attachment','scroll');
    displayAllSections(); //display all hidden objects
  }
  else {
    scrollEffectSection(); //Call effects for the specific section the user is in upon the page load.
    //Call looping animation for various sections
    loopAstronaut();
    hotAirBalloonDrift();
    moveClouds();
    //On Scroll Event to handle navigation bar visibility and fire events up when scroll over.
    $(window).scroll(function(){
      scrollEffectSection();
      changeNavColor();
    });
  }


  //Enable Bootstrap Tooltip feature used for github nav icon
  $('[data-toggle="tooltip"]').tooltip();

  //Slide the navigation bar onto screen initially.
  $('nav').toggle( "slide", {"direction": "up"});

  //Event Handler for the Work History Section that rotats the cards by clicking it's button.
  $('.btn-read-more').click(function(e){
    e.preventDefault();
    $('.ep-wh-text-boxes').toggle('slide', {'direction':'left','easing': 'easeOutBack', 'duration': 500}, function() {
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
      $('.ep-wh-text-boxes').toggle('slide', {'direction':'right','easing': 'easeOutBack', 'duration': 500});
    }
  );
});
}); //End of On Ready Function


/*FUNCTIONS*/ 


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

/*Toggle the navigation bar's background-color to green or none
(depending on view width and scroll position)*/
function changeNavColor() {
  scrollPos = $(window).scrollTop();
  var viewWidth = $(window).width();

  if ((scrollPos > 0 && !coloredBGNav) || viewWidth <  768)
  {
    $('.navbar ').animate({'background-color':'#1F90E5'});
    coloredBGNav = true;
  }
  else if (scrollPos <= 0 && coloredBGNav) {
    $('.navbar ').animate({'background-color':'transparent'});
    coloredBGNav = false;
  }
}

// Loops the astronaut animation for the last Section
function loopAstronaut() {
  $('#ep-ty #ep-ty-astronaut').animate({'bottom': '+=5vh'}, {
    duration: 1000,
    complete: function() {
      $('#ep-ty #ep-ty-astronaut').animate({'bottom': '-=5vh'}, {
        duration: 1000,
        complete: loopAstronaut});
      }});
    }

    //Loops the hot air balloon for the quote section
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
            duration: 1000,
            easing: 'linear',
            complete: function() {
              $('#ep-quote-1 .hot-air-balloon').animate({'top': '+=2vh', 'left': left2}, {
                duration: 1000 ,
                easing: 'linear',
                complete: hotAirBalloonDrift2});
              }});
              balloonStep++;
            }

            //Loops the clouds for the intro section
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

            //Animates Intro Section
            function animateIntro() {
              $('#ep-intro .text-box').toggle( "slide", {"direction": "right"}, function(){
                $('#ep-intro .text-box .text').animate({'opacity':'1.0'});
              });
              animateIntroIsOn = true;
            }

            //Animates the first quote Section
            function animateQuote1() {
              $('#ep-quote-1 .text-box').toggle( "slide", {"direction": "left", 'easing': 'easeInOutBack', 'duration': 1000});
              $('#ep-quote-1 .hot-air-balloon').toggle({"direction": "down"});
              hotAirBalloonDrift2();
              animateQuote1IsOn = true;
            }

            //Animates the Skills Section
            function animateSkillsSection() {
              $("#ep-skills #wrench").toggle('slide', {'direction':'up','easing': 'easeOutBounce', 'duration': 1000});
              $("#ep-skills #flashlight").toggle('slide', {'direction':'right','easing': 'linear', 'duration': 1000},function(){
                $('#ep-skills .title').fadeIn();
                $('#ep-skills .skill-list-row').toggle('slide', {'direction':'left','easing': 'easeInOutBack', 'duration': 1000});
                $('#ep-skills .skill-img-row').toggle('slide', {'direction':'right','easing': 'easeInOutBack', 'duration': 1000});
              });
              animateSkillsIsOn = true;
            }

            //Animates the Work History Section
            function animateWorkHistory() {
              $('.ep-wh-text-boxes').toggle('slide', {'easing': 'easeOutBack', 'duration': 500});
              $('#ep-wh  .ep-wh-potrait').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 1500});
              animateWorkHistoryIsOn = true;
            }

            //Animates the Methodology Section
            function animateMethodology() {
              $('#ep-methodology h1').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-1').toggle('slide', {'direction': 'left','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-2').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-3').toggle('slide', {'direction': 'right','easing': 'easeInCirc', 'duration': 500});
              animateMethodologyIsOn = true;
            }

            //Animates the Quote 2 Section
            function animateQuote2() {
              $('#ep-quote-2 .text').toggle('slide', {'direction': 'right','easing': 'easeInOutBack', 'duration': 1000});
              $('#ep-quote-2 .cyclops').toggle('slide', {'direction': 'down','easing': 'easeOutCubic', 'duration': 2000});
              animateQuote2IsOn = true;
            }

            //Animates the Sample Work Section
            function animateSampleWork() {
              $('#ep-top-row').toggle('slide',{'direction':'up','duration':'1000'})
              $('#ep-bottom-row').toggle('slide',{'direction':'down','duration':'1000'})
              animateSampleWorkIsOn = true;
            }

            //Animates the work Contact Section
            function animateContact() {
              $('#ep-phone').toggle('slide',{'direction':'left','duration':'1000'}, function() {
                $('#ep-resume').toggle('slide',{'direction':'right','duration':'1000'}, function() {
                  $('#ep-media').toggle('slide',{'direction':'left','duration':'1000'}, function() {
                    $('#ep-email').toggle('slide',{'direction':'right','duration':'1000'});
                  });
                });
              })
              animateContactIsOn = true;
            }

            //Animates the last Section
            function animateGoodBye() {
              //ep-ty-text
              $('#ep-ty #ep-ty-text').toggle('slide', {'direction':'up', 'direction' : 'left'}, function() {
                $('#ep-ty-meteor').animate({'left':'-251px','top':'+=10vh'}, 2000);
              });
              animateGoodByeIsOn = true;
            }

            //Gets the scroll postion of every section.
            function getSectionScrollPos() {
              posIntro = 0;
              posQuote1 = $('#ep-quote-1').offset().top - 250;
              posSkills = $('#ep-skills').offset().top - 250;
              posMethod = $('#ep-methodology').offset().top - 250;
              posQuote2 = $('#ep-quote-2').offset().top - 250;
              posWorkHist = $('#ep-wh').offset().top - 250;
              posSampleWork = $('#ep-sw').offset().top - 250;
              posContact = $('#ep-contact').offset().top - 250;
              posGoodBye = $('#ep-ty').offset().top - 250;

            }

            //determines where the user is on the page and animates effects for the slide if it is the user's first occurance.
            function scrollEffectSection() {
              getSectionScrollPos();

              var currentPos = $(this).scrollTop();
              if (currentPos >= posIntro && currentPos < posQuote1 && currentSection !== "intro") {
                animateIntroIsOn == false ? animateIntro() : null;
                currentSection = "intro";
              }
              else if (currentPos >= posQuote1 && currentPos < posSkills && currentSection !== "quote1") {
                animateQuote1IsOn == false ? animateQuote1() : null;
                currentSection = "quote1";
                $('.navbar ').animate({'background-color':'#1F90E5'});
              }
              else if (currentPos >= posSkills && currentPos < posWorkHist && currentSection !== "skills") {
                animateSkillsIsOn == false ? animateSkillsSection() : null;
                currentSection = "skills";
              }
              else if (currentPos >= posWorkHist && currentPos < posMethod && currentSection !== "workHistory") {
                animateWorkHistoryIsOn == false ? animateWorkHistory() : null;
                currentSection = "workHistory";
              }
              else if (currentPos >= posMethod && currentPos < posQuote2 && currentSection !== "methodology") {
                animateMethodologyIsOn == false ? animateMethodology() : null;
                currentSection = "methodology";
              }
              else if (currentPos >= posQuote2 && currentPos < posSampleWork && currentSection !== "quote2") {
                animateQuote2IsOn == false ? animateQuote2() : null;
                currentSection = "quote2";
              }
              else if (currentPos >= posSampleWork && currentPos < posContact && currentSection !== "sampleWork") {
                animateSampleWorkIsOn == false ? animateSampleWork() : null;
                currentSection = "sampleWork";
              }
              else if (currentPos >= posContact && currentPos < posGoodBye && currentSection !== "contact") {
                animateContactIsOn == false ? animateContact() : null;
                currentSection = "contact";
                $('.navbar ').animate({'background-color':'#1F90E5'});
              }
              else if (currentPos >= posGoodBye && currentSection !== "goodBye") {
                animateGoodByeIsOn == false ? animateGoodBye() : null;
                currentSection = "goodBye";
                if ($(window).width() > 767)
                {
                  $('.navbar ').animate({'background-color':'rgba(0,0,0,0.0)'});
                }
              }
              else {

              }
            }
            //Displays all the content in all sections.
            function displayAllSections() {
              $('#ep-intro .text-box').css('display','block');
              $('#ep-intro .text-box .text').css('display','inline');
              animateIntroIsOn = true;
              $('#ep-quote-1 .text-box').css('display','block');
              $('#ep-quote-1 .hot-air-balloon').css('display','block');
              //hotAirBalloonDrift2();
              animateQuote1IsOn = true;
              $("#ep-skills #wrench").css('display','block');
              $("#ep-skills #flashlight").css('display','block');
              $('#ep-skills .title').css('display','block');
              $('#ep-skills .skill-list-row').css('display','block');
              $('#ep-skills .skill-img-row').css('display','block');
              animateSkillsIsOn = true;
              $('.ep-wh-text-boxes').css('display','block');
              $('#ep-wh  .ep-wh-potrait').css('display','block');
              animateWorkHistoryIsOn = true;
              $('#ep-methodology h1').css('display','block');
              $('#ep-methodology .column-1').css('display','block');
              $('#ep-methodology .column-2').css('display','block');
              $('#ep-methodology .column-3').css('display','block');
              animateMethodologyIsOn = true;
              $('#ep-quote-2 .text').css('display','block');
              $('#ep-quote-2 .cyclops').css('display','block');
              animateQuote2IsOn = true;
              $('#ep-top-row').css('display','block');
              $('#ep-bottom-row').css('display','block');
              animateSampleWorkIsOn = true;
              $('#ep-phone').css('display','block');
              $('#ep-resume').css('display','block');
              $('#ep-media').css('display','block');
              $('#ep-email').css('display','block');
              animateContactIsOn = true;
              $('#ep-ty #ep-ty-text').css('display','block');
              $('#ep-ty-meteor').css('display','block');
            }
