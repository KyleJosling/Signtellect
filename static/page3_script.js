/*global $*/
/*global moment*/

$(document).ready(function() {


    var countDownTime = 4;
    var failureCount = 0;
    var correct = " ";
    var waitTime = 2000;
    var testing = false;
    var isPaused = false;

    //returns random letter
    function randomLetter() {
        var n = Math.floor(Math.random() * 26)
        correct = String.fromCharCode(65 + n);
    }

    function reset(){
        correct = randomLetter();
        $("#countdown").html(' ');
        $("#countdown").append(correct);
        $("#answer-image").hide();
        countDownTime = 0;
    }

    function answerImage() {
        $("#answer-image").attr("src", "/static/images/sign_letters/Sign_Language_with_" + correct + ".png");
        $("#answer-image").show();
    }

    function moveProgressBar(progress) {
        $("#progressbar").progressbar({value: progress});
    }


    //main countdown function

    function updateScore() {
        $('#correct').html('');
        $('#correct').append(correct);
        $('#total').html('');
        $('#total').append(correct + incorrect);

    }


    function countDown() {
           countDownTime = countDownTime - 1;
           if (countDownTime >= 0 && testing == false) {
               $("#countdown").html('');
               $("#countdown").append(countDownTime);

               if (countDownTime == 0) {
                   testing = true;
                   randomLetter();
                   $("#countdown").html(correct);
                   countDownTime = 3;
               }

           }

           if (countDownTime == 0 && testing == true) {
               //restart the python reading function
               //callReader();


               failureCount = failureCount + 1;

               if (failureCount == 3) {
                   //reset count, give answer, and display next image
                   //display old answer image for 2 seconds

                   answerImage();

                   setTimeout(function () {
                       reset()
                   }, waitTime);

                   failureCount = 0;
                   countDownTime = 3;
               }
           }
       }

    function callReader() {
        /*$.ajax({
            type: "GET",
            url: "localhost:8080/currently",
            success: compare
        })*/
    }

    function compare(response) {
        var attempt = response.symbol;

        if (attempt == correct) {
            //reset countdown, failures, and display new letter
        }
    }


    var interval = setInterval(function () {
        countDown()
    }, 1000);

});