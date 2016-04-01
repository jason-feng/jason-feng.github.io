---
layout: post
title:  "My Git Workflow this Summer"
date:   2015-09-01 8:12:00
categories: Coding
---

For most students, Git to them simply is a sequence of git add, git commit, and git push. Occasionally you would have to deal with merge conflicts when your two other teammates happened to be working on the same piece of code, but in reality, Git has never been taught properly at the academic level.

Once you properly understand and learn how to utilize Git, you will understand its usefulness in both small and large projects. Today I will describe three important Git concepts that I learned this summer that helped improve my Git workflow.

1. Sample Workflow

    First of all let's start off with a sample workflow. This summer at Hearsay, we used Git in a way many open source projects use it. Each engineer had their individual forks of our main repo. We created branches for various changes and use rebase to incorporate our changes. All of our code reviews were conducted through pull requests.

        # Start from your master branch
        git checkout master
        # Make sure your master branch is up-to-date with upstream
        git fetch upstream
        git rebase upstream/master

        # Checkout a new branch to work on some awesome stuff
        git checkout -b awesome_stuff

        # Write some codes

        # Stage your changes using cherry-pick if needed
        git add -p /path/to/file
        # Commit your staged changes
        git commit -m "My awesome stuff"

        # Squash and reorder commits if needed to make your feature easier to read for
        # code reviews
        git rebase -i HEAD~1

        # Push changes to your fork of upstream
        git push origin awesome_stuff
        # Create a pull request for code review to Github
        git request-pull

2. Merge vs. Rebase

    One of the first things I was told this summer was that you should never have to use merge, rebase almost always is better. Rebase either accomplishes the same thing as merge, or does what should have happened.

    First let's talk about the differences between merge and rebase. The goal of both merge and rebase is to incorporate the changes that you have made in a working branch into the master branch.

    To achieve this using merge, a common workflow would look a something like this:

        git checkout mybranch
        git merge master

    Conceptually what happens now is that a new merge commit is created. This merge commit is a new node that is created in our Git graph. All merge conflicts will have to be resolved in this merge commit. This new merge commit node connects your exisiting mybranch node to master. What is nice about merge compared to rebasing is that all of the commits that you have made in your new branch are preserved. However, the main issue with merging, and something that you will bump into with even a team of five or people, is that there are a numerous number of merge conflicts. To get anything done in even a medium sized team, you will have to use rebase.

    Instead of the above workflow, using rebase would look something like this:

        git checkout mybranch
        git rebase master

    What happens in this scenario is that instead of having to resolve all of the merge conflicts created by other project contributors, you actually rarely face any conflicts at all. By using rebase, Git attempts to move the commits in your branch to the end of master. However, instead of keeping the existing commits, rebase creates copies of your commit with new SHA codes. These commits have the same timestamps, commit messages, and contents. Because rebase only moves the commits that it sees which are different from master, you have to resolve a much smaller number of conflicts.

3. Interactive Rebasing

    Git has a great feature known as interactive rebasing to alter your commit history after you already have created the commit. While working on a branch, let's say that you want to make an update to a commit you were working on earlier. Either you forgot something, or you want to implement some feedback you got from a fellow engineer. After you make these changes, you commit those in a new commit. The above problem is something that you bump into multiple times in a branch, and pretty quick, you end up with a very messy git log that is littered with commits updating other commits in no particular logical order. This is where interactive rebasing comes in handy. Using the below command:

    `git rebase -i HEAD~5`

    Where the number after HEAD is the number of commits you want to rebase before the current HEAD pointer. You can also rebase up to a certain commit by providing the SHA such as:

    `git rebase -i 31d8zc`

    Then git will provide you with the following GUI:

    ![Rebase](/assets/img/git-blog-post/rebase.png)

    Using squash, one can squash together multiple commits that are edits of one another. This is especially useful when implementing feedback from others.

    By simply moving around the picks, you can reorder the commits as well into the most logical order.

    Finally you can even use edit for quick and small modifications of commits.

    ![Squash](/assets/img/git-blog-post/squash.png)

    Above is an example of what happens when you squash together two commits. Git will ask you to modify the new commit message. It automatically includes the messages from both commits. Simply save and quit and your commits will now be modified.

    Interactive rebasing is extremely useful for making and maintaining easy to read and logical git logs.

Hopefully you learned something new from these three key points. Even if you didn't I hope they at least reinforced some concept you had about the best way to use Git to manage your workflow.

Some tutorials I found extremely useful while studying Git can be found below:

* [A detailed description of how to use Git](https://www.atlassian.com/git/tutorials/)
* [Git Pro Book - a low level and conceptual approach to Git](https://git-scm.com/book/en/v2)
* [High level overview of Git and why it works](http://tom.preston-werner.com/2009/05/19/the-git-parable.html)
