let currentIndex;
let correctImage;
let totalActiveQuestions = $(".carousel-item.active").find(".dropdown").length;
$(document).ready(function () {
  getCurrentIndex();
  if ($("body").find(".carousel-item").length < 2) {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").hide();
  } else {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").show();
  }
});

//  CLICK CHECK BOX
$(".answer_box").each(function () {
  $(this).on("click", function () {
    let optionClicked = $(this).attr("data_answer");

    // CHECK CORRECT ANSWER --------------------------------------------->
    if (optionClicked === "correct") {
      $(this).html("✔");
      $(this).addClass("complete");
      let completeQuestion = $(".carousel-item.active").find(
        ".complete"
      ).length;
      $(this).addClass("green_border");
      $(".carousel-item.active .answer_box").addClass("preventClick");

      if ($(this).attr("data_answer") !== "coorect") { 
        $(".carousel-item.active .answer_box").parent().addClass("disabled");
        setInterval(() => {
          $(this).parent().removeClass("disabled");
        }, 0.00000000001);
      }
      if (completeQuestion) {
        $(".showAnsBtn").addClass("disabled");
        $(".carousel-item.active").addClass("Done");
      } else {
        $(".showAnsBtn").removeClass("disabled");
      }
      playSound("././assets/audio/correct.mp3");
    } else {
      // CHECK INCORRECT ANSWER --------------------------------------------->
      playSound("././assets/audio/incorrect.mp3");
      $(this).html("✖");
      $(this).addClass("red_border");
      setTimeout(() => {
        $(this).removeClass("red_border");
        $(this).html(" ");
      }, 200);
      setTimeout(() => {
        $(this).html("✖");
        $(this).addClass("red_border");
      }, 350);

      setTimeout(() => {
        $(this).removeClass("red_border");
        $(this).html(" ");
      }, 500);
    }
  });
});

// CHECK BTN DISABLED WITH ACTIVE ITEM
function checkShowAnsBtnIsDisabled() {
  return (
    totalActiveQuestions ===
    $(".carousel-item.active").find(".preventClickabled").length
  );
}
// SHOW ALL ANSWERS --------------------------------------------->
$(".showAnsBtn").on("click", function () {
  $(".carousel-item.active").addClass("Done");
  // $(".carousel-item.active .answer_box").addClass("preventClick");

  $(this).addClass("disabled");
  $(".carousel-item.active .answer_box")
    .each(function () {
      if ($(this).attr("data_answer") === "correct") {
        if (!$(this).parent().parent().children().hasClass("correctManual")) {
          $(this).addClass("preventClick green_border");
          $(this).html("✔").addClass("green_border");
        }
      } else {
        $(this).parent().addClass("disabled");
      }
    })
    .addClass("preventClick");
  $(".carousel-item.active .dropdown").removeClass("show");
  $(".carousel-item.active .options").addClass("show").removeClass("hide");
});

// RELOAD SCREEN ------------------------------------------------->
$(".reloadScrren").on("click", function () {
  $(".carousel-item.active  .answer_box ").parent().removeClass("disabled");
  $(".carousel-item.active  .answer_box ")
    .removeClass("preventClick complete green_border ")
    .html(" ");
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item.active").removeClass("Done");
});

// RELOAD ALL EXERSIICE ----------------------------------------->
$(".reloadAll").on("click", function () {
  $(".answer_box ").parent().removeClass("disabled");

  $(".answer_box ")
    .removeClass("preventClick complete green_border ")
    .html(" ");
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item").removeClass("Done");

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
    $(".dropdown ").removeClass("show");
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
    totalActiveQuestions,
    $(".carousel-item.active").find(".preventClick").length
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
