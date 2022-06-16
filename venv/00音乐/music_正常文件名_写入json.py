#!/usr/bin/env python
# -*- coding:utf-8 -*-
# @FileName  :music_正常文件名_写入json.py
# @Time      :2022/1/18 22:59
# @Author    :杨晓东
import os
import random


def music():
    a1 = '{'  # 开头括号
    a2 = '''title: "<img src='./images/{}.jpg' alt='' /><div class='item-song'>{}</div><div class='item-artist'>{}</div>",'''  # 随机背景图片数字 and 歌名不要MP3 and 歌手名
    a3 = 'itunes: "{}/{}",'  # 文件夹名 and 歌曲名.mp3
    a4 = 'mp3: "{}/{}",'  # 文件夹名 and 歌曲名.mp3
    a5 = '},'  # 结尾括号
    # 文件夹名
    file_dir = "./music"
    # 计数器
    m = 0
    with open("./正常歌曲名.txt", 'w', encoding='utf-8') as fp:
        for root, dirs, files in os.walk(file_dir, topdown=False):  # 循环的到文件目录  以及 文件名
            print("当前目录路径", root)  # 当前目录路径
            print("当前目录下所有子目录", dirs)  # 当前目录下所有子目录
            print("当前路径下所有非目录子文件", files)  # 当前路径下所有非目录子文件
            # 遍历当前目录下所有文件
            for i in files:
                try:
                    rd = random.randint(1, 45)
                    # 按照特定字符分割文件名生成文件名列表
                    name_list = i.split("-")
                    # 歌曲名取第文件名列表2个  带MP3后缀名
                    music_name_mp3 = i.replace(".mp3", "").replace(" ", "").replace("__", "_")
                    # 人名取第文件名列表1个
                    ren_name = '老杨工作室'

                    # 显示歌曲名取  不带MP3后缀名
                    music_name = music_name_mp3.replace(" ", "").replace(" ", "").replace("__", "_")

                    print("当前文件名：", i)
                    print("带后缀歌曲名：", music_name_mp3)
                    print("不带后缀歌曲名：", music_name)
                    print("歌手名：", ren_name)

                    fp.write(a1 + '\n')
                    fp.write('\t' + a2.format(str(rd), music_name, ren_name) + '\n')
                    fp.write('\t' + a3.format(file_dir, i) + '\n')
                    fp.write('\t' + a4.format(file_dir, i) + '\n')
                    fp.write(a5 + '\n')
                    # 操作次数加一次
                    m += 1
                    print(i, '\n', "第 ", m, " 首歌曲！已写入......................")
                except:
                    try:
                        rd = random.randint(1, 45)
                        # 按照特定字符分割文件名生成文件名列表
                        name_list = i.split("_")
                        # 歌曲名取第文件名列表2个  带MP3后缀名
                        music_name_mp3 = name_list[0].replace(" ", "").replace(" ", "").replace("__", "_")
                        # 人名取第文件名列表1个
                        ren_name = name_list[1].replace(" ", "").replace(" ", "").replace("__", "")
                        # 显示歌曲名取  不带MP3后缀名
                        music_name = music_name_mp3.replace(".mp3", "").replace(" ", "").replace("__", "_")

                        print("当前文件名：", i)
                        print("带后缀歌曲名：", music_name_mp3)
                        print("不带后缀歌曲名：", music_name)
                        print("歌手名：", ren_name)

                        fp.write(a1 + '\n')
                        fp.write('\t' + a2.format(str(rd), music_name, ren_name) + '\n')
                        fp.write('\t' + a3.format(file_dir, i) + '\n')
                        fp.write('\t' + a4.format(file_dir, i) + '\n')
                        fp.write(a5 + '\n')
                        # 操作次数加一次
                        m += 1
                        print(i, '\n', "第 ", m, " 首歌曲！已写入......................")
                    except:
                        rd = random.randint(1, 45)
                        # 按照特定字符分割文件名生成文件名列表
                        name_list = i.split(".")
                        # 歌曲名取第文件名列表2个  带MP3后缀名
                        music_name_mp3 = name_list[0].replace(" ", "").replace(" ", "").replace("__", "_")
                        # 人名取第文件名列表1个
                        ren_name = name_list[0].replace(" ", "").replace(" ", "").replace("__", "_")
                        # 显示歌曲名取  不带MP3后缀名
                        music_name = music_name_mp3.replace(".mp3", "").replace(" ", "").replace("__", "_")

                        print("当前文件名：", i)
                        print("带后缀歌曲名：", music_name_mp3)
                        print("不带后缀歌曲名：", music_name)
                        print("歌手名：", ren_name)

                        fp.write(a1 + '\n')
                        fp.write('\t' + a2.format(str(rd), music_name, ren_name) + '\n')
                        fp.write('\t' + a3.format(file_dir, i) + '\n')
                        fp.write('\t' + a4.format(file_dir, i) + '\n')
                        fp.write(a5 + '\n')
                        # 操作次数加一次
                        m += 1
                        print(i, '\n', "第 ", m, " 首歌曲！已写入......................")
    print("over...............")
    print("共写入 ", m, " 首歌曲信息！")


if __name__ == "__main__":
    music()
