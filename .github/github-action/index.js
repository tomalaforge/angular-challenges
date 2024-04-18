const github = require('@actions/github');
const core = require('@actions/core');
const { contributors } = require('./contributors');

async function run() {
  try {
    const title = github.context.payload.pull_request.title;
    const labels = ['answer'];

    const match = title.match(/Answer:\s*(\d+)/);
    if (match) {
      labels.push(String(parseInt(match[1], 10)));
    }

    const actor = github.context.actor;
    if(contributors.includes(actor)) {
      labels.push('to be reviewed');
    }

    const githubToken = core.getInput('github_token');

    const [owner, repo] = core.getInput('repo').split('/');
    const number = github.context.issue.number;

    const octokit = github.getOctokit(githubToken);
    await octokit.rest.issues.addLabels({
      labels,
      owner,
      repo,
      issue_number: number
    });
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

run();
