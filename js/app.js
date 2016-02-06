$(function(){
	// Sends AJAX request when 
	$("#books").change(function(){	
		var searchTerm = $("#books").val();
		getRequest(searchTerm);
		
		});


function getRequest(searchTerm) {
		var params = {
			p: searchTerm,
			v: "nasb"
		};
		url = 'http://getbible.net/json?callback=?';
		
		$.getJSON(url, params, function(data){
			//console.log(data.book.chapter);
			//showResults(data.items);
			var html = "";
			$.each(data.book, function(index, value){
				//console.log(value.chapter);
				$.each(value.chapter, function(index, value){
						console.log(value);
					html += value.verse + " "; 
				});
			});
			
			$("#book_text").append(html);
		});
	}








});