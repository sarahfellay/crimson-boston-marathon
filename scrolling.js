$(window).on("scroll resize", function(){
    var pos = $('#clock').offset(); // Retrieve position of the clock
    
    // Compare position of clock to position of event paragraph
    $('.event').each(function(){
        if(pos.top >= ($(this).offset().top - 150) && pos.top <= $(this).next().offset().top)
        {
            $('#clock').text($(this).attr('id')); // Retrieve date value from the paragraph
            return; // Break the loop
        }
    });
});

$(document).ready(function(){
    $(window).trigger('scroll'); // Initialize value of clock
});

$(window).unload(function() {
    $('body').scrollTop(0); // on reload, automatically go to top of page
});