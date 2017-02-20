---
layout:       post
title:        "Cracking the Interview<br>Making Anagrams"
date:         2017-02-20 09:00:00 +0200
menu:		  main
author:       "Victor"
categories:   hackerrank
tags:         tag1 tag2

# POSTS LIST
class:       "hackerrank"                         # config bg-color to post list card (1..6)

description: >                                # config description to post list card
  How many characters do you need to remove to make two strings anagrams of each other? Solution using a dictionary.

# POST HEADER
header-image: "/assets/images/anagram_banner.jpg"      # config image to post header
alt-image:    "image description test post d" # config image description to alt att.
---
<h4>Definition</h4>

<p><b>Anagram</b> : a word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.</p>

<h4>Description of the problem</h4>

<p>The problem was taken on Hackerrank's website. Link to problem <a href="https://www.hackerrank.com/challenges/ctci-making-anagrams">here</a>.</p>
<p>Consider two strings A and B. The goal of this problem is to compute the minimum number of characters we need to remove from A and B to make them anagrams of each other.</p>

<h4>Example</h4>

A = 'helloyou', B = 'yellow'
<p>A has two 'o's when B only has one. A has an 'h' and a 'u' when B doesn't have any. We can't build B from A if we keep these characters. Using the same logic, we can't build A from B if we keep 'w'.</p>
<p>Let's remove 'h', 'u' and one 'o' from A. Let's remove 'w' from B. We get A = 'elloy' and B = 'yello'. These two are anagrams, we found the solution! In total we removed four character from A and B, so: <b>number_needed('helloyou', 'yellow') = 4</b></p>

<h4>Problem Solution</h4>
<p>The example above showed a way to solve the issue : for each string, for each character in that string, see how many occurences we have in that string and count how many we should remove to equalize the number of occurences in the other string. This solution would work, but the complexity isn't good enough. Given <b>N</b> and <b>M</b> the strings' sizes, looping twice produces a <b>0(N*M)</b> complexity.</p>
<p>We can loop over the strings only once using a dictionary, which gives us a <b>O(N+M)</b> complexity, let's see how it works:</p>
<p>Our dictionary is a counter of elements. The trick here is to loop over the two strings using only one dictionary. We want to count the differences, so we can say "if a character is available in A, add 1 to that key's value" and "if a character is available in B, substract 1 to that key's value". In the end, we have three cases:</p>
<ul>
<li>If count = 0, then we have the same occurences for that character in A and B.</li>
<li>If count is strictly positive, then the character appears more in A.</li>
<li>If count is strictly negative, then the character appears more in B.</li>
</ul>

<p>You can see below what the dictionary looks like after each step of the algorithm in the example above:</p>
``` python
Start iteration over helloyou
h : {'h': 1}
e : {'h': 1, 'e': 1}
l : {'h': 1, 'e': 1, 'l': 1}
l : {'h': 1, 'e': 1, 'l': 2}
o : {'o': 1, 'h': 1, 'e': 1, 'l': 2}
y : {'o': 1, 'h': 1, 'e': 1, 'l': 2, 'y': 1}
o : {'o': 2, 'h': 1, 'e': 1, 'l': 2, 'y': 1}
u : {'u': 1, 'l': 2, 'o': 2, 'h': 1, 'e': 1, 'y': 1}
Start iteration over yellow
y : {'u': 1, 'l': 2, 'o': 2, 'h': 1, 'e': 1, 'y': 0}
e : {'u': 1, 'l': 2, 'o': 2, 'h': 1, 'e': 0, 'y': 0}
l : {'u': 1, 'l': 1, 'o': 2, 'h': 1, 'e': 0, 'y': 0}
l : {'u': 1, 'l': 0, 'o': 2, 'h': 1, 'e': 0, 'y': 0}
o : {'u': 1, 'l': 0, 'o': 1, 'h': 1, 'e': 0, 'y': 0}
w : {'w': -1, 'u': 1, 'l': 0, 'o': 1, 'h': 1, 'e': 0, 'y': 0}
```
<p>Once we built that dictionary, the remaining task is to sum the values over the keys. Each count will show us how many times we have to substract the key from one of the lists. The code below passes all test cases on Hackerrank.</p>


``` python
def number_needed(str1, str2):
    
    dict_chars = dict()
    
    for char in str1:
        if char in dict_chars:
            dict_chars[char] += 1
        else:
            dict_chars[char] = 1
    
    for char in str2:
        if char in dict_chars:
            dict_chars[char] -= 1
        else:
            dict_chars[char] = -1
    
    sum_diff = 0
    
    for char in dict_chars.keys():
        sum_diff += abs(dict_chars[char])
        
    return sum_diff
    
a = input().strip()
b = input().strip()

print(number_needed(a, b))

```
``` python
print(number_needed('HelloYou', 'Yellow'))
4
```

