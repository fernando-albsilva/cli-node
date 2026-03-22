import { REPO_AMBIENTE_DESENVOLVIMENTO } from "../configs/repositories.config.js";

export const UPDATE_BRANCH_MASTER: string[] = [
    'git stash push -m "cli-bot_{clibot-date}"',
    "git checkout master",
    "git show-branch",
    "git fetch --all",
    "git pull",
];

export const UPDATE_BRANCH_DEVELOPMENT: string[] = [
    'git stash push -m "cli-bot_{clibot-date}"',
    "git checkout development",
    "git show-branch",
    "git fetch --all",
    "git pull",
];

export const UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_MASTER: string[] = [
    `cd ${REPO_AMBIENTE_DESENVOLVIMENTO}`,
    ...UPDATE_BRANCH_MASTER,
];

export const UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_DEVELOPMENT: string[] = [
    `cd ${REPO_AMBIENTE_DESENVOLVIMENTO}`,
    ...UPDATE_BRANCH_DEVELOPMENT,
];

export const ACCEPTED_ERROS_GIT = ["Already on 'master'"];
