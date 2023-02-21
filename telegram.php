<?php

if (!$_POST) exit('No direct script access allowed');
 
$dataForm = $_POST['form_data1'];
$name = $dataForm['0']{'value'};
$phone = $dataForm['1']{'value'};
$email = $dataForm['2']{'value'};

$dataCheckedBox = $_POST['form_data'];

$question1 = '';
$question2 = '';
$question3 = '';
$question4 = '';
$question5 = '';
$question6 = '';
$question7 = '';
$question8 = '';

for ($i=0; $i < count($dataCheckedBox); $i++) {
	if($dataCheckedBox[$i]['name'] == 'question-1') {
		$question1 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-2') {
		$question2 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-3') {
		$question3 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-4') {
		$question4 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-5') {
		$question5 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-6') {
		$question6 .= $dataCheckedBox[$i]['value'] .' ';
	} elseif ($dataCheckedBox[$i]['name'] == 'question-7') {
		$question7 .= $dataCheckedBox[$i]['value'] .' ';
	} else ($dataCheckedBox[$i]['name'] == 'question-8') {
		$question8 .= $dataCheckedBox[$i]['value'] .' '
	};
}

function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

$name = clean($name);
$email = clean($email);
$phone = clean($phone);
$question1 = clean($question1);
$question2 = clean($question2);
$question3 = clean($question3);
$question4 = clean($question4);
$question5 = clean($question5);
$question6 = clean($question6);
$question7 = clean($question7);
$question8 = clean($question8);

if(!empty($email) && !empty($phone)) {
    $email_validate = filter_var($email, FILTER_VALIDATE_EMAIL); 
	if($email_validate) {
        echo "Отправка";

		//в переменную $token нужно вставить токен, который нам прислал @botFather
		$token = "1098533239:AAFyVksLxfooS5A8PnHRhUZ8WzgE2RMX8b8";

		//нужна вставить chat_id (Как получить chad id, читайте ниже)
		$chat_id = "-470815697";

		//Далее создаем переменную, в которую помещаем PHP массив
		$arr = array(
			'Имя пользователя: ' => $name,
			'Телефон: ' => $phone,
			'Email' => $email,
			'Какую квартиру Вы ищете? ' => $question1,
			'Где бы вы хотели жить? ' => $question2,
			'Близость от метро или МЦД ' => $question3,
			'Готовую или в строящемся доме? ' => $question4,
			'Цель покупки? ' => $question5,
			'Желаемая стоимость квартиры ' => $question6,
			'Специальные условия для Вас ' => $question7,
			'В течение какого времени планируете приобрести квартиру? ' => $question8
		);

		//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
		foreach($arr as $key => $value) {
			$txt .= "<b><i>".$key."</i></b> ".$value."%0A";
		};

		//Осуществляется отправка данных в переменной $sendToTelegram
		$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

		//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
		if ($sendToTelegram) {
			echo "Thank you";
		} else {
			echo "Error";
		}
	} else {
		exit('Неверный email!');
	}
} else { // добавили сообщение
    exit("Заполните пустые поля");
}
?>