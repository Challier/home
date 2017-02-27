---
layout:       post
title:        "Simple Problems"
post_title:	  "Short coding questions to know by heart"
date:         2017-02-20 09:00:00 +0200
menu:		  main
author:       "Victor"
categories:   codingpro
tags:         coding interview
excerpt:      Coding interview, problems & solutions
update:		  yes

# POSTS LIST
class:       "codingpro"                         # config bg-color to post list card (1..6)
thumbnail-image:  "/assets/images/interview_thumbnail.jpg"       # config image to post list card (1..6)

description: >                                # config description to post list card
  For those who don't look good enough to get an offer right away, this article includes various easy problems. The goal is to decompose the solving steps and manipulate simple data structures. Good luck if you're interviewing soon!

# POST HEADER
header-image: "/assets/images/interview_banner.jpg"      # config image to post header
alt-image:    "image description test post d" # config image description to alt att.
---
<h2>Arrays: Left Rotation</h2>

<h4>Problem Description</h4>

<p>The problem was published on Hackerrank, you can find it <a href="https://www.hackerrank.com/challenges/ctci-array-left-rotation">here</a>.</p>
<p>You are given an array of size n and an integer k. Return the array after performing k left rotations on it.</p>

<h4>Example</h4>

``` python
5 2
1 2 3 4 5
```
<p>We have an array of size 5, and we will perform 2 left rotations on it. A left rotation is taking an element on the left of the array and appending it to the right. Here is how we reach the answer:</p>
``` python
After first rotation   : 2 3 4 5 1
After second rotation  : 3 4 5 1 2
```
<p>You can already notice at this point that after n rotations, n being the array's length, we come back to the initial array because we completed a full rotation. This intuitive remark will be applied in our code later.</p>

<h4>Problem Solution</h4>
<p>Going through several examples with ordered arrays like <code>1 2 3 4 5</code> helps to understand the logic behind the solution. We already saw that rotating an n-length array n times gives the same array. This means that if <code>k >= n</code>, then applying <code>k</code> rotations is the same as appying <code>k - n</code> rotations. Let's focus on the problem if <code>k < n</code> then.</p>
<p>When <code>k < n</code> : take a step back and look at what we are doing. You pick the first element and add it and the end of the array, which means you keep the array order. After the <code>k</code> operations, the <code>k</code> first elements of the initial array will be at the end (which is <code>array[0:k]</code>) and the <code>n-k</code> elements will be at the front (which is <code>array[k:n]</code>). Remains to deal with <code>k</code> when <code>k>n</code>. We can take <code>k_new</code> such as <code>k_new = k % n</code>. Indeed we are removing the unnecessary rotations and <code>k_new < n</code> by definition.</p>
<p>We can write down the code and see that it passes all test cases</p>


``` python
def array_left_rotation(a, n, k):
    answer =  a[k%n:n]+a[0:k%n]
    
n, k = map(int, input().strip().split(' '))
a = list(map(int, input().strip().split(' ')))

answer = array_left_rotation(a, n, k);
print(*answer, sep=' ')
```
``` python
print(array_left_rotation([1, 2, 3, 4, 5], 5, 2))
[3, 4, 5, 1, 2]
```

