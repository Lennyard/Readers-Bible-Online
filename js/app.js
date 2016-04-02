$(function(){
	var $forCreator = $(".for-creator");
	var $forBookmark = $(".for-bookmark");
	
	//show who made this
	$(".creator").click(function(){
		$forBookmark.slideUp("fast");
		$forCreator.slideToggle("slow");
	});

	// show how to bookmark
	$(".how-bookmark").click(function(){
		$forCreator.slideUp("fast");
		$forBookmark.slideToggle("slow")
	});

	//go to saved bookmark
	$(".bookmark").click(function(){
		getBookmark();
	});

	populateBooks();
	// Sends AJAX request when drop down is changed
	$(".books").on("click", "a", function(){	
		var searchTerm = $(this).text();
		populateText(searchTerm);
		
		});


function populateText(searchTerm) {
		var params = {
			p: searchTerm,
			v: "nasb" // saint esv, where art thou?
		};
		url = 'http://getbible.net/json?callback=?';
		
		$.getJSON(url, params, function(data){
			var html = "";
			var counter = 1;
			//grab each book
			$.each(data.book, function(index, value){
				
				
				//grab each chapter and verse
				$.each(value.chapter, function(index, value){
					//if(index.verse )
					html += "<span data-book="+ searchTerm + " data-verse=" + counter++ + ">" + value.verse + "</span> "; 
				});
			});
			
			$("#book-title").text(searchTerm);
			$("#book-text").html(html);

		});
	}

// populates the list of books from the select book dropdown
function populateBooks(){
	var params = {
			v: "nasb" 
		};
		url = 'http://getbible.net/json?callback=?';
		
		$.getJSON(url, params, function(data){
			var books = "";
			$.each(data.version, function(index, value){
				books += "<li><a href='#'>" + data.version[index].book_name + "</a></li>"
			});

			$(".books").append(books);
		});
}

$("#book-text").on("click", "span", function(){
	var $this = $(this);
	var verse = $this.data("verse");
	var book = $this.data("book");
	
	//remove and add highlighting
	$this.click(function(){
		confirm("Bookmark this Verse?");
		$("span").removeClass("selected")
		$this.addClass("selected");
	});
	//remove and add Cookies to save location
	Cookies.remove("saved-book");
	Cookies.remove("saved-verse");
	Cookies.set("saved-book", book);
	Cookies.set("saved-verse", verse);
});

// get Cookie info.
function getBookmark() {
		var b = Cookies.get("saved-book");
		var v = Cookies.get("saved-verse");
		
		populateText(b);
		console.log(v);

		setTimeout(function(){
			$('html, body').animate({
	        scrollTop: $("span[data-verse='"+ v + "']").offset().top - 75
	    	});
		}, 2000);
		setTimeout(function(){
			$("span[data-verse='"+ v + "']").addClass("selected");
		}, 2500);
	
}
// put year in footer
var d = new Date();
var y = d.getFullYear();
$("footer").append("<h5>All Rights Reserved - Ankas Studios - " + y);
/*
//for the future - desktops
function setGrid(e){
	var $span = $("span").data();
	for (var i in data){
		$('<li>')
	}
}
*/


});