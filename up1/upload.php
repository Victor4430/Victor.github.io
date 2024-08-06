<?php
// 获取上传的文件信息
$file = $_FILES['file'];

// 确定保存文件的目录
$target_dir = "file/";

// 获取文件名并生成保存路径
$target_file = $target_dir . basename($file["name"]);

// 将文件从临时位置移动到指定目录下
if (move_uploaded_file($file["tmp_name"], $target_file)) {
    echo "文件已经保存在：" . $target_file;
} else {
    echo "文件保存失败";
}
?>
