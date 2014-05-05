# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="tomorrow-night"

# red dots to be displayed while waiting for completion
COMPLETION_WAITING_DOTS="true"

plugins=(git rails ruby brew bundler heroku rake rvm osx rand-quote zsh-syntax-highlighting)

# User configuration
source ~/.aliases

export PATH="/Users/tanner/.rvm/gems/ruby-2.1.0/bin:/usr/local/bin:/bin:/usr/local/bin:/usr/sbin:/sbin:/usr/local/Cellar/ruby/2.1.0/bin:/Users/tanner/bin:/usr/bin:/Applications/Postgres93.app/Contents/MacOS/bin:/.rvm/bin:$PATH"

export EDITOR="vim"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

source ~/.zsh-history-substring-search/zsh-history-substring-search.zsh

source $ZSH/oh-my-zsh.sh

PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
