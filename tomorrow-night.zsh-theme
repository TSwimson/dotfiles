# #RVM settings
 if [[ -s ~/.rvm/scripts/rvm ]] ; then 
   #RPS1="%{$fg[yellow]%}rvm:%{$reset_color%}%{$fg[red]%}\$(~/.rvm/bin/rvm-prompt)%{$reset_color%} $EPS1"
 fi

#RPS1="%{$fg[yellow]%}rb:%{$reset_color%}%{$fg[red]%}\$(rbenv version-name)%{$reset_color%} $EPS1"

ZSH_THEME_GIT_PROMPT_PREFIX="%{$reset_color%}%{$fg[green]%}["
ZSH_THEME_GIT_PROMPT_SUFFIX="]%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[red]%}*%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN=""

#Customized git status, oh-my-zsh currently does not allow render dirty status before branch
git_custom_status() {
  local cb=$(current_branch)
  if [ -n "$cb" ]; then
    echo "$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_PREFIX$(current_branch)$ZSH_THEME_GIT_PROMPT_SUFFIX"
  fi
}

THUNDER=$'\e[31;1m⚡\e[0m'
PROMPT='$(git_custom_status)%{$FG[166]%}[%1~% ]%{$reset_color%}→ '
#PROMPT='%1~'
