var countQuestions = 0;

function visibilityQuestionStart() {
	console.log('нажатие на кнопку start');
	// нахожу и убираю классы для главного блока "Start"
	buttonStart = document.querySelector('.quiz-start');
	buttonStart.classList.replace('active-question', 'invisible-question');
	buttonStartMain = document.querySelector('.quiz-main');
	buttonStartMain.classList.replace('invisible-main', 'active-main');
	// назначаю классы видимости (active-question) вопросу №1
	buttonStartToQ1 = document.querySelector('.question-1');
	buttonStartToQ1.classList.replace('invisible-question', 'active-question');
	buttonStart_b = document.querySelector('.quiz-footer');
	buttonStart_b.classList.replace('invisible-footer', 'active-footer');
	document.querySelector('.startImg').classList.remove('startImg');
	document.getElementById('button-previous').disabled = true;
	document.getElementById('button-next').setAttribute('onclick', "document.location.href = '#!question-1';");
}; 

function visibilityQuestion() {
	console.log('нажатие на кнопку ' + this.id);
	// ищу блок с классом active-question
	test_el_next = document.getElementsByClassName('active-question')[0];
	// создаю массив из первого класса и разделяю вопрос и № ["question", "1"]
	mas_test_el_next = test_el_next.classList[0].split('-');
	// собираю новое название класса из: "question" + "-" + (инкремент)
	if (this.id == 'button-next') {
		new_test_el_next = mas_test_el_next[0] + '-' + (++mas_test_el_next[1]);
		if (mas_test_el_next[1] > countQuestions) {
			document.querySelector('.finishForm').classList.replace('invisible-finish', 'active-finish');
			buttonStart_b.classList.replace('active-footer', 'invisible-footer');
			test_el_next.classList.replace('active-question', 'invisible-question');
			document.getElementById('button-next').setAttribute('onclick', "document.location.href = '#!finishForm';");
			console.log('больше вопросов нет => стоп');
			return;
		} 
		if (new_test_el_next == 'question-2') {
			document.getElementById('button-previous').disabled = false;
		};
		// работает! В связке с слушателем изменений .checkAnswer, меняет видимость кнопки при переходе к следующему вопросу
		$('#button-next').attr('disabled', true);
		// передает заглушку с номером вопроса в строку URL
		document.getElementById('button-next').setAttribute('onclick', "document.location.href = '#!"+new_test_el_next+"';");
	}
	else if (this.id == 'button-previous') {
		new_test_el_next = mas_test_el_next[0] + '-' + (--mas_test_el_next[1]);
		if (new_test_el_next == 'question-1') {
			document.getElementById('button-previous').disabled = true;
		};
	};
	// меняю классы, старый блок не видимый
	test_el_next.classList.replace('active-question', 'invisible-question');
	// ищу новый класс для замены класса видимости
	buttonNextToQ = document.getElementsByClassName(new_test_el_next)[0];
	// устанавливаю класс active-question
	buttonNextToQ.classList.replace('invisible-question', 'active-question');
	// проверка у какого блока установлен класс видимости
}

function isCheckedAnswers() {
		if ($('.active-question .checkAnswer:checked')) {
	    	$('#button-next').attr('disabled', false);
	    	console.log('chek!');
		} else {
			$('#button-next').attr('disabled', true);
	    	console.log('ошибка');
		}
	
}


function createCodQuestion(questionNumber, box, questionsText, answers) {
	/* тут нужно написать единый код для заполнения html разметки, 
	вместо if для распознования типа бокса использую переменную box, 
	сразу подставляя в инпут переменную, а не значение
	*/

	var number_q = document.createElement('div');
	number_q.className = questionNumber + ' ' + 'invisible-question';

	document.querySelector('.questions-all').append(number_q);
	
	var title_q = document.createElement('div');
	title_q.className = 'question-title';
	number_q.append(title_q);
	
	var title_span = document.createElement('span');
	title_span.className = 'questionsText';
	title_span.innerHTML = questionsText;
	title_q.append(title_span);

	var answers_q = document.createElement('div');
	answers_q.className = 'question-answers';
	number_q.append(answers_q);

	for (nameAnswer of answers) {
		var label_q = document.createElement('label');
		if (box == 'checkbox') {
			label_q.className = 'custom-checkbox';
		} else {
			label_q.className = 'custom-radio';
		}
		answers_q.append(label_q);

		var input_q = document.createElement('input');
		input_q.setAttribute('type', box);
		input_q.className = questionNumber + ' ' + 'checkAnswer';
		input_q.setAttribute('name', questionNumber)
		input_q.setAttribute('value', nameAnswer);
		label_q.append(input_q);

		var span_q = document.createElement('span');
		span_q.className = 'nameAnswer';
		span_q.innerHTML = nameAnswer;
		label_q.append(span_q);
	};
};


//--- Тест ---
$(document).on('change', '.checkAnswer', function () {
	// работает! Разблокирует кнопку next при изменении, если изменяемый элемент чекед
	if ($(this).prop('checked')) {
	    $('#button-next').attr('disabled', false);
	    console.log('chek!')
	} else {
	    console.log('unchecked')
	}
	// получение массива с value
    const arrayCheckedQ = [];
    $('.checkAnswer:checked').each(function() {
        arrayCheckedQ.push($(this).val());
    });

    console.log(arrayCheckedQ);
    // получение обьекта через сириалайз
});


document.getElementById('button-start').addEventListener('click', visibilityQuestionStart, true);
document.getElementById('button-previous').addEventListener('click', visibilityQuestion, true);
document.getElementById('button-next').addEventListener('click', visibilityQuestion, true);


// перебор вопросов из словаря (data.js) и передача в функцию
function readQuestion(){
	for (var questionNumber in data_q) {
	 	createCodQuestion(questionNumber,
						data_q[questionNumber].box, 
						data_q[questionNumber].questionsText, 
						data_q[questionNumber].answers);
	 	++countQuestions;
	 	console.log(countQuestions);
	}
}
	
/* плагин для форматирования полей форм 
https://github.com/igorescobar/jQuery-Mask-Plugin
*/
$(document).ready(function() {
  $(".phoneMask").mask("+7(000)000-00-00", {
    placeholder: "+7(___)___-__-__",
    clearIfNotMatch: true
  });
});


window.onload = readQuestion;

