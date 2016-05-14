# Cheesecloth

[![Build Status](https://travis-ci.org/cheddar-lang/Cheesecloth.svg?branch=master)](https://travis-ci.org/cheddar-lang/Cheesecloth)
[![Code Climate](https://codeclimate.com/github/cheddar-lang/Cheesecloth/badges/gpa.svg)](https://codeclimate.com/github/cheddar-lang/Cheesecloth)
[![Test Coverage](https://codeclimate.com/github/cheddar-lang/Cheesecloth/badges/coverage.svg)](https://codeclimate.com/github/cheddar-lang/Cheesecloth/coverage)
[![Coverage Status](https://coveralls.io/repos/github/cheddar-lang/Cheesecloth/badge.svg?branch=master)](https://coveralls.io/github/cheddar-lang/Cheesecloth?branch=master)
<img src="https://img.shields.io/david/cheddar-lang/Cheesecloth.svg">
[![Join the chat at https://gitter.im/cheddar-lang/Cheesecloth](https://badges.gitter.im/cheddar-lang/Cheesecloth.svg)](https://gitter.im/cheddar-lang/Cheesecloth?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Cheddar Package Manager. Often abbreviated as `CPM` (**C**heddar **P**ackage **M**anager).

## Installing

You can install Cheesecloth by nagivating to the directory where you'd like to install Cheesecloth. Then run `git clone https://github.com/cheddar-lang/Cheesecloth.git && cd Cheesecloth`.

```bash
$ git clone https://github.com/cheddar-lang/Cheesecloth.git && cd Cheesecloth
Cloning into 'Cheesecloth'...
remote: Counting objects: 98, done.
remote: Compressing objects: 100% (71/71), done.
remote: Total 98 (delta 33), reused 74 (delta 15), pack-reused 0
Unpacking objects: 100% (98/98), done.
Checking connectivity... done.
```

Now you should be in the Cheesecloth directory. Go ahead and install the dependencies using: `npm install` (this may take a while). This should install everything

```bash
$ npm install

> cheesecloth@0.0.1 postinstall ./Cheesecloth
> grunt

Copied 1 file

Done.
cheesecloth@0.0.1 ./Cheesecloth
```

## Building/Installing

To build and installCheesecloth simply run `grunt`. You may optionally pass a `--memeify` flag to build cheddar with some memes/eastereggs. 

## Running

To run Cheesecloth simply use the `cpm` command

## Auto-Install Script

Just paste this in your console:

```bash
git clone https://github.com/cheddar-lang/Cheesecloth.git && cd Cheesecloth && npm install && grunt install --alias
```
