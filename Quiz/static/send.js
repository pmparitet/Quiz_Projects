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
});