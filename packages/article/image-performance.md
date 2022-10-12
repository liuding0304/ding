---
title: 图像优化
description: 图像优化
open: false
---

# 图像优化

## 图像分类

1. 矢量图（svg）矢量图中的图形元素被定义为一个对象，包括颜色、大小、形状、位置等。适合用于构图形状比较简单的几何图片，logo、图表等，如果使用矢量图来实现复杂的图片，体积将会很大。优点：在任何缩放比例下，显示效果都同样清晰
1. 位图（jpeg、png 等）

## JPEG

JPEG 不支持透明度，并且是有损压缩

基线模式：可以做到自上而下加载

渐进式模式：先加载模糊图像，逐渐清晰，解码速度相比于基线模式会慢一点，因为会解码多次

## GIF

仅支持 256 色，现在一般用于呈现动画

优化 1: 可以使用`ImageMagick`报将多帧的 GIF 转 PNG

优化 2: 动画包含静态帧，使用`gifsicle`移除连续帧中重复的像素信息

优化 3: 使用视频代替 GIF，GIF 收到图像质量、播放帧率、播放长度影响，可能不是好的呈现方式。gif 无声音，动画长度较长，体积也会较大。好的视频编码格式可能体积更小。使用`ffmpeg`将 gif 转成 mpeg-4 或 webM，14MB 的 GIf 可以优化 1m 一下（书中案例）

## PNG

无损压缩高保真图片格式。PNG 支持透明度

## WebP

## SVG

## base64