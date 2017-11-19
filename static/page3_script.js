/*global $*/
/*global moment*/

$(document).ready(function(){
   


   var countDownTime = 3;
   var waitTime = 2000;
   var onCountDown = true;
   var nextImage = "";
   var failureTime = 3;
   var failCount = 0;
   var rightAnswer = 0;
   var buttonClicked = false;
   var correct = 0;
   var incorrect = 0;

   //returns random letter
   function randomLetter(){
        var n = Math.floor(Math.random()*26);
        var character =  String.fromCharCode(65 + n);
        return character;
    }

    //loads new random image
    function newNumber(randomLetter) {
        $('#countdown').html('');
        $('#countdown').append(randomLetter);
        $('#countdown').css('color', 'black');
    }

   function answerimage(letter){
      $("#question-image").attr("src","/public/images/sign_letters_answers/Sign_Language_with_"+letter+".png");
   }

   function moveProgressBar(progress){
    $( "#progressbar" ).progressbar({value: progress});
   }

   function reset(){
      $(".btn").removeClass("btn-success btn-danger").addClass("btn-primary");
      $("#question-image").css('border-color', 'black'); 
      countDownTime = pictureCountDownTime;  
      buttonClicked = false;
   }

    //main countdown function

   function updateScore(){
      $('#correct').html('');
      $('#correct').append(correct);
      $('#total').html('');
      $('#total').append(correct+incorrect);

   }


   });

    function countDown() {
        if(countDownTime >= 0 && onCountDown) {
            $("#countdown").html('');
            $("#countdown").append(countDownTime);
        }

        if(countDownTime == 0){
            //restart the python reading function
            $("#messages").html('Try Again');

        }

        countDownTime = countDownTime-1;
    }

    function callReader(){
        $.ajax({
            type: "GET",
            url: "localhost:8080/currently",
            success: comapare
        })
    }

    function compare(response){
        response = response.parese
    }



   var interval = setInterval(function(){countdown()}, 1000);