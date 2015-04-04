---
title: Psych On Ice
subtitle: DALI Lab Fall 2015
type: Weh Application
layout: project
date: 2014-09-29
img: psych-on-ice/video.png
thumbnail: psych-on-ice/introduction.png
alt: image-alt
project-date: September 2014
client: National Space Biomedical Research Institute
link: http://virtual-space-station.herokuapp.com/
category: portfolio
---
Long duration spaceflight can challenge any individual’s psychological well-being. Factors such as confinement, Sleep loss, and monotony can combine to worsen interpersonal tensions or even lead to frank depression. Conflicts can arise with ground control with a resulting loss of trust and teamwork. A chronic dispute between or among crew members can destroy team functioning and lead to errors or lack of situational awareness. Computer-based behavioral health countermeasures, such as the VSS, can provide an autonomous and confidential way for astronauts to address psychological and interpersonal issues.

The project is led by a group of Dartmouth behavioral and medical health scientists and doctors along with a NASA team to develop "Autonomous Behavioral Health Countermeasures for Spaceflight". The goal is to modify and customize for astronaut use a clinically validated suite of web based products taht will determine the need for, and autonomously administer, behavioral health countermeasures. In particular these modules should facilitate conflict resolution and promote psychosocial well-being. Additionally, the programs should “determine the need for the countermeasures…facilitate conflict resolution, and promote psychological well-being.”

The project is split into four main partitions, a conflict management piece, a stress-management piece, a depression treatment section, and a virtual reality component. The part I personally worked on was the conflict management portion.

The conflict management module is essentially a series of video clips that stimulate a potential conflict scenario. At the end of each of the these clips, the user has a change to choose an answer that would most closely match what they would do in that situation. Data regarding the answers users choose, the amount of time spent on each question, are all logged within the database.

Some technologies that we have utilized include:

* Django Framework
* Video storage using AWS S3 buckets
* Flurry for Data Analytics
* PostgresSQL Database