<?php
// 获取当前日期作为请求参数（假设要获取当天的信息，可根据实际需求修改）
$currentDate = date('Y-m-d');
$currentDate = str_replace('-0', '-', $currentDate);

// 基本参数配置
$apiUrl = "http://v.juhe.cn/calendar/day"; // 接口请求URL
$method = "GET"; // 接口请求方式
$headers = ["Content-Type: application/x-www-form-urlencoded"]; // 接口请求header
$apiKey = "74421c96428b1a13057c8b88acf92105"; // 在个人中心->我的数据,接口名称上方查看

// 接口请求入参配置
$requestParams = [
    'key' => $apiKey,
    'date' => $currentDate,
];
$requestParamsStr = http_build_query($requestParams);

// 发起接口网络请求
$curl = curl_init();
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($curl, CURLOPT_URL, $apiUrl. '?'. $requestParamsStr);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_FAILONERROR, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
if (1 == strpos("$". $apiUrl, "https://")) {
    curl_setopt($curl, CURLOPT_SSSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
}
$response = curl_exec($curl);
$httpInfo = curl_getinfo($curl);
curl_close($curl);

// 直接返回获取到的响应数据，让前端可以接收到JSON格式的数据
header('Content-Type: application/json');
echo $response;