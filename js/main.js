// myArray that will hold the all movies
let myArr = [];

// Get API
async function getAPI(category) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
    let finalResult = await response.json();
    myArr = finalResult.results;
    displayData();
}

// Get Trending Movies API
async function getTrending() {
    let response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
    let finalResult = await response.json();
    myArr = finalResult.results;
    displayData();
}

// Call the API function to show data for the first refresh
getAPI("now_playing");

// li function to pass category to API link
$('.navigation li').click(function (e) {
    let theWord = e.target.innerHTML

    if (theWord == "Now Playing") {
        theWord = "now_playing";
        getAPI(theWord);
    }
    else if (theWord == "Popular") {
        theWord = "popular";
        getAPI(theWord);
    }
    else if (theWord == "Top Rated") {
        theWord = "top_rated";
        getAPI(theWord);
    }
    else if (theWord == "Upcomming") {
        theWord = "upcoming";
        getAPI(theWord);
    }
    else if (theWord == "Trending") {
        getTrending();
    }
});

// Display API Data (Movies)
function displayData() {
    let box = ``;

    for (let i = 0; i < myArr.length; i++) {
        box += `
                <div class="col-md-6 col-lg-4 py-3">
                    <div class="position-relative overflow-hidden hover-here">
                        <img src="https://image.tmdb.org/t/p/w500${myArr[i].poster_path}" class="w-100 rounded" alt="">
                        <div class="overlay d-flex align-items-center justify-content-center text-center">
                            <div>
                                <h2>${myArr[i].title}</h2>
                                <p>${myArr[i].overview}</p>
                                <p>rate: ${myArr[i].vote_average}</p>
                                <p>${myArr[i].release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
    }

    document.getElementById('display').innerHTML = box;
}

// Search function
function searchByWord() {
    $('#searchByWord, #searchTwo').keyup(function () {
        let box = ``;
        for (let i = 0; i < myArr.length; i++) {
            if (myArr[i].original_title.toLowerCase().includes(this.value.toLowerCase())) {
                box += `
                    <div class="col-md-6 col-lg-4 py-3">
                        <div class="position-relative overflow-hidden hover-here">
                            <img src="https://image.tmdb.org/t/p/w500${myArr[i].poster_path}" class="w-100 rounded" alt="">
                            <div class="overlay d-flex align-items-center justify-content-center text-center">
                                <div>
                                    <h2>${myArr[i].title}</h2>
                                    <p>${myArr[i].overview}</p>
                                    <p>rate: ${myArr[i].vote_average}</p>
                                    <p>${myArr[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
        document.getElementById('display').innerHTML = box;
    });
}
searchByWord();

// Menu Toggle
let menuBlackWidth = $('.wrapper-menu .navigation').width();

// console.log(menuBlackWidth);

$('.menu-bar-icon').click(function () {
    $('.wrapper-menu').animate({ left: "0px" }, 1000, function () {
        $('.navigation ul li').animate({ top: "0px" }, 500);
    });
    $('.menu-bar-icon').css({ "display": "none" });
    $('.menu-close-icon').css({ "display": "block" });
});

$('.menu-close-icon').click(function () {
    $('.navigation ul li').animate({ top: "100%" }, 500);
    $('.wrapper-menu').animate({ left: -menuBlackWidth }, 1000);
    $('.menu-close-icon').css({ "display": "none" });
    $('.menu-bar-icon').css({ "display": "block" });
});

// Validation for All inputs

let nameRegx = /^[a-zA-Z]{1,15}$/;
let emailRegx = /^[a-zA-Z0-9]+@[a-zA-Z]+.com$/;
let phoneRegx = /^[0][1][0-2, 5]{1}[0-9]{8}$/;
let ageRegx = /^[1-9][0-9]?$|^100$/;
let passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

function validation(selector, regxExp, mss) {

    $(selector).keyup(function () {
        if (regxExp.test(this.value)) {
            $(mss).addClass("d-none").removeClass("d-block");
            return true;
        }
        else {
            $(mss).addClass("d-block").removeClass("d-none");
            return false;
        }
    });

    $(selector).focus(function () {
        if (this.value == "") {
            $(mss).addClass("d-block").removeClass("d-none");
        }
        else {
            $(mss).addClass("d-none").removeClass("d-block");
        }
    });
}

validation('#nameInput', nameRegx, '.name-mss');
validation('#emailInput', emailRegx, '.email-mss');
validation('#phoneInput', phoneRegx, '.phone-mss');
validation('#ageInput', ageRegx, '.age-mss');
validation('#passInput', passRegx, '.password-mss');

// RePassword Validation
function rePassChecking() {
    $('#rePassInput').keyup(function () {
        let thePass = $('#passInput').val();
        let theRePass = $(this).val();
        if (thePass == theRePass) {
            $('.repassword-mss').addClass("d-none").removeClass("d-block");
        }
        else {
            $('.repassword-mss').addClass("d-block").removeClass("d-none");
        }
    });
}
rePassChecking();

// Disabled BTN functions
function addAtt() {
    $('.mySubmitBtn').attr("disabled", "disabled");
}

function removeAtt() {
    $('.mySubmitBtn').removeAttr("disabled");
}

if ($('.formInput').val() == "") {
    addAtt();
}

$('.formInput').blur(function () {
    if ($('.formInput').each(function () {
        console.log($('.formInput'));
        if ($(this).val() == "") {
            addAtt();
        }
        else {
            removeAtt();
        }
    }));
});

// Loading Screen
$(document).ready(function() {
    $('.loading-shape').fadeOut(1000, function() {
        $('#loading').fadeOut(500);
        $('body').css({"overflow-y" : "auto"});
    });
});
