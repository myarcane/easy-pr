# easy-pr
### A node JS CLI script to ease pull request creation

The script will create **a nice PR template with a random gif**.

## Template style

### PR title

#### Description
[Optional]

Brief description of the purpose of the ticket or of the changes introduced in the PR.

#### TODO
[Optional]

- [ ] Example TODO

![giphy](https://media.giphy.com/media/3oEduTtmloCo39hzIA/giphy.gif)

## Features
- [x] Add a random gif based on the command tag
- [ ] Creates automatically the appropriate github tags
- [ ] Smart reviewer assigning

## Installation
### hub
Fisrt you need to install [hub](https://github.com/github/hub) : A command line tool that wraps git.

#### Homebrew

`hub` can be installed through [Homebrew](https://docs.brew.sh/Installation) on macOS:

``` sh
$ brew install hub
$ hub version
git version 1.7.6
hub version 2.2.3
```

#### Windows

`hub` can be installed through [Scoop](http://scoop.sh/) on Windows:

``` sh
> scoop install hub
```

For further installation details check [hub](https://github.com/github/hub).

### Environement variables

#### Giphy token
`easy-pr` requires a giphy api token to be able to fetch a giphy url based on the tag input. You can easily generate an api token on the [giphy dev portal](https://developers.giphy.com) and you must add it as an environement variable.

``` sh
> export GIPHY_API_KEY="MYGIPHYAPIKEY"
```

#### Github token
`easy-pr` needs to use an api github token. You need to generate a github token on your github account with the scope `repo` and add it as an environement variable. Of course this token should always remain private and never been shared.

``` sh
> export GITHUB_TOKEN="MYGITHUBTOKEN"
```

### npm link
To be able to use it as a local npm package. Clone locally `easy-pr` repository and run `npm link` on it. Done for the setup !

## Usage
To open a PR
``` sh
> easy-pr <yourtag>
```

It will open a PR with a random gif based on the tag input
