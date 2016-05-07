# Cheesecloth
[![Build Status](https://travis-ci.org/cheddar-lang/Cheesecloth.svg?branch=master)](https://travis-ci.org/cheddar-lang/Cheesecloth)

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

## Building

To build Cheesecloth simply run `grunt`. You may optionally pass a `--memeify` flag to build cheddar with some memes/eastereggs. 

Then, install and initalize all the requisite files and directories using `grunt install`

## Running

To run `cpm` simply run `./dist/bin/cpm`. If you need help, run `./dist/bin/cpm help`. If you don't want to type `./dist/bin/cpm` navigate to your `.bash_profile` or `.bashrc` and add:

```bash
alias sudo='sudo '
alias cpm='/path/to/dist/bin/cpm'
```

---

The first time you run the `cpm install` command, run it with `sudo` so all the initalization files and directories can be made.

## Auto-Install Script

Just paste this in your console:

```bash
git clone https://github.com/cheddar-lang/Cheesecloth.git && cd Cheesecloth && npm install && grunt install && echo -e "alias sudo='sudo '\nalias cpm='`pwd`/dist/bin/cpm'" >> $([[ -f ~/.bash_profile ]] && echo ~/.bash_profile || echo ~/.bashrc)"
```
