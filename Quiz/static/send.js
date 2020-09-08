// пример с https://maxsite.org/page/send-form-ajax
$('#postForm').submit(function(){
    $.post(
        './telegram.php', // адрес обработчика
         $("#postForm").serialize(), // отправляемые данные          
        
        function(msg) { // получен ответ сервера  
            $('#postForm').hide('slow');
            $('#resultMessage').html(msg);
        }
    );
    return false;
});





/* пример с https://myrusakov.ru/jquery-ajax-form.html
$(document).ready(function() {
	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "./telegram.php", 
			data: $(this).serialize()
		}).done(function() {$(this).find("input").val("");
			alert("Ваша заявка принята! Спасибо.");
			$("#form").trigger("reset");
		});
    	return false;
  });
});*/