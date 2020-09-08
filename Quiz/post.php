<?php
	if (!$_POST) exit('No direct script access allowed');
	
    echo '<b class="t-green">Это ответ сервера</b>';

    echo '< pre>';
	print_r($_POST);
	echo '< /pre>';