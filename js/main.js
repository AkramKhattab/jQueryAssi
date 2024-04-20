let myTextArea = document.querySelector("textarea");
let counter = Number($(".counter").text());
let navWidth = $(".navigation").outerWidth(true);
let openWidth = $(".toggleTag").outerWidth(true);

// Setting initial positions of toggle tag and navigation
$(".toggleTag").css("left","0");
$(".navigation").css(`left`,`-${navWidth}`);

// Click event for toggle tag
$(".toggleTag span").click(function(){
    // Opening navigation with animation
    $(".toggleTag").animate({left:openWidth},500);
    $(".navigation").animate({left:"0"},500);
    $(".navigation").css("position","fixed");
});

// Click event for closing navigation
$(".closenav").click(function(){
    // Closing navigation with animation
    $(".toggleTag").animate({left:"0"},500);
    $(".navigation").animate({left:`-${navWidth}`});
});

// Initially showing the first section
$(".first").slideDown();

// Click event for toggling section visibility
$(".singer").click(function(){
    let next = $(this).next();
    next.slideToggle(500);
    $(".singerP").not(next).slideUp(500);
});

// Event listener for textarea input
myTextArea.addEventListener("keyup",function(e){
    let currentLength = this.value.length;

    // Adjusting counter based on keypress
    if(e.code === "Backspace" ) {
        if(counter < 100) {
            counter = 100 - currentLength;
        }
    } else {
        counter = 100 - currentLength;
    }
    // Developed by Akram Khattab
    // Updating counter display and message
    if(counter <= 0) {
        $(".counter").text("your available character finished");
    } else {
        $(".counter").text(counter);
    }
});

// Click event for smooth scrolling to sections
$("a[href^='#']").click(function(){
    let currentSectionID = $(this).attr("href"),
        sectionTop = $(currentSectionID).offset().top;
    $("html, body").animate({scrollTop: sectionTop},1000);
});

// Setting up countdown timer to a specific date
let countDownDate = new Date("12/17/2033").getTime();

function countDown() {
    let currentDate = new Date().getTime();
    let remaining = countDownDate - currentDate;

    // Calculating remaining time
    let days = Math.floor(remaining/(1000*60*60*24)),
        hours = Math.floor((remaining % (1000*60*60*24))/(1000*60*60)),
        minutes = Math.floor(((remaining % (1000*60*60*24))%(1000*60*60))/(1000*60)),
        seconds = Math.floor((((remaining % (1000*60*60*24))%(1000*60*60))%(1000*60))/(1000));

    // Adding leading zeros for formatting
    if(hours < 10)
        hours = "0" + hours;
    if(minutes < 10)
        minutes = "0" + minutes;
    if(seconds < 10)
        seconds = "0" + seconds;

    // Displaying countdown elements
    $(".days").text(days + "D");
    $(".hours").text(hours + "H");
    $(".minutes").text(minutes + "M");
    $(".seconds").text(seconds + "S");

    if(remaining < 0) {
        clearInterval(timeProgressing);
    }
}

// Starting countdown timer interval
var timeProgressing = setInterval(countDown,1000);

// Form validation for input fields
$("input").keyup((e)=>{
    if($(e.target).attr("type")==="text" ){
        // Validating text inputs
        if(/^[A-z]{3,20}/.test($(e.target).val())) {
            $(e.target).next().addClass("d-none");
        } else {
            $(e.target).next().removeClass("d-none");
        }
    } else {
        // Validating email inputs
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/.test($(e.target).val())) {
            $(e.target).next().addClass("d-none");
        } else {
            $(e.target).next().removeClass("d-none");
        }
    }
});
