const github = require('@actions/github');
const core = require('@actions/core');
const { contributors, sponsors } = require('./contributors');

async function run() {
  try {
    const title = github.context.payload.pull_request.title;
    const labels = ['answer'];

    const match = title.match(/Answer(:?)\s*(\d+)/);
    if (match) {
      labels.push(String(parseInt(match[2], 10)));
    }

    const actor = github.context.actor;
    if (contributors.includes(actor)) {
      labels.push('contributor');
      labels.push('to be reviewed');
    }

    if (sponsors.includes(actor)) {
      labels.push('sponsor');
      labels.push('to be reviewed');
    }

    const githubToken = core.getInput('github_token');

    const number = github.context.payload.pull_request.number;

    const octokit = github.getOctokit(githubToken);
    await octokit.rest.issues.addLabels({
      labels,
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: number,
    });
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

run();
