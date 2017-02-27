---
layout:       post
title:        "Reddit Comment Analysis"
post_title:	  "Graph Theory & Reddit Comments"
date:         2017-02-21 00:00:01 +0200
menu:		  main
author:       "Victor"
categories:   data_sciences
tags:         coding interview divisible subset solution
excerpt:      Coding interview problem, non-divisible subset detailed solution
update:       no

# POSTS LIST
class:       "data_sciences"                         # config bg-color to post list card (1..6)
thumbnail-image:  "/assets/images/reddit_thumbnail.jpg"       # config image to post list card (1..6)

description: >                                # config description to post list card
  Given a set of integers and another integer k, calculate the size of the largest non-divisible subset.

# POST HEADER
header-image: "/assets/images/reddit_banner.jpg"      # config image to post header
alt-image:    "image description test post d" # config image description to alt att.
---
<h4>Problem Description</h4>

<p>The problem was published on Hackerrank, you can find it <a href="https://www.hackerrank.com/challenges/non-divisible-subset">here</a>.</p>
<p>You are given a set of integers <code>S</code> and an integer <code>k</code>. The goal of this problem is to return the size of the biggest subset you can build such as the sum of any two numbers of <code>S</code> is non-divisible by <code>k</code>.</p>

<h4>Example</h4>

``` python
k = 3
S = {1 7 2 4}
```
<p>The biggest subset you can build here is <code>S' = {1 7 4}</code>. The sum of any two numbers of <code>S'</code> is non-divisible by 3 and adding 2 would make that statement false. Indeed:</p>
``` python
1 + 2 = 3 = 3 * 1
4 + 2 = 6 = 3 * 2
7 + 2 = 9 = 3 * 3
```

<h4>Problem Solution</h4>
<p>It took me some time to understand how to solve the example above without testing all the subset possibilities. While I was testing, I had this idea : <b>since we want to divide the sum of two numbers by k, then we can work with division remainders</b>. Here is the quick math behind the idea :</p> 
<p><center><code>(a+b)%k == 0</code> if and only if <code>(a%k + b%k)%k == 0</code> </center></p>
<p><center>This means <code>a and b can coexist in a non-divisable subset</code> if and only if <br/><code>a%k and b%k can coexist in a non-divisable subset</code> </center></p>

<p>Given this statement, the example above is much easier to understand : converting <code>x</code> to <code>x%k</code> for every x in the initial set gives <code>1 7 2 4 => 1 1 2 1</code>. All the ones can coexist in the same subset since <code>(1 + 1) % 3 != 0</code>, and we can't add the two since it will make a three when combining with any one.</p>

<p>Now let's build our algorithm. First we will perform our euclidean division on each number of the set and store the remainder into a list. How will we build our subset from here? The idea is to see which numbers cannot coexist. Two remainders <code>r<sub>i</sub></code> and <code>r<sub>j</sub></code> can coexist if and only if <code>r<sub>i</sub> + r<sub>j</sub> != k</code> (this statement is based on the bit of math we did before). <b>In the case where two remainders can't coexist, which one do we keep?</b> We should keep the one that is the most represented, since we want to build the biggest subset. Example above with remainders <code>1 1 2 1</code>: ones and twos can't coexist, but we keep ones because there are more ones than twos. We can store the the occurences count in a dictionary, a very handy tool here.</p>

<p>Once we have that dictionary, let's see how we compute the biggest subset size. Here is what the dictionary looks like at each step:</p>

```
Initial list :  [1, 3, 5, 6, 7, 8, 10, 12, 15, 26, 74, 55, 235, 467]
k value :  4
With remainders :  [1, 3, 1, 2, 3, 0, 2, 0, 3, 2, 2, 3, 3, 3]
Dictionary step by step:
1 {1: 1}
3 {1: 1, 3: 1}
1 {1: 2, 3: 1}
2 {1: 2, 2: 1, 3: 1}
3 {1: 2, 2: 1, 3: 2}
0 {0: 1, 1: 2, 2: 1, 3: 2}
2 {0: 1, 1: 2, 2: 2, 3: 2}
0 {0: 2, 1: 2, 2: 2, 3: 2}
3 {0: 2, 1: 2, 2: 2, 3: 3}
2 {0: 2, 1: 2, 2: 3, 3: 3}
2 {0: 2, 1: 2, 2: 4, 3: 3}
3 {0: 2, 1: 2, 2: 4, 3: 4}
3 {0: 2, 1: 2, 2: 4, 3: 5}
3 {0: 2, 1: 2, 2: 4, 3: 6}
Biggest subset size: 8
``` 

<p>Looping through the remainders, here is how we find the best subset :</p>
<ul>
    <li> For the numbers where <b>remainders = 0</b>, we can only keep one of them because 0 is the only remainder that can't coexist with zero. Indeed, if we have 0 twice in the final subset, then we can just sum them and get a number divisible by k.</li>
    <li> <b>Remainder = 1</b>. These numbers can't coexist with those where remainder = 3, because 3 + 1 = 4 = k. But there are more threes so let's keep the threes.</li>
    <li> <b>Remainder = 2</b>. They can't coexits with themselves (2 + 2 = 4 = k), so we'll keep only one of them. It is the same logic as in remainder equal to 0.</li>
    <li> <b>Remainder = 2</b>. They can't coexist with numbers where remainder = 1, but there are more threes than ones so we'll keep them!</li>
</ul>

<p>In the end, we have 1 zero, 1 two, and 6 threes. That's 8 elements for the biggest subset, which can be {3, 6, 7, 8, 15, 55, 235, 467} or {3, 6, 7, 12, 15, 55, 235, 467} or {3, 7, 12, 15, 26, 55, 235, 467} depending on the number we choose for remainders zero and two. The code below shows the algorithm implemented. It passes all test cases on Hackerrank. We iterate once over the initial list and once over the dictionary keys so <b>the complexity is O(N)</b>, awesome!</p>

``` python
def biggest_subset(list_init, k, n):
    nb_dict = dict()

    for nb in list_init:
            if nb in nb_dict:
                nb_dict[nb] += 1
            else:
                nb_dict[nb] = 1    
                
    count = n
    count_equal = 0

    for nb in nb_dict.keys():
        if k-nb == nb or nb==0:
            count -= nb_dict[nb] - 1
        elif (k-nb) in nb_dict and nb_dict[k-nb] > nb_dict[nb]:
            count -= nb_dict[nb]
        elif (k-nb) in nb_dict and nb_dict[k-nb] == nb_dict[nb]:
            count_equal += nb_dict[k-nb]
        
    return int(count - count_equal//2)

n_test, k_test = map(int, input().strip().split(' '))
list_nb = [int(x)%k_test for x in input().strip().split(' ')]

print(biggest_subset(list_nb, k_test, n_test))
```

<p><i>I added a case in the loop over the dictionary, when two remainders that can't coexist have the same occurences. Here, we can select whichever we want for the final set but we know that half of the numbers will be removed. That's the <code>count_equal//2</code> that you'll see below.</i></p>


``` python
print(biggest_subset([1, 3, 5, 6, 7, 8, 10, 12, 15, 26, 74, 55, 235, 467], 4, 14))
8
```

