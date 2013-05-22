function animate_to(minDiff, currentMins, currentHours)
{
	var animate = function() {
		if (minDiff != 0)
		{
			currentMins++;
			if (currentMins == 60)
			{
				currentHours++;
				currentMins = 0;
			}
			t = currentHours.toString() + ":" + currentMins.toString();
			$('#clock').text(t); // Retrieve date value from the paragraph
	
			window.requestAnimationFrame(animate);
			minDiff--;
		}
	}
	window.requestAnimationFrame(animate);
}

var hour_hand;
var minute_hand;

function draw_clock(){
	canvas = Raphael("clock",200, 200);
	var clock = canvas.circle(100,100,95);
	 clock.attr({"fill":"#f5f5f5","stroke":"#444444","stroke-width":"5"})  
	 var hour_sign;
	for(i=0;i<12;i++){
		var start_x = 100+Math.round(80*Math.cos(30*i*Math.PI/180));
		var start_y = 100+Math.round(80*Math.sin(30*i*Math.PI/180));
		var end_x = 100+Math.round(90*Math.cos(30*i*Math.PI/180));
		var end_y = 100+Math.round(90*Math.sin(30*i*Math.PI/180));	
		hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
	}    
	hour_hand = canvas.path("M100 100L100 50");
	hour_hand.attr({stroke: "#444444", "stroke-width": 6});
	minute_hand = canvas.path("M100 100L100 40");
	minute_hand.attr({stroke: "#444444", "stroke-width": 4});
	var pin = canvas.circle(100, 100, 5);
	pin.attr("fill", "#000000");
	eve.on('raphael.anim.frame.' + hour_hand.id, function() {
		hours = hour_hand.attr('transform')[0][1] / 30;
		minutes = (minute_hand.attr('transform')[0][1] / 6) % 60;
		function pad_minutes(minutes) {
			if (minutes < 10)
			{
				return "0" + minutes;
			}
			else return minutes;
		}
		function mod_hours(hours) {
			hours = hours % 24

			if (hours < 12)
			{
				suffix = "AM"
			}
			else suffix = "PM"

			hours = hours % 12;

			if (hours == 0)
			{
				hours = 12;
			}
			
			if (hours < 10)
			{
				hours = " " + hours;
			}

			return {"hours": hours, "suffix":suffix};
		}
		hours = mod_hours(Math.floor(hours));
		minutes = pad_minutes(Math.floor(minutes));

		$("#timestamp").text(hours["hours"] + ':' + minutes + " " + hours["suffix"]);

		console.log(hours["hours"] + ':' + minutes + " " + hours["suffix"]);
	});
}

function update_clock(hours, minutes){
	hour_rotate = hours * 30 + (minutes / 2);
	minute_rotate = 6 * minutes + (360 * hours);
	delay = minute_rotate * 2;
	hour_hand.animate({'transform': 'r' + hour_rotate + ',100,100'}, delay, "<>");
	minute_hand.animate({'transform': 'r' + minute_rotate + ',100,100'}, delay, "<>");
}



$(window).on("scroll resize", function(){
	var pos = $('#clock').offset(); // Retrieve position of the clock
	
	// Compare position of clock to position of event paragraph
	$('.event').each(function(){
		if(pos.top >= ($(this).offset().top - 150) && pos.top <= $(this).next().offset().top)
		{
			var newTime = $(this).attr('data-time').split(':');
			var newDate = $(this).attr('data-date');
			$("#datestamp").text(newDate)
			hour_hand.stop;
			minute_hand.stop;
			update_clock(newTime[0], newTime[1]);
		}
	});
});

$(document).ready(function(){
	$(window).trigger('scroll'); // Initialize value of clock
});

$(window).unload(function() {
	$('body').scrollTop(0); // on reload, automatically go to top of page
});