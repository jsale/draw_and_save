<html>
<body>

<?php

ini_set('memory_limit', '2048M');
ini_set('max_execution_time', 600);
ini_set('post_max_size', '64M');

$date_var = date('y_m_d_h_i_s');

define('UPLOAD_DIR', './');
define('URL_DIR', 'http://localhost/draw_and_save-master/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$filename = "saved_canvas.png";
$savefile = UPLOAD_DIR . $filename;
$success = file_put_contents($savefile, $data);

?>

</body>
</html>
