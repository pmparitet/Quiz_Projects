$(function(){
    $('#postForm').on('submit', function(e){
        e.preventDefault();

        formData = $('#postForm').serializeArray();
        dataFormCheckedBox = $('#formCheckedBox').serializeArray();

        $.ajax({
            type: "POST",
            url: "./telegram.php",
            data: {
                form_data: dataFormCheckedBox,
                form_data1: formData
            },
            success: function(msg){
                    $('#resultMessage').html(msg);
                    console.log('It worked');
            },
            error: function(msg, text, error){ // отслеживание ошибок во время выполнения ajax-запроса
                $('#resultMessage').text('Хьюстон, У нас проблемы! ' + msg + text + ' | ' + error);
            },
        }); 
    });
});




/*
// пример с https://maxsite.org/page/send-form-ajax
$('#postForm').submit(function(){
    $.post(
        './telegram.php', // адрес обработчика
         $("#postForm").serialize(), // отправляемые данные          
        
        function(msg) { // получен ответ сервера  
            // $('#postForm').hide('slow'); // скрытие формы после вывода
            $('#postForm');
            $('#resultMessage').html(msg);
        }
    );
    return false;
});
*/




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