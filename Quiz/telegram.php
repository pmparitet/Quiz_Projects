<?php

if (!$_POST) exit('No direct script access allowed');
 
if (!isset($_POST['f'])) exit('No direct script access allowed');
if (!isset($_POST['f']['user_phone'])) exit('No direct script access allowed');
if (!isset($_POST['f']['user_email'])) exit('No direct script access allowed');
 
$name = trim(strip_tags($_POST['f']['user_name']));
$email = trim(strip_tags($_POST['f']['user_email']));
$phone = trim(strip_tags($_POST['f']['user_phone']));
 
if (!filter_var($email, FILTER_VALIDATE_EMAIL))
{
    exit('Неверный email! Обновите страницу (F5) и укажите правильный адрес');
}
 
if (!$phone)
{
    exit('Не указан телефон! Обновите страницу (F5) и укажите свой телефон');
}

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее 

https://api.telegram.org/bot1098533239:AAFyVksLxfooS5A8PnHRhUZ8WzgE2RMX8b8/getUpdates

*/

//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['f']['user_name'];
$phone = $_POST['f']['user_phone'];
$email = $_POST['f']['user_email'];

//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1098533239:AAFyVksLxfooS5A8PnHRhUZ8WzgE2RMX8b8";

//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-470815697";

//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email
);

//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
  echo "Thank you";
} else {
  echo "Error";
}
?>