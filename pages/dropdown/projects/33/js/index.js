let ansQuestion;
let ansOption;
let checkAnswer = ansQuestion == ansOption;
let clickedQuestion = false;
let answeredQuestion;
let currentIndex;
let selectedQues;
let totalActiveQuestions = $(".carousel-item.active").find(".ques").length;
let totalActiveAnswers = $(".carousel-item.active").find(".answer_box").length;

$(document).ready(function () {
  getCurrentIndex();
  if ($("body").find(".carousel-item").length < 2) {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").hide();
  } else {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").show();
  }
});

//  CLICK QUESTION
$(".ques").each(function () {
  $(this).on("click", function () {
    $(".ques").removeClass("selected");
    $(this).addClass("selected");
    clickedQuestion = true;
    ansQuestion = $(this).attr("ques_answer");
    selectedQues = $(this);
  });
});

//  CLICK OPTION
$(".answer_box").each(function () {
  $(this).on("click", function () {
    if (clickedQuestion) {
      ansOption = $(this).attr("data_answer");

      // CHECK CORRECT ANSWER --------------------------------------------->
      if (ansQuestion === ansOption) {
        $(".ques").removeClass("selected");
        $(this).addClass("preventClick correct").html(ansOption);
        $(selectedQues).addClass("disabled");
        answeredQuestion = $(".carousel-item.active").find(
          ".preventClick"
        ).length;
        clickedQuestion = false;
        if (checkShowAnsBtnIsDisabled()) {
          $(".carousel-item.active").addClass("Done");
          $(".showAnsBtn").addClass("disabled");
        } else {
          $(".showAnsBtn").removeClass("disabled");
        }
        playSound("././assets/audio/correct.mp3");
      } else {
        // CHECK INCORRECT ANSWER --------------------------------------------->
         playSound("././assets/audio/incorrect.mp3");
        $(this).html(ansQuestion);
        $(this).addClass("incorrect");
        setTimeout(() => {
          $(this).removeClass("incorrect");
        }, 200);
        setTimeout(() => {
          $(this).addClass("incorrect");
        }, 300);

        setTimeout(() => {
          $(this).html(" ");
          $(this).removeClass("incorrect");
        }, 500);
      }
    }
  });
});

// CHECK BTN DISABLED WITH ACTIVE ITEM
function checkShowAnsBtnIsDisabled() {
  return (
    totalActiveQuestions + totalActiveAnswers ===
    $(".carousel-item.active").find(".preventClick, .disabled").length
  );
}
// SHOW ALL ANSWERS --------------------------------------------->
$(".showAnsBtn").on("click", function () {
  $(".carousel-item.active").addClass("Done");
  // checkDisabledWithBtn();
  $(this).addClass("disabled");
  $(".carousel-item.active .ques, .carousel-item.active .answer_box")
    .removeClass("selected")
    .addClass("preventClick");
  $(".carousel-item.active .answer_box").each(function () {
    $(this).html($(this).attr("data_answer")).addClass("correct");
  });
  $(".carousel-item.active .ques").addClass("disabled");
});

// RELOAD SCREEN ------------------------------------------------->
$(".reloadScrren").on("click", function () {
  $(".carousel-item.active").removeClass("Done");
  $(".carousel-item.active .ques").removeClass(
    "disabled preventClick selected"
  );
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item.active .answer_box").removeClass("preventClick correct");
  $(".carousel-item.active .answer_box").each(function () {
    $(this).html(" ");
  });
});

// RELOAD ALL EXERSIICE ----------------------------------------->
$(".reloadAll").on("click", function () {
  $(".carousel-item").removeClass("Done");

  $(".ques").removeClass("disabled");

  $(".ques").removeClass("preventClick selected");
  $(".showAnsBtn").removeClass("disabled");
  $(".answer_box").removeClass("preventClick correct");
  $(".answer_box").html(" ");

  if (currentIndex == 1) {
    $(".carousel-control-prev").addClass("disabled");
    $(".carousel-control-next").removeClass("disabled");
  } else {
    $(".carousel-control-next").addClass("disabled");
    $(".carousel-control-prev").removeClass("disabled");
  }
});

// GET CURRENTINDEX OF SLIDE ----------------------------------------->
function getCurrentIndex() {
  currentIndex = +$(".carousel-item.active").attr("index");
}
// NEXT SLIDE ----------------------------------------->
$(".carousel-control-next, .carousel-control-prev, .carousel-indicators li").on(
  "click",
  function () {
    checkDisabledWithBtn();
    getCurrentIndex();
    if (currentIndex == 1) {
      $(".carousel-control-next").addClass("disabled");
      $(".carousel-control-prev").removeClass("disabled");
    } else {
      $(".carousel-control-prev").addClass("disabled");
      $(".carousel-control-next").removeClass("disabled");
    }
  }
);

// CHECK DISABLED SHOW ANSWER BURRON ----------------------------------------->
function checkDisabledWithBtn() {
  $(".ques").removeClass("selected");
  console.log(
    totalActiveQuestions + totalActiveAnswers,
    $(".carousel-item.active").find(".preventClick, .disabled").length
  );
  let checkInterval = setInterval(() => {
    if ($(".carousel-item.active").hasClass("Done")) {
      $(".showAnsBtn").addClass("disabled");
    } else {
      $(".showAnsBtn").removeClass("disabled");
    }
  }, 100);

  setTimeout(() => {
    clearInterval(checkInterval);
  }, 1000);
}

// PLAY SOUND ----------------------------------------->
function playSound(srcSound) {
  let audio = document.createElement("audio");
  audio.src = srcSound;
  audio.play();
}
