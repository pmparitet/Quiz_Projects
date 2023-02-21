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

