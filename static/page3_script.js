$(document).ready(function() {


    var countDownTime = 4;
    var failureCount = 0;
    var correct = " ";
    var waitTime = 1000;
    var testing = false;
    var isPaused = false;
    var correct = 0;
    var incorrect = 0;
		var scored = 0;
		var comparing = false;

    //returns random letter
    function randomLetter() {
			do{
        var n = Math.floor(Math.random() * 26)
        correct = String.fromCharCode(65 + n);
			}while(correct=="G" || correct=="R" || correct=="U")
    }

    function reset(){
        failureCount = 0;
        updateScore();
        randomLetter();
        $("#countdown").html(' ');
        $("#countdown").append(correct);
        $("#answer-image").hide();
				$("#success").html(' ');
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
        $('#correct').append(scored);
        $('#total').html('');
        $('#total').append(scored + incorrect);
    }


    function countDown() {
        countDownTime = countDownTime - 1;
        moveProgressBar(countDownTime*20);//CHANGED

        if (countDownTime >= 0 && testing == false) {
            $("#countdown").html('');
            $("#countdown").append(countDownTime);

            if (countDownTime == 0) {
                testing = true;
                randomLetter();
                $("#countdown").html(' ');
                $("#countdown").append(correct);
								incorrect = incorrect+1;
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
                countDownTime = 5;
        }
    }

		var xhttp=new XMLHttpRequest();

    function callReader() {

			xhttp.open("GET","http://127.0.0.1:5000/currently",true);
			xhttp.send();

			xhttp.onreadystatechange=compare;
    }

		function compare(e){

			// if(xhttp.readyState ==4 && xhttp.status==200){

				var attempt = JSON.parse(xhttp.responseText);

				console.log(attempt.symbol+" " + correct);

				if (attempt.symbol == correct.toLowerCase()) {

						if(comparing == false){
							comparing = true;
							scored = scored+1;
							$("#answer-image").attr('src', "/static/images/sign_letters_answers_check/Sign_Language_with_" + correct + ".png");
							$("#success").append("CORRECT");
						}

						setTimeout(function(){reset()}, 1000);
						comparing = false;
					}
				}



			// }

		//could this be one set interval?
    var interval = setInterval(function () {
        countDown()
    }, 1000);

    var getLetter = setInterval(function(){callReader()}, 500);
});
