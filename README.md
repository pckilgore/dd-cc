# Coding Challenge

Name: Patrick Kilgore

Deployed at: https://divvydose-coding-challenge.vercel.app/ 

## Brief Overview

A custom hook in `model.ts`: 
 - wraps Octokit for real types,
 - eagerly fetches data on load,
 - wraps a FSM allowing declarative render states in the display logic, and
 - exports a refetch function. 

Filtering is done client side, against my better judgment, but I did not see an 
available way to have the backend do it for me when I read the docs. I didn't
dig; and at work I'd probably just ask someone who handles it to be sure.

There's a user-driven test suite because I'm a Dodds testing philosophy junky.

The rest should be idiomatic react + tailwind since I can see those classes on
the back of my eyelids at this point.

Let's chat about the rest!
