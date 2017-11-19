/*global $*/
/*global moment*/

$(document).ready(function(){

   var countDownTime = 3;
   var waitTime = 1000;
   var onCountDown = true;
   var nextImage = "";
   var pictureCountDownTime = 10;
   var rightAnswer = 0;
   var buttonClicked = false;
   var correct = 0;
   var incorrect = 0;
   var goal = 5;
   var onPause = false;

  $("#move-on").hide(); 
   $(".options").addClass("disabled");

   //returns random letter
   function randomLetter(){
        var n = Math.floor(Math.random()*26);
        var character =  String.fromCharCode(65 + n);
        return character;
    }

    //sets up buttons with one right button
    function setupButtons(rightLetter){
        var imagesDisplayed = new Array(4);
        rightAnswer = Math.floor(Math.random()*4);
        var letter = "";
        for(var i = 0; i < 4; i++){
            do {
                if (i == rightAnswer) {
                    letter = rightLetter;
                } else {
                    //pickout randomletter that's not rightletter
                    do {
                        letter = randomLetter();
                    } while (letter == rightLetter);
                }
            }while(imagesDisplayed.includes(letter));
            imagesDisplayed.push(letter);
            $("#btn"+i).attr("src","/static/images/sign_letters/Sign_Language_"+letter+".png");
      }
    }

    //loads new random image
    function newimage(randomLetter){
      $('#countdown').html('');
      $('#countdown').append(randomLetter);
      $('#countdown').css('color', 'black');
   }


   function moveProgressBar(progress){
    $( "#progressbar" ).progressbar({value: progress});
   }

   function reset(){
      $(".options").removeClass('btn-success btn-danger');
      countDownTime = pictureCountDownTime;  
      buttonClicked = false;
   }

    //main countdown function
   function countdown(){
      
      if(buttonClicked == false && onPause == false){
        countDownTime = countDownTime - 1;
      
        //on start countdown
        if(countDownTime >= 0 && onCountDown){
          $("#countdown").html('');
          $("#countdown").append(countDownTime);
          
          //done start countdown
          if(countDownTime == 0){
            onCountDown = false;
            countDownTime = pictureCountDownTime;
          }
        }

        //on question count down
        if(countDownTime >= 0 && !onCountDown){

          moveProgressBar(countDownTime*10);
          
          //question count down just started
          if(countDownTime == pictureCountDownTime - 1 ){
            $("#countdown").html('');
            var randomL = randomLetter();
            newimage(randomL);
            setupButtons(randomL);
            $(".options").removeClass("disabled");
          }

          //timer done user didn't enter
          if(countDownTime == 0){
            $("#btn"+rightAnswer).addClass("btn-success");
            $("#countdown").css('color','red');

            incorrect++;
            updateScore();
            $(".options").addClass("disabled");
            setTimeout(function(){ reset() }, waitTime );

          }



        }

      } 
   }

   //good 
   function updateScore(){
      $('#correct').html('');
      $('#correct').append(correct);
      $('#total').html('');
      $('#total').append(correct+incorrect);

      if(correct >= goal){
        goalReached();
      }

   }
   

    function goalReached(){
      onPause = true;
      $("#score-div").hide();
      $("#move-on").show();

   }
   

   $("#stay").click(function(){
      onPause = false;
      $("#move-on").hide();
      $("#score-div").show();
      goal = goal*2;
      
   });
   

   //click button
   $(".options").click(function(){
      
      if(!$(this).hasClass("disabled")){

        var buttonNumber = this.id[3];
        
        buttonClicked = true;

        if(buttonNumber == rightAnswer){
          $("#"+this.id).removeClass("btn-primary").addClass("btn-success");
          $("#countdown").css('color','#5cb85c');
          
          correct++;
        }else{
          $("#"+this.id).removeClass("btn-primary").addClass("btn-danger");
          $("#btn"+rightAnswer).removeClass("btn-primary").addClass("btn-success");
          $("#countdown").css('color','#d9534f');
          
          incorrect++;
        }

        $(".options").addClass("disabled");

        updateScore();
        setTimeout(function(){ reset() }, waitTime );

      }

   });


   var interval = setInterval(function(){countdown()}, 1000);
    
});