#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> 验证码识别部分.py
# @IDE       :PyCharm
# @Time      :2022/5/5 15:27
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

'''
可做 大部分图片验证码识别
'''

import ddddocr


def run():
    # 实例化  验证码识别的类方法
    ocr = ddddocr.DdddOcr()
    # 标识 验证码目录
    path = 'D:\下载暂存\天猫_工商执照\验证码.jpeg'
    with open(path, 'rb') as f:
        # 给二进制数据  赋予句柄
        img = f.read()
        # 调用验证码识别方法  开始识别传入的二进制数据
        res = ocr.classification(img)
        # 输出识别后的数据
        print(res)
        # 返回识别后的数据
        return res


if __name__ == "__main__":
    run()
