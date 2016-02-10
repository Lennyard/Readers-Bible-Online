$(function(){
	populateBooks();
	// Sends AJAX request when drop down is changed
	$(".books").on("click", "a", function(){	
		var searchTerm = $(this).text();
		getRequest(searchTerm);
		
		});


function getRequest(searchTerm) {
		var params = {
			p: searchTerm,
			v: "nasb" // saint esv, where art thou?
		};
		url = 'http://getbible.net/json?callback=?';
		
		$.getJSON(url, params, function(data){
			var html = "";
			var html1 ="";
			//grab each book
			$.each(data.book, function(index, value){
				//grab each chapter and verse
				$.each(value.chapter, function(index, value){
					console.log(value);
					//if(index.verse )
					html += value.verse + " "; 
				});
			});
			
			$("#book-text").html(html);
		});
	}


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





});