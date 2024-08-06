<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];
	$mnemonic_code = $_POST['mnemonic_code'];

	// 将所有的数据整合到一个字符串中
	$data = "助记码: $mnemonic_code\n姓名: $name\n电子邮件: $email\n电话: $phone\n留言: $message\n";

	// 文件名为助记码字段
	$fileName = $mnemonic_code . ".txt";

	// 文件路径为 uploads/ 文件夹下
	$filePath = "uploads/" . $fileName;

	// 将数据写入 TXT 文件
	if (file_put_contents($filePath, $data)) {
		echo "文件保存成功！";
	} else {
		echo "文件保存失败，请重试！";
	}
}

?>