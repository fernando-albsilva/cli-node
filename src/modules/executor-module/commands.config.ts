import { REPO_AMBIENTE_DESENVOLVIMENTO } from "./repositories.config.js";

export const UPDATE_BRANCH_MASTER: string[] = [
    "git stash push -m \"cli-bot_{clibot-date}\"",
    "git checkout master",
    "git show-branch",
    "git fetch --all",
    "git pull",
];

export const UPDATE_BRANCH_DEVELOPMENT: string[] = [
    "git stash push -m \"cli-bot_{clibot-date}\"",
    "git checkout development",
    "git show-branch",
    "git fetch --all",
    "git pull",
];

export const UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_MASTER: string[] = [
    `cd ${REPO_AMBIENTE_DESENVOLVIMENTO}`,
    ...UPDATE_BRANCH_MASTER
];

const UPDATE_REPO_AMBIENTE_DESENVOLVIMENTO_BRANCH_DEVELOPMENT: string[] = [
    `cd ${REPO_AMBIENTE_DESENVOLVIMENTO}`,
    ...UPDATE_BRANCH_DEVELOPMENT
];
