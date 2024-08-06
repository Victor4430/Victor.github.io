<?php

// 上传目录
$dir_path = './files/';
// 记录日志的文件
$log_path = './log.txt';
// 禁止上传的文件后缀名
$not_allow = ['asp', 'php'];
// 文件名
$file_name = $_FILES['file']['name'];
// 后缀名
$ext_name = strtolower(substr(strrchr($file_name, "."), 1));
if (in_array($ext_name, $not_allow)) {
    exit(json_encode(['code' => 0, 'msg' => '禁止上传文件类型']));
}
// 文件尺寸 转换成MB
$file_size = sprintf("%.6f", $_FILES['file']['size'] / 1024 / 1024) . 'MB';
// 访问IP
$active_ip = getRealIp();
// 如果上传目录不存在创建目录
if (!is_dir($dir_path)) {
    @mkdir($dir_path, 0755);
}

// 文件存放目录
$save_name = rtrim($dir_path, '/') . '/' . $file_name;
// 上传文件
if (move_uploaded_file($_FILES['file']['tmp_name'], $save_name)) {
    file_put_contents($log_path, "[" . date('Y-m-d H:i:s') . "]" . " - IP:{$active_ip} - 文件名:{$file_name} - 文件大小:{$file_size}\r\n", FILE_APPEND);
    exit(json_encode(['code' => 1, 'msg' => '上传成功']));
} else {
    exit(json_encode(['code' => 1, 'msg' => '上传失败']));
}

function getRealIp()
{
    $ip = false;
    if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
        if ($ip) {array_unshift($ips, $ip);
            $ip = false;}
        for ($i = 0; $i < count($ips); $i++) {
            if (!eregi("^(10│172.16│192.168).", $ips[$i])) {
                $ip = $ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}
