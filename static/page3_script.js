$(document).ready(function() {


    var countDownTime = 6;
    var failureCount = 0;
    var correct = " ";
    var waitTime = 2000;
    var testing = false;
    var isPaused = false;
    var scored = 0;
    var incorrect = 0;

    //returns random letter
    function randomLetter() {
        var n = Math.floor(Math.random() * 26)
        correct = String.fromCharCode(65 + n);
    }

    function reset(){
        failureCount = 0;
        updateScore();
        randomLetter();
        $("#countdown").html(' ');
        $("#countdown").append(correct);
        $("#answer-image").hide();
        countDownTime = 5;

    }

    function answerImage() {
        $("#answer-image").attr("src", "/static/images/sign_letters/Sign_Language_" + correct + ".png");
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
        $('#total').append(scored + incorrect);

    }


    function countDown() {
        countDownTime = countDownTime - 1;
        moveProgressBar(countDownTime*10);

        if (countDownTime >= 0 && testing == false) {
            $("#countdown").html('');
            $("#countdown").append(countDownTime);

            if (countDownTime == 0) {
                testing = true;
                randomLetter();
                $("#countdown").html(' ');
                $("#countdown").append(correct);
                countDownTime = 5;
            }

        }

        if (countDownTime == 0 && testing == true) {
            //restart the python reading function
            //callReader();
            failureCount = failureCount + 1;

                //reset count, give answer, and display next image
                //display old answer image for 2 seconds
                answerImage();

                setTimeout(function () {
                    reset()
                }, waitTime);
                incorrect = incorrect+1;
                failureCount = 0;
                countDownTime = 3;
            }
        }


    function callReader() {
        $.ajax({
            type: "GET",
            url: "localhost:8080/currently",
            success: compare
        })
    }

    function compare(response) {
        var attempt = response.symbol;

        if (attempt == correct) {
            $("#answer-image").attr('src', "/static/images/sign_letters/Sign_Language_" + correct + ".png");
            $("#success").append("CORRECT");
            scored = scored+1;
            reset();
        }
    }


    var interval = setInterval(function () {
        countDown()
    }, 1000);

    var getLetter = setInterval(function(){callReader()}, 25);
});