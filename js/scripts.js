var values = ['car', 'goat', 'goat'];
var car_index = null;
var selected_index = null;

var wins = 0;
var games = 0;

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getRandomWithOneExclusion(lengthOfArray, indexToExclude) {
    var rand = null;

    while (rand === null || rand === indexToExclude) {
        rand = Math.round(Math.random() * (lengthOfArray - 1));
    }

    return rand;
}

function setValues() {
    shuffle(values);
    car_index = values.indexOf('car');

    var index = 0;
    values.forEach(item => {
        if (item === 'car')
            $('.door[data-pos="' + index + '"] .car').addClass('show');
        else
            $('.door[data-pos="' + index + '"] .goat').addClass('show');

        index++;
    });
}

setValues();

$('.door').on('click', function () {
    if(!$(this).hasClass('opened')){
        if (selected_index === null) {
            $('#set-btn').removeAttr('disabled');
        }
    
        if (!$(this).hasClass('selected')) {
            $('.door.selected').removeClass('selected');
            $(this).addClass('selected');
    
            $('.selected-text.show').removeClass('show');
            $(this).parent().find('p').addClass('show');
    
            selected_index = parseInt($(this).attr('data-pos'));
        }
    }
});

$('#set-btn').on('click', function () {
    $('#set-btn').attr('disabled', 'disabled');

    var found;
    if (car_index === selected_index) {
        found = getRandomWithOneExclusion(values.length, selected_index);
    } else {
        found = values.findIndex((item, i) => i !== car_index && i !== selected_index);
    }

    $('.door[data-pos="' + found + '"]').addClass('opened');
    $('#select-btn').removeAttr('disabled');
});

$('#select-btn').on('click', function(){
    $('.door[data-pos="' + selected_index + '"]').addClass('opened');
    games++;
    if(selected_index === car_index){
        wins++;
        $('.result-text').text('¡Ganaste!');
    }else{
        $('.result-text').text('Perdiste :(');
    }

    $(this).attr('disabled', 'disabled');
    $('#reset-btn').removeAttr('disabled');

    var percentage = parseFloat((wins/games) * 100).toFixed(2);
    $('.percentage-text').text(percentage+'%');
});

$('#reset-btn').on('click', function(){
    $(this).attr('disabled', 'disabled');
    
    $('.door').removeClass('selected opened');
    $('.selected-text').removeClass('show');
    $('.result-text').text('');

    car_index = null;
    selected_index = null;

    setTimeout(function(){
        $('.car, .goat').removeClass('show');
        setValues();
    }, 1000);
});