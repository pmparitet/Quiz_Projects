var countQuestions = 0;
//var input_qClassName = [];

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
	document.getElementById('button-previous').disabled = true;
}; 

function visibilityQuestion() {
	console.log('нажатие на кнопку ' + this.id);
	// ищу блок с классом active-question
	test_el_next = document.getElementsByClassName('active-question')[0];
	// console.log(test_el_next);
	// создаю массив из первого класса и разделяю вопрос и № ["question", "1"]
	mas_test_el_next = test_el_next.classList[0].split('-');
	// console.log(mas_test_el_next);
	// собираю новое название класса из: "question" + "-" + (инкремент)
	if (this.id == 'button-next') {
		new_test_el_next = mas_test_el_next[0] + '-' + (++mas_test_el_next[1]);
		if (mas_test_el_next[1] > countQuestions) {
			console.log('больше вопросов нет => стоп');
			return;
		} 
		// console.log(new_test_el_next);
		if (new_test_el_next == 'question-2') {
			document.getElementById('button-previous').disabled = false;
		};
		// работает! В связке с слушателем изменений .checkAnswer, меняет видимость кнопки при переходе к следующему вопросу
		$('#button-next').attr('disabled', true);
		//isCheckedAnswers();
		/*if ($('.active-question .checkAnswer').prop('checked')) {
	    $('#button-next').attr('disabled', false);
	    console.log('chek next OK')
		} else {
	    $('#button-next').attr('disabled', true);
	    console.log('disabled TRUE! нет отмеченного ответа')
		}*/
	}
	else if (this.id == 'button-previous') {
		new_test_el_next = mas_test_el_next[0] + '-' + (--mas_test_el_next[1]);
		// console.log(new_test_el_next);
		if (new_test_el_next == 'question-1') {
			document.getElementById('button-previous').disabled = true;
		};
		//isCheckedAnswers();
		/*if ($('.active-question .checkAnswer').prop('checked')) {
	    $('#button-next').attr('disabled', false);
	    console.log('chek previous ОК')
		} else {
	    $('#button-next').attr('disabled', true);
	    console.log('disabled TRUE! нет отмеченного ответа')
		}*/
	};
	// меняю классы, старый блок не видимый
	test_el_next.classList.replace('active-question', 'invisible-question');
	// ищу новый класс для замены класса видимости
	buttonNextToQ = document.getElementsByClassName(new_test_el_next)[0];
	// console.log(buttonNextToQ);
	// устанавливаю класс active-question
	buttonNextToQ.classList.replace('invisible-question', 'active-question');
	// проверка у какого блока установлен класс видимости
	// test_el_check = document.getElementsByClassName('active-question');
	// console.log(test_el_check);
	//isCheckedAnswers();
}

function isCheckedAnswers() {
		if ($('.active-question .checkAnswer:checked')) {
	    	$('#button-next').attr('disabled', false);
	    	console.log('chek!');
		} else {
			$('#button-next').attr('disabled', true);
	    	console.log('ошибка');
		}
	//console.log('chek');
	//console.log(this.checked)
	
	/* работает с кнопкой 
	проверка на чекет по id и вызов функции для кнопки start
	if (document.getElementById("example").checked) {
		console.log('chek');
		visibilityQuestionStart();
	} else {
		console.log('unchecked');
	}*/
	
	//this.is(":checked") 
	//document.getElementById('button-next').disabled = false;
	//buttonNextCheck = document.getElementById('button-next')
	//buttonNextCheck.onchange
/*	if (true) {
		
	} else {
		document.getElementById('button-next').disabled = true;
	}*/
}



/*
console.log(document.querySelectorAll('.questions-all')); */
/*
var test_qall = document.querySelector('.active-question');
var test_el = document.getElementsByClassName('active-question');
console.log(test_el); 
console.log(test_qall);
		var parentDOM = document.getElementById("parent-id");
        
        var test=parentDOM.getElementsByClassName("test");//test is not target element
      //  console.log(test);//HTMLCollection[1]

        var testTarget=document.getElementsByClassName("questions-all")[0];//hear , this element is target
        // console.log(testTarget);

*/


// f заполняет html
// function createCodQuestion(box) {
function createCodQuestion(questionNumber, box, questionsText, answers) {
	/* тут нужно написать единый код для заполнения html разметки, 
	вместо if для распознования типа бокса использую переменную box, 
	сразу подставляя в инпут переменную, а не значение
	*/
	
	// questionNumber = split('.' + questionNumber);

	var number_q = document.createElement('div');
	number_q.className = questionNumber + ' ' + 'invisible-question';
	//number_q.setAttribute('onchange', 'isCheckedAnswers()');
	//number_q.setAttribute('id', questionNumber);
	document.querySelector('.questions-all').append(number_q);
	
	var title_q = document.createElement('div');
	title_q.className = 'question-title';
	number_q.append(title_q);
	
	var title_span = document.createElement('span');
	title_span.className = 'is-block';
	title_span.innerHTML = questionsText;
	title_q.append(title_span);

	var answers_q = document.createElement('div');
	answers_q.className = 'question-answers';
	number_q.append(answers_q);

	for (nameAnswer of answers) {
		  // console.log(name);
		var label_q = document.createElement('label');
		if (box == 'checkbox') {
			label_q.className = 'custom-checkbox';
		} else {
			label_q.className = 'custom-radio';
		}
		//label_q.setAttribute('onchange', 'isCheckedAnswers()');
		// label_q.setAttribute('for', 'checkbox-1');
		// label_q.innerHTML = "Всем привет! Вы прочитали важное сообщение.";
		// document.querySelector('.question-answers').append(label_q);
		answers_q.append(label_q);

		var input_q = document.createElement('input');
		input_q.setAttribute('type', box);
		input_q.className = questionNumber + ' ' + 'checkAnswer';
		// input_q.setAttribute('id', 'checkbox-1');
		input_q.setAttribute('name', questionNumber)
		input_q.setAttribute('value', nameAnswer);
		//input_q.setAttribute('onchange', 'isCheckedAnswers(this)');
		// input_q.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
		label_q.append(input_q);

		var span_q = document.createElement('span');
		span_q.innerHTML = nameAnswer;
		label_q.append(span_q);
	};
};

// проверка на чекет по id 
//var c = document.getElementById("example").checked;
//console.log(c);
// на чистом js поиск по классу
/*document.querySelector('.checkboxClass').addEventListener('change', function() {
    if (this.checked) {
        console.log('checked')
    } else console.log('unchecked')
})*/


// получение значения value при установке чекбоксов 
/*$('.array-checked').on('change', function () {
    const arrayChecked = [];

    $('.array-checked:checked').each(function() {
        arrayChecked.push($(this).val());
    });

    console.log(arrayChecked);
});*/

// ГОТОВО !!! НЕ ПРАВИТЬ !!! получение массива value выбранных checkbox, см как добавить название вопроса (статья jQuery - Получить значение полей формы)
/*$(document).on('change', '.checkAnswer', function () {
    const arrayCheckedQ = [];
    $('.checkAnswer:checked').each(function() {
        arrayCheckedQ.push($(this).val());
    });

    console.log(arrayCheckedQ);
    
});*/

//--- Тест ---
$(document).on('change', '.checkAnswer', function () {
	// проверка поиска активного вопроса ТЕСТ!
//	$('.active-question .checkAnswer').each(function() {
		/*if ($('.active-question .checkAnswer:checked')) {
	    	$('#button-next').attr('disabled', false);
	    	console.log('chek!');
		} else {
			$('#button-next').attr('disabled', true);
	    	console.log('ошибка');
		}*/
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
    const data = $('.checkAnswer:checked').serializeArray();
    $.each(data,function(){
	console.log(this.name+'='+this.value);})
	console.log(data[0]);
});




/*$('.question-1Check').on('click', function() {
    $('.question-1Check:checked').each(function(){
        console.log( $(this).val() )
    });
});*/


document.getElementById('button-start').addEventListener('click', visibilityQuestionStart, true);
document.getElementById('button-previous').addEventListener('click', visibilityQuestion, true);
document.getElementById('button-next').addEventListener('click', visibilityQuestion, true);
//document.getElementById('questions-1').addEventListener('change', isCheckedAnswers, true);


// перебор вопросов из словаря (data.js) и передача в функцию
function readQuestion(){
	for (var questionNumber in data_q) {
		// console.log(questionNumber);
		// createCodQuestion(data_q[x].box)
	 	createCodQuestion(questionNumber,
						data_q[questionNumber].box, 
						data_q[questionNumber].questionsText, 
						data_q[questionNumber].answers);
	 	++countQuestions;
	 	console.log(countQuestions);
	}
}



window.onload = readQuestion;


/* резерв if после замены на функцию
if (data_q[x].box == 'chekbox') {
		console.log('Вопрос с "chekbox":');
		console.log(data_q[x].questions);
		for (name of data_q[x].answers) {
			  console.log(name);
		}
	}
	else if (data_q[x].box == 'radio') {
		console.log('Вопрос с одним вариантом ответа')
	}
	else {console.log('Ошибка!')}
*/

// var data_q1 = {
// 		box1: 'chekbox',
// 		questions1: 'текст вопроса #1', 
// 		answers1: ['первый ответ', 'второй ответ', 'третий ответ ...']
// 	}

// for (i in data_q) {
// 	console.log(data_q[i]);
// }

/*
for (var i=0; i<data_q.length; i++) {
	console.log(data_q[i]);
}
*/


// var userNames = ['petya', 'vasya', 'evgeny'];

// for (name of userNames) {
//   console.log(name);
// }
