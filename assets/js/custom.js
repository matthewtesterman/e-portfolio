/***********************************
* @author matthewtesterman
* @file custom.js
* @description Applies JQuery and JQuery UI effects to the root index.html file.
************************************/

//Global Variables
var mattsEP = {}; //Create Object (for namespace purposes)

mattsEP.scrollPos = $(window).scrollTop(); // get current position of user scroll
mattsEP.coloredBGNav = false; //determined if navbar has colored bg
mattsEP.viewWidth = $(window).width(); //get current window width size
mattsEP.cardPos = 1; //Keep Track of Card Position in the #ep-wh section.
mattsEP.currentSection = ""; //Track position in which section (ex: intro, skills, etc.)
mattsEP.animatitonOn = {intro: false, quote1 : false, skills : false, workHistory : false, method: false, quote2 : false, sampleWork : false, contact: false, goodBye : false};

//On ready Function
$(function() {
  mattsEP.changeNavColor(); //Display the navigation bar according to scroll location
  mattsEP.getSectionScrollPos(); //Get scroll positions of every section and assign them to vars.
  mattsEP.scrollToLink(); //Enables user to scroll to section upon clicking the nav link.

  //If in mobile then do not animate any effects
  if ($(window).width() < 768) {
    //Remove fixed from images for mobile devices.
    $('#ep-intro').css('background-attachment','scroll');
    $('#ep-wh').css('background-attachment','scroll');
    $('#ep-quote-2').css('background-attachment','scroll');
    $('#ep-ty').css('background-attachment','scroll');
    mattsEP.displayAllSections(); //display all hidden objects
  }
  else {
    mattsEP.scrollEffectSection(); //Call effects for the specific section the user is in upon the page load.
    //Call looping animation for various sections
    mattsEP.loopAstronaut();
    mattsEP.hotAirBalloonDrift();
    mattsEP.moveClouds();
    //On Scroll Event to handle navigation bar visibility and fire events up when scroll over.
    $(window).scroll(function(){
      mattsEP.scrollEffectSection();
      mattsEP.changeNavColor();
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
      if (mattsEP.cardPos === 1) {
        mattsEP.cardPos++;
        $('#text-1').css('display','none');
        $('#text-2').fadeIn();
      }
      else if(mattsEP.cardPos === 2) {
        mattsEP.cardPos++;
        $('#text-2').css('display','none');
        $('#text-3').fadeIn();
      }
      else if (mattsEP.cardPos === 3) {
        mattsEP.cardPos = 1;
        $('#text-3').css('display','none');
        $('#text-1').fadeIn();
      }
      else {
        mattsEP.cardPos = 1;
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
mattsEP.scrollToLink = function() {
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
mattsEP.changeNavColor = function() {
  mattsEP.scrollPos = $(window).scrollTop();
  mattsEP.viewWidth = $(window).width();

  if ((mattsEP.scrollPos > 0 && !mattsEP.coloredBGNav) || mattsEP.viewWidth <  768)
  {
    $('.navbar ').animate({'background-color':'#1F90E5'});
    mattsEP.coloredBGNav = true;
  }
  else if (mattsEP.scrollPos <= 0 && mattsEP.coloredBGNav) {
    $('.navbar ').animate({'background-color':'transparent'});
    mattsEP.coloredBGNav = false;
  }
}

// Loops the astronaut animation for the last Section
mattsEP.loopAstronaut = function() {
  $('#ep-ty #ep-ty-astronaut').animate({'bottom': '+=5vh'}, {
    duration: 1000,
    complete: function() {
      $('#ep-ty #ep-ty-astronaut').animate({'bottom': '-=5vh'}, {
        duration: 1000,
        complete: mattsEP.loopAstronaut});
      }});
    }

    //Loops the hot air balloon for the quote section
    mattsEP.hotAirBalloonDrift = function() {
      $('#ep-intro .hot-air-balloon ').animate({'top': '18vh'}, {
        duration: 1500,
        easing: 'linear',
        complete: function() {
          $('#ep-intro .hot-air-balloon ').animate({'top': '20vh'}, {
            duration: 1500,
            easing: 'linear',
            complete: mattsEP.hotAirBalloonDrift});
          }});
        }
        var balloonStep = 0;
        var left1 = '+=1vw';
        var left2 = '+=2vw';

        //Hot Air balloon effects from first quote
        mattsEP.hotAirBalloonDrift2 = function() {
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
                complete: mattsEP.hotAirBalloonDrift2});
              }});
              balloonStep++;
            }

            //Loops the clouds for the intro section
            mattsEP.moveClouds = function() {
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
                    complete: mattsEP.moveClouds}
                  );
                }
              });
            }

            //Animates Intro Section
            mattsEP.animateIntro = function () {
              $('#ep-intro .text-box').toggle( "slide", {"direction": "right"}, function(){
                $('#ep-intro .text-box .text').animate({'opacity':'1.0'});
              });
              mattsEP.animatitonOn['intro'] = true;
            }

            //Animates the first quote Section
            function animateQuote1() {
              $('#ep-quote-1 .text-box').toggle( "slide", {"direction": "left", 'easing': 'easeInOutBack', 'duration': 1000});
              $('#ep-quote-1 .hot-air-balloon').toggle({"direction": "down"});
              mattsEP.hotAirBalloonDrift2();
              mattsEP.animatitonOn['quote1'] = true;
            }

            //Animates the Skills Section
            function animateSkillsSection() {
              $("#ep-skills #wrench").toggle('slide', {'direction':'up','easing': 'easeOutBounce', 'duration': 1000});
              $("#ep-skills #flashlight").toggle('slide', {'direction':'right','easing': 'linear', 'duration': 1000},function(){
                $('#ep-skills .title').fadeIn();
                $('#ep-skills .skill-list-row').toggle('slide', {'direction':'left','easing': 'easeInOutBack', 'duration': 1000});
                $('#ep-skills .skill-img-row').toggle('slide', {'direction':'right','easing': 'easeInOutBack', 'duration': 1000});
              });
              mattsEP.animatitonOn['skills'] = true;
            }

            //Animates the Work History Section
            function animateWorkHistory() {
              $('.ep-wh-text-boxes').toggle('slide', {'easing': 'easeOutBack', 'duration': 500});
              $('#ep-wh  .ep-wh-potrait').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 1500});
              mattsEP.animatitonOn['workHistory'] = true;
            }

            //Animates the Methodology Section
            function animateMethodology() {
              $('#ep-methodology h1').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-1').toggle('slide', {'direction': 'left','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-2').toggle('slide', {'direction': 'down','easing': 'easeInCirc', 'duration': 500});
              $('#ep-methodology .column-3').toggle('slide', {'direction': 'right','easing': 'easeInCirc', 'duration': 500});
              mattsEP.animatitonOn['method']  = true;
            }

            //Animates the Quote 2 Section
            function animateQuote2() {
              $('#ep-quote-2 .text').toggle('slide', {'direction': 'right','easing': 'easeInOutBack', 'duration': 1000});
              $('#ep-quote-2 .cyclops').toggle('slide', {'direction': 'down','easing': 'easeOutCubic', 'duration': 2000});
              mattsEP.animatitonOn['quote2'] = true;
            }

            //Animates the Sample Work Section
            function animateSampleWork() {
              $('#ep-top-row').toggle('slide',{'direction':'up','duration':'1000'})
              $('#ep-bottom-row').toggle('slide',{'direction':'down','duration':'1000'})
              mattsEP.animatitonOn['sampleWork'] = true;
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
              mattsEP.animatitonOn['contact'] = true;
            }

            //Animates the last Section
            function animateGoodBye() {
              //ep-ty-text
              $('#ep-ty #ep-ty-text').toggle('slide', {'direction':'up', 'direction' : 'left'}, function() {
                $('#ep-ty-meteor').animate({'left':'-251px','top':'+=10vh'}, 2000);
              });
              mattsEP.animatitonOn['goodBye'] = true;
            }

            //Gets the scroll postion of every section.
            mattsEP.getSectionScrollPos = function(){
              mattsEP.posIntro = 0;
              mattsEP.posQuote1 = $('#ep-quote-1').offset().top - 250;
              mattsEP.posSkills = $('#ep-skills').offset().top - 250;
              mattsEP.posMethod = $('#ep-methodology').offset().top - 250;
              mattsEP.posQuote2 = $('#ep-quote-2').offset().top - 250;
              mattsEP.posWorkHist = $('#ep-wh').offset().top - 250;
              mattsEP.posSampleWork = $('#ep-sw').offset().top - 250;
              mattsEP.posContact = $('#ep-contact').offset().top - 250;
              mattsEP.posGoodBye = $('#ep-ty').offset().top - 250;

            }

            //determines where the user is on the page and animates effects for the slide if it is the user's first occurance.
            mattsEP.scrollEffectSection = function() {

              this.getSectionScrollPos();
              var currentPos = $(window).scrollTop();

              if (currentPos >= mattsEP.posIntro && currentPos < mattsEP.posQuote1 && mattsEP.currentSection !== "intro") {
                console.log("mattsEP.posQuote1");
                mattsEP.animatitonOn['intro'] == false ? mattsEP.animateIntro() : null;
                mattsEP.currentSection = "intro";
              }
              else if (currentPos >= mattsEP.posQuote1 && currentPos < mattsEP.posSkills && mattsEP.currentSection !== "quote1") {
                mattsEP.animatitonOn['quote1'] == false ? animateQuote1() : null;
                mattsEP.currentSection = "quote1";
                $('.navbar ').animate({'background-color':'#1F90E5'});
              }
              else if (currentPos >= mattsEP.posSkills && currentPos < mattsEP.posWorkHist && mattsEP.currentSection !== "skills") {
                mattsEP.animatitonOn['skills']  == false ? animateSkillsSection() : null;
                mattsEP.currentSection = "skills";
              }
              else if (currentPos >= mattsEP.posWorkHist && currentPos < mattsEP.posMethod && mattsEP.currentSection !== "workHistory") {
                mattsEP.animatitonOn['workHistory'] == false ? animateWorkHistory() : null;
                mattsEP.currentSection = "workHistory";
              }
              else if (currentPos >= mattsEP.posMethod && currentPos < mattsEP.posQuote2 && mattsEP.currentSection !== "methodology") {
                mattsEP.animatitonOn['method']  == false ? animateMethodology() : null;
                mattsEP.currentSection = "methodology";
              }
              else if (currentPos >= mattsEP.posQuote2 && currentPos < mattsEP.posSampleWork && mattsEP.currentSection !== "quote2") {
                mattsEP.animatitonOn['quote2'] == false ? animateQuote2() : null;
                mattsEP.currentSection = "quote2";
              }
              else if (currentPos >= mattsEP.posSampleWork && currentPos < mattsEP.posContact && mattsEP.currentSection !== "sampleWork") {
                mattsEP.animatitonOn['sampleWork'] == false ? animateSampleWork() : null;
                mattsEP.currentSection = "sampleWork";
              }
              else if (currentPos >= mattsEP.posContact && currentPos < mattsEP.posGoodBye && mattsEP.currentSection !== "contact") {
                mattsEP.animatitonOn['contact']  == false ? animateContact() : null;
                mattsEP.currentSection = "contact";
                $('.navbar ').animate({'background-color':'#1F90E5'});
              }
              else if (currentPos >= mattsEP.posGoodBye && mattsEP.currentSection !== "goodBye") {
                mattsEP.animatitonOn['goodBye'] == false ? animateGoodBye() : null;
                mattsEP.currentSection = "goodBye";
                if ($(window).width() > 767)
                {
                  $('.navbar ').animate({'background-color':'rgba(0,0,0,0.0)'});
                }
              }
              else {

              }
            }
            //Displays all the content in all sections.
            mattsEP.displayAllSections = function() {
              $('#ep-intro .text-box').css('display','block');
              $('#ep-intro .text-box .text').css('display','inline');
              mattsEP.animatitonOn['intro'] = true;

              $('#ep-quote-1 .text-box').css('display','block');
              $('#ep-quote-1 .hot-air-balloon').css('display','block');
                mattsEP.animatitonOn['quote1'] = true;

              $("#ep-skills #wrench").css('display','block');
              $("#ep-skills #flashlight").css('display','block');
              $('#ep-skills .title').css('display','block');
              $('#ep-skills .skill-list-row').css('display','block');
              $('#ep-skills .skill-img-row').css('display','block');
              mattsEP.animatitonOn['skills'] = true;
              $('.ep-wh-text-boxes').css('display','block');
              $('#ep-wh  .ep-wh-potrait').css('display','block');
              mattsEP.animatitonOn['workHistory'] = true;
              $('#ep-methodology h1').css('display','block');
              $('#ep-methodology .column-1').css('display','block');
              $('#ep-methodology .column-2').css('display','block');
              $('#ep-methodology .column-3').css('display','block');
              mattsEP.animatitonOn['method']  = true;
              $('#ep-quote-2 .text').css('display','block');
              $('#ep-quote-2 .cyclops').css('display','block');
              mattsEP.animatitonOn['quote2'] = true;
              $('#ep-top-row').css('display','block');
              $('#ep-bottom-row').css('display','block');
              mattsEP.animatitonOn['sampleWork'] = true;
              $('#ep-phone').css('display','block');
              $('#ep-resume').css('display','block');
              $('#ep-media').css('display','block');
              $('#ep-email').css('display','block');
              mattsEP.animatitonOn['contact']  = true;
              $('#ep-ty #ep-ty-text').css('display','block');
              $('#ep-ty-meteor').css('display','block');
            }
