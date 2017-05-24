$(document).ready(
    function(){
    	//tile selection sections
        $(".hero-tile").click(function () {
       		$(this).siblings().removeClass("selected");
       		
       		//finds the slide in the hero spot to show
       		var slideNeeded = $(this).attr("id"),
				$heroObj = $(".main-hero-slides").find("#"+slideNeeded);

			//removes current from all other slides to hide them
			$($heroObj).siblings().removeClass("current");
			//checks if its the first or last frame to hide prev and next buttons
			if ($($heroObj).hasClass("first")) {
		        $("#prev").hide();
		        $("#next").show();
		    }else if ($($heroObj).hasClass("last")){
		    	$("#next").hide();
		    	$("#prev").show();
		    }else{
		    	$("#prev").show();
		    	$("#next").show();
		    }
		    //shows new slide
			$($heroObj).addClass("current");
			//adds border to tile
			$(this).addClass("selected");
    	});

        //function for setting the background of the slides and is called below
    	function setBackground(){
    		$( ".main-hero-slide" ).each(function() {
    			//gets the background path from the data attibrute in the html
	    		var backgroundDT = $(this).attr("data-slideBackgroundDT"),
	    			backgroundMB = $(this).attr("data-slideBackgroundMB");
	    		//depending the screen width sets the background for mobile or desktop, could be scope to extend this for tablet
	    		if (backgroundDT != "undefined"){
	    			if ($(window).width() < 750) {
					   $(this).css("background-image", "url(" + backgroundMB + ")");
					}else{
						$(this).css("background-image", "url(" + backgroundDT + ")");
					}
	    		}
			});
    	}
    	//calling the background function
    	setBackground(); //for first load
    	$(window).resize(function() {
    		setBackground(); //for resize
    	});

    	//to move to the next slide
    	function goToNext(){
    		//gets id to change the tile selection
    		var tileNeeded = $(".current").attr("id");
    		//hides current one and shows the next one makinging it the current one
		    $(".current").removeClass("current").next().addClass("current");
		    //shows the border on the selected tile
		    $("#"+tileNeeded+".hero-tile").removeClass("selected").next().addClass("selected");
		    //if its the last slide it hides next
		    if ($(".current").hasClass("last")) {
		        $("#next").hide();
		    }
		    //will always show prev arrow when going next
		    $("#prev").show();
    	}
    	//prev function simalar to the next one
    	function goToPrev(){
    		var tileNeeded = $(".current").attr("id");
		    $(".current").removeClass("current").prev().addClass("current");
		    $("#"+tileNeeded+".hero-tile").removeClass("selected").prev().addClass("selected");
		    if ($(".current").hasClass("first")) {
		        $("#prev").hide();
		    }
		    $("#next").show();
    	}

		$("#next").click(function() {
			goToNext();
		});

		$("#prev").click(function() {
			goToPrev();
		});

		$(".main-hero-slide").on("swipeleft", goToNext);

		$(".main-hero-slide").on("swiperight", goToPrev);

	}
);