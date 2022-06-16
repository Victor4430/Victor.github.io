#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :py_venv -> music_文件_去数字_重命名_移动文件夹.py
# @IDE       :PyCharm
# @Time      :2022/6/16 21:47
# @Author    :杨晓东
# @Email     :lzj155@foxmail.com
# @homepage  :www.demo520.com

import os
import shutil
import re


# 修改文件名函数
def run():
    # 源文件夹路径
    path = './music_kuwo'

    # 计数器
    m = 1  # 总共操作文件的数量
    n = 0  # 文件出现重复的数量
    y = 0  # 总共移动的文件数量
    ss = []  # 存入所有文件名   查重
    for file in os.listdir(path):
        # 获取旧文件名（就是路径+文件名）
        old_name = path + os.sep + file  # os.sep添加系统分隔符

        print("正在修改第 ", m, " 个文件。")

        print("老文件名字：", old_name)
        # 如果是目录则跳过
        if os.path.isdir(old_name):
            continue
        try:
            # 判断后缀名为.mp3
            if old_name[-4:] == '.mp3':
                # 设置新文件名
                pattern = re.compile(r'(-[0-9](.*?).mp3)')  # 正则匹配不需要的字段
                result = re.findall(pattern, old_name)[0][0]  # 提取不需要的字段
                print("不需要的字段：", result)
                new_name = old_name.replace(result, '.mp3')
                print("新文件名字：", new_name)
                # 把新文件的名字添加到列表
                ss.append(new_name)
                # 如果新名字出现在列表中小余2次  则继续移动该文件
                if ss.count(new_name) < 2:
                    # 用os模块中的rename方法对文件改名
                    os.rename(old_name, new_name)
                    # 移动这个文件到新的目录
                    move_file(new_name)
                    # 输出日志
                    print(new_name, "  已经移动到music文件夹！")
                    # 操作次数加一次
                    m += 1
                    # 文件移动次数加一次
                    y += 1
                elif ss.count(new_name) >= 2:
                    # 重复文件的次数加一次
                    n += 1
                    print("第 ", m, " 个文件出现重复。")
                    pass

            # 判断后缀名为.flac
            elif old_name[-4:] == 'flac':
                # 设置新文件名
                pattern = re.compile(r'(-[0-9](.*?).flac)')  # 正则匹配不需要的字段
                result = re.findall(pattern, old_name)[0][0]  # 提取不需要的字段
                print("不需要的字段：", result)
                new_name = old_name.replace(result, '.flac')
                print("新文件名字：", new_name)
                # 把新文件的名字添加到列表
                ss.append(new_name)
                # 如果新名字出现在列表中小余2次  则继续移动该文件
                if ss.count(new_name) < 2:
                    # 用os模块中的rename方法对文件改名
                    os.rename(old_name, new_name)
                    # 移动这个文件到新的目录
                    move_file(new_name)
                    # 输出日志
                    print(new_name, "  已经移动到music文件夹！")
                    # 操作次数加一次
                    m += 1
                    # 文件移动次数加一次
                    y += 1
                elif ss.count(new_name) >= 2:
                    # 重复文件的次数加一次
                    n += 1
                    print("第 ", m, " 个文件出现重复。")
                    pass

            # 判断后缀名为.aac
            elif old_name[-4:] == '.aac':
                # 设置新文件名
                pattern = re.compile(r'(-[0-9](.*?).aac)')  # 正则匹配不需要的字段
                result = re.findall(pattern, old_name)[0][0]  # 提取不需要的字段
                print("不需要的字段：", result)
                new_name = old_name.replace(result, '.aac')
                print("新文件名字：", new_name)
                # 把新文件的名字添加到列表
                ss.append(new_name)
                # 如果新名字出现在列表中小余2次  则继续移动该文件
                if ss.count(new_name) < 2:
                    # 用os模块中的rename方法对文件改名
                    os.rename(old_name, new_name)
                    # 移动这个文件到新的目录
                    move_file(new_name)
                    # 输出日志
                    print(new_name, "  已经移动到music文件夹！")
                    # 操作次数加一次
                    m += 1
                    # 文件移动次数加一次
                    y += 1
                elif ss.count(new_name) >= 2:
                    # 重复文件的次数加一次
                    n += 1
                    print("第 ", m, " 个文件出现重复。")
                    pass
        except:
            print("第 ", m, " 个文件出现错误。。。。。。。。。")
            pass

    print("文件名列表：",ss)
    print("共修改了 ", m, " 个文件。")
    print("共重复了 ", n, " 个文件。")
    print("共移动了 ", y, " 个文件。")


# 复制所有文件到另一个文件夹函数
def copy_files():
    src = './music_kuwo'  # 源文件夹路径
    des = './music'  # 目标文件夹路径
    for file in os.listdir(src):
        # 遍历源文件夹中的文件
        src_file_name = os.path.join(src, file)  # 得到源文件的完整路径
        print("要被复制的文件完整路径名：", src_file_name)
        if os.path.isfile(src_file_name):  # 用于判断某一对象（需要提供绝对路径）是否为文件
            shutil.copy(src_file_name, des)  # shutil.copy  , move函数放入源文件的路径名，然后目标文件夹的路径名



# 复制文件到另一个文件夹函数
def copy_file(src_file_name, des='./music'):
    # src = './music_kuwo'  # 源文件夹路径
    # des = './music'  # 目标文件夹路径

    print("要被复制的文件完整路径名：", src_file_name)
    if os.path.isfile(src_file_name):  # 用于判断某一对象（需要提供绝对路径）是否为文件
        shutil.move(src_file_name, des)  # shutil.copy  , move函数放入源文件的路径名，然后目标文件夹的路径名



# 移动文件到另一个文件夹函数
def move_file(src_file_name, des='./music'):
    # src = './music_kuwo'  # 源文件夹路径
    # des = './music'  # 目标文件夹路径

    print("要被复制的文件完整路径名：", src_file_name)
    if os.path.isfile(src_file_name):  # 用于判断某一对象（需要提供绝对路径）是否为文件
        shutil.move(src_file_name, des)  # shutil.copy  , move函数放入源文件的路径名，然后目标文件夹的路径名


if __name__ == "__main__":
    run()
