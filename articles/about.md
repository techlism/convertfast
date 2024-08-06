---
title: "Behind the Scenes: The Making of ConvertFast"
date: "2024-08-05"
excerpt: "An insider's look at the development of ConvertFast, exploring its innovative use of Web Assembly, challenges faced, and lessons learned."
author:
  name: "Kundan"
  avatar: "https://github.com/techlism.png"
coverImage: "/convertfast_512.png"
---


As the creator of ConvertFast, I want to share the journey of developing this product. In this article, we'll explore the intuition behind the project, its current shortcomings, and the aspects I'm particularly proud of. No project is perfect, and ConvertFast is no exception. Let's have an honest discussion about its strengths and areas for improvement.

## The Secret Sauce: Web Assembly

At the heart of ConvertFast lies a powerful technology: Web Assembly. As of August 5th, 2024, conversions,compressions, and manipulations are powered by three key packages:

- [ffmpeg wasm](https://www.npmjs.com/package/@ffmpeg/ffmpeg)
- [magick wasm](https://www.npmjs.com/package/@imagemagick/magick-wasm)
- [imgly's background remover](https://github.com/imgly/background-removal-js)

These packages are essentially Web Assembly compilations of [FFMPEG](https://ffmpeg.org) and [IMAGE-MAGICK](https://www.imagemagick.org), allowing us to perform complex operations right in your browser. The addition of imgly's background remover brings powerful AI-driven image processing capabilities to the toolkit.

## Shortcomings: Room for Improvement

### 1. Large File Sizes

One of the biggest challenges is the size of the Web Assembly binary files. The ImageMagick WASM file alone is of 16MB, while the FFMPEG WASM file is around 30MB. This can be problematic for users with slower internet connections, especially considering that even a simple 500KB image compression requires loading these large files.

### 2. Performance Speed

Perhaps the most significant drawback is the speed of operations, particularly for video processing. Compared to native CLI-based FFMPEG, Web Assembly version performs at only about 10% of the speed. While this is less noticeable for images and audio, it becomes apparent when dealing with video formats like MKV.

### 3. Limited Format Support

Currently, it doesn't support some popular file formats, particularly in document conversion. For instance, PDF and SVG conversions are not yet available due to dependencies on tools like Inkscape, which are challenging to implement in Web Assembly.

## The Good Parts: What I am Proud Of

### 1. Delivering on Promise

Despite the challenges, ConvertFast works as intended. It successfully performs a wide range of conversions and manipulations directly in the browser, which is sweet.

### 2. A Valuable Learning Experience

Developing ConvertFast has been an incredible learning journey. It's my first product that I truly want the world to use, and the process has taught me invaluable lessons about web technologies, performance optimization, and user experience design.

## Looking Ahead

While ConvertFast has its shortcomings, I'm optimistic about its future. Web Assembly technology is constantly improving, and I believe we'll see significant performance enhancements in the coming years. We're committed to continually improving the product, expanding format support, and optimizing performance.

As we continue to develop ConvertFast, we'd love to hear your thoughts and experiences. Your feedback is crucial in helping us make the tool even better. Let's keep pushing the boundaries of what's possible in the browser!

P.S. I'm available for hire! Check out [my resume](https://portfolio.techlism.in/resume.pdf) if you're interested in working with a passionate developer who's always eager to tackle new challenges.
