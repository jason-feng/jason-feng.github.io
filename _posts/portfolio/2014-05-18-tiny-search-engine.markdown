---
title: Tiny Search Engine
subtitle: CS50
type: CLI Application
layout: project
date: 2014-05-18
img: tiny-search-engine/tiny-search-engine.png
thumbnail: tiny-search-engine/thumbnail.png
alt: image-alt
project-date: May 2014
class: CS50 Software Design and Implementation
category: portfolio
source: https://github.com/jason-feng/Tiny-Search-Engine
link: http://cs.dartmouth.edu/~ccpalmer/classes/cs50/Content/Assignments/Lab6-QueryEngine.html
---
A search engine built in C to search through archived pages of Dartmouth’s CS website. The program is split into a web crawler, an indexer, and a query engine. This search engine is designed to crawl an archived version of Dartmouth's CS webiste. After crawling the website, each page will be indexed and the user will have the ability to do searches for words via a command line interface.

The crawler is a standalone program that crawls the web and retrieves webpages starting from a seed URL. It parses an initial "seed" webpage, extracts any embedded URLs from the page, then retrieves each of those pages, extracts the embedded URLs from those pages, and so on. Once the crawler has completed a specified depth of webpages (specified by a depth parameter on the crawler command line), the crawler process will free up any resources it used and exit.

The indexer sub-system uses the files created by crawler to generate an inverted index file (called index.dat) containing the occurrences of words found in the files. The goal of the indexer is to create an index containing a list of the webpages where a certain word (e.g., fishing) appears including the frequency of the word found in webpages. The identifiers represent the names of the files (i.e., the progressive integer numbers used to name the files saved by the crawler).

This assignment reuses the readFile(index) function from indexer. The query engine must build the index from a file, accept queries from the user, search the index for matches for the key words in the query, rank the results, and display the results to the user. It should continue to handle new queries until it receives an EOF on the input.

Below is some sample input and output:

<pre><code>
QUERY:>computer security privacy

Document ID:227 URL:http://www.cs.dartmouth.edu/~dfk/papers/index.html#mhealth
Document ID:319 URL:http://www.cs.dartmouth.edu/~dfk/papers/index.html
Document ID:631 URL:http://www.cs.dartmouth.edu/%7Edfk/papers/index.html
Document ID:477 URL:http://www.cs.dartmouth.edu/seminar.php
Document ID:19 URL:http://www.cs.dartmouth.edu/site-content/site/a-major-redesign.php
Document ID:150 URL:http://www.cs.dartmouth.edu/%7Epkilab/research
Document ID:90 URL:http://www.cs.dartmouth.edu/site-content/news/index.php?&mID=9&eLP=0&sort=dtPublish&sortDirection=desc&showAll=1
Document ID:184 URL:http://www.cs.dartmouth.edu/people.php
Document ID:1125 URL:http://www.cs.dartmouth.edu/news.php
Document ID:1128 URL:http://www.cs.dartmouth.edu/ug_courses.php
Document ID:16 URL:http://www.cs.dartmouth.edu/site-content/site/colloquium.php
Document ID:93 URL:http://www.cs.dartmouth.edu/~csrs/schedule.html
Document ID:100 URL:http://www.cs.dartmouth.edu/~csrs/schedule.html#keynote
Document ID:569 URL:http://www.cs.dartmouth.edu/%7Ecsrs/schedule.html
Document ID:575 URL:http://www.cs.dartmouth.edu/%7Ecsrs/schedule.html#keynote
Document ID:610 URL:http://www.cs.dartmouth.edu/~sws/research
Document ID:65 URL:http://www.cs.dartmouth.edu/~sorber
Document ID:183 URL:http://www.cs.dartmouth.edu/research.php
Document ID:22 URL:http://www.cs.dartmouth.edu/site-content/undergrad-courses/index.php
Document ID:233 URL:http://www.cs.dartmouth.edu/site-content/connector/undergraduate-courses.php
Document ID:56 URL:http://www.cs.dartmouth.edu/~sergey
Document ID:225 URL:http://www.cs.dartmouth.edu/~dfk/people.html
Document ID:355 URL:http://www.cs.dartmouth.edu/~sws/advising
Document ID:607 URL:http://www.cs.dartmouth.edu/%7Esws/advising
Document ID:632 URL:http://www.cs.dartmouth.edu/%7Edfk/people.html
Document ID:118 URL:http://www.cs.dartmouth.edu/site-content/research-projects/index.php?&mID=41&eLP=0&sort=dtMod&sortDirection=desc&showAll=1
Document ID:427 URL:http://www.cs.dartmouth.edu/reports/abstracts/TR2011-702
Document ID:1140 URL:http://www.cs.dartmouth.edu/~pala
Document ID:1146 URL:http://www.cs.dartmouth.edu/~keren
Document ID:15 URL:http://www.cs.dartmouth.edu/site-content/research-projects/index.php
Document ID:32 URL:http://www.cs.dartmouth.edu/~dfk/postdoc.html
Document ID:226 URL:http://www.cs.dartmouth.edu/site-content/research-projects/index.php?&mID=41&eLP=0&sort=dtMod&sortDirection=desc&offset=0
Document ID:415 URL:http://www.cs.dartmouth.edu/~tristan
Document ID:433 URL:http://www.cs.dartmouth.edu/reports/abstracts/TR2009-652
Document ID:634 URL:http://www.cs.dartmouth.edu/%7Edfk/postdoc.html
Document ID:1141 URL:http://www.cs.dartmouth.edu/~mhshin
Document ID:6 URL:http://www.cs.dartmouth.edu/site-content/tenure-track-faculty/index.php
Document ID:81 URL:http://www.cs.dartmouth.edu/~pete
Document ID:206 URL:http://www.cs.dartmouth.edu/~sws/cs169
Document ID:606 URL:http://www.cs.dartmouth.edu/%7Esws/cs169
Document ID:7 URL:http://www.cs.dartmouth.edu/site-content/faculty-other/index.php
Document ID:365 URL:http://www.cs.dartmouth.edu/~tanzeem/pubs/pubs.html
Document ID:1092 URL:http://www.cs.dartmouth.edu/site-content/reports/TR2008-615
Document ID:468 URL:http://www.cs.dartmouth.edu/reports/abstracts/TR2007-586
Document ID:675 URL:http://www.cs.dartmouth.edu/site-content/reports/authors/Matt-Bishop.php
Document ID:847 URL:http://www.cs.dartmouth.edu/site-content/reports/authors/David-Kotz.php
Document ID:1089 URL:http://www.cs.dartmouth.edu/site-content/reports/TR2008-635
Document ID:286 URL:http://www.cs.dartmouth.edu/~ashubina
Document ID:414 URL:http://www.cs.dartmouth.edu/~dist
Document ID:10 URL:http://www.cs.dartmouth.edu/site-content/postdoctoral-researchers/index.php
Document ID:278 URL:http://www.cs.dartmouth.edu/~ac/Teach/CS33-Spring11
Document ID:354 URL:http://www.cs.dartmouth.edu/~sws/teaching
Document ID:592 URL:http://www.cs.dartmouth.edu/%7Eac/Teach/CS33-Spring11
Document ID:605 URL:http://www.cs.dartmouth.edu/%7Esws/teaching
Document ID:815 URL:http://www.cs.dartmouth.edu/site-content/reports/authors/Shan-Jiang.php
Document ID:70 URL:http://www.cs.dartmouth.edu/~dxoigmn

QUERY:>dog

Document ID:377 URL:http://www.cs.dartmouth.edu/~doug/crypt.html
Document ID:409 URL:http://www.cs.dartmouth.edu/~wbc/instmnts/index.html
Document ID:423 URL:http://www.cs.dartmouth.edu/~tim/disclaimer.html
Document ID:1241 URL:http://www.cs.dartmouth.edu/~cs110/writing-test.html

QUERY:>cat

Document ID:361 URL:http://www.cs.dartmouth.edu/~sergey/cs108/2009
Document ID:84 URL:http://www.cs.dartmouth.edu/~rhl
Document ID:242 URL:http://www.cs.dartmouth.edu/~cbk/cbk.php
Document ID:339 URL:http://www.cs.dartmouth.edu/~rockmore/Publications.html
Document ID:423 URL:http://www.cs.dartmouth.edu/~tim/disclaimer.html

QUERY:>beeblebrox

No results found.

QUERY:>dog or cat

Document ID:423 URL:http://www.cs.dartmouth.edu/~tim/disclaimer.html

QUERY:>dog OR cat

Document ID:361 URL:http://www.cs.dartmouth.edu/~sergey/cs108/2009
Document ID:423 URL:http://www.cs.dartmouth.edu/~tim/disclaimer.html
Document ID:84 URL:http://www.cs.dartmouth.edu/~rhl
Document ID:242 URL:http://www.cs.dartmouth.edu/~cbk/cbk.php
Document ID:339 URL:http://www.cs.dartmouth.edu/~rockmore/Publications.html
Document ID:377 URL:http://www.cs.dartmouth.edu/~doug/crypt.html
Document ID:409 URL:http://www.cs.dartmouth.edu/~wbc/instmnts/index.html
Document ID:1241 URL:http://www.cs.dartmouth.edu/~cs110/writing-test.html

QUERY:>andrew campbell dartmouth college PhD students

Document ID:90 URL:http://www.cs.dartmouth.edu/site-content/news/index.php?&mID=9&eLP=0&sort=dtPublish&sortDirection=desc&showAll=1
Document ID:477 URL:http://www.cs.dartmouth.edu/seminar.php
Document ID:1125 URL:http://www.cs.dartmouth.edu/news.php

QUERY:>andrew campbell dartmouth college PhD students seminar

Document ID:477 URL:http://www.cs.dartmouth.edu/seminar.php

QUERY:>^Z
</code></pre>
