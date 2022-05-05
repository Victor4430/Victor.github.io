#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :${PROJECT_NAME} -> ${NAME}.py
# @IDE       :${PRODUCT_NAME}
# @Time      :${DATE} ${TIME}
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com
 
import csv
import requests
from lxml import etree


def run():
    # 设置开始网址
    url = "https://www.baidu.com"
    # 设置代理端口
    proxy = '127.0.0.1:4780'
    proxies = {"http": "http://" + proxy, "https": "http://" + proxy}
    # 设置请求头
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36"}
    # 开始请求网页
    req = requests.get(url, headers=headers, proxies=proxies)
    req.encoding = 'utf-8'
    print(req.text)

    # 解析网页
    html = etree.HTML(req.text)
    test = html.xpath('//*[@id="su"]/@value')[0]
    print(test, '访问成功！')

    # ip测试_显示当前ip地址
    ip_url = 'http://icanhazip.com'
    ip_req = requests.get(ip_url, headers=headers, proxies=proxies)
    print('当前ip：', ip_req.text)


# csv 保存_使用数组方法
def csv_data_save_1():
    # 传入一个文件对象，然后才能在这个文件对象的基础上调用csv的写入方法writerow（写入一行）writerrow（写入多行）

    # 定义标题栏
    headers = ['class', 'name', 'sex', 'height', 'year']
    # 内容_列表（数组）方式
    rows = [
        [1, 'xiaoming', 'male', 168, 23],
        [1, 'xiaohong', 'female', 162, 22],
        [2, 'xiaozhang', 'female', 163, 21],
        [2, 'xiaoli', 'male', 158, 21]
    ]
    # 如果打开csv文件出现空行的情况，那么需要添加一个参数 newline=''
    with open('test.csv', 'w', newline='') as f:
        # 创建csv操作句柄
        f_csv = csv.writer(f)
        # 利用句柄写入标题
        f_csv.writerow(headers)
        # 通过句柄写入内容
        f_csv.writerows(rows)


# csv 保存_使用字典方法
def csv_data_save_2():
    # 写入字典序列类型数据的时候，需要传入两个参数，
    # 一个是文件对象——f，
    # 一个是字段名称——fieldnames，
    # 到时候要写入表头的时候，只需要调用writerheader方法，
    # 写入一行字典系列数据调用writerrow方法，并传入相应字典参数，写入多行调用writerows

    # 定义标题栏
    headers = ['class', 'name', 'sex', 'height', 'year']
    # 内容_字典（序列）方式
    rows = [
        {'class': 1, 'name': 'xiaoming', 'sex': 'male', 'height': 168, 'year': 23},
        {'class': 1, 'name': 'xiaohong', 'sex': 'female', 'height': 162, 'year': 22},
        {'class': 2, 'name': 'xiaozhang', 'sex': 'female', 'height': 163, 'year': 21},
        {'class': 2, 'name': 'xiaoli', 'sex': 'male', 'height': 158, 'year': 21},
    ]
    # 如果打开csv文件出现空行的情况，那么需要添加一个参数 newline=''
    with open('./test.csv', 'w', newline='') as f:
        # 创建csv操作句柄 and 写入标题
        f_csv = csv.DictWriter(f, headers)
        # 调用 writerheader() 写入表头
        f_csv.writeheader()
        # 通过句柄写入内容
        f_csv.writerows(rows)


# csv 读取_方法
def csv_data_read():
    # 读取csv时需要使用reader，并传如一个文件对象，而且reader返回的是一个可迭代的对象，需要使用for循环遍历
    # 在上面，row是一个列表，如果想要查看固定的某列，则需要加上下标，例如我想要查看name，那么只需要改为row[1]
    with open('./test.csv') as f:
        f_csv = csv.reader(f)
        for row in f_csv:
            print(row)
            print(type(row))
            print(row[1])
            print(type(row[1]))


if __name__ == "__main__":
    run()



