import * as core from '@actions/core';
import * as github from '@actions/github';

const getContents = async () => {
  const token = core.getInput('GITHUB_TOKEN');

  const queryArr = [
    'milestone',
    'state',
    'assignee',
    'creator',
    'mentioned',
    'labels',
    'sort',
    'direction',
    'since',
    'per_page',
    'page',
  ];
  const query: Record<string, string> = {};
  for (const key of queryArr) {
    let value = core.getInput(key);
    if (!value) continue;

    if (['per_page', 'page'].includes(key) && value) {
      value = parseInt(value, 10).toString();
    }
    query[key] = value;
  }

  const octokit = new github.GitHub(token);

  console.log('GitHub client has been initialized.');

  let repository = github.context.repo;

  const repo = core.getInput('repo');
  if (repo) {
    const parts = repo.split('/');
    if (parts.length === 2) {
      repository = {
        owner: parts[0],
        repo: parts[1],
      };
    }
  }

  const list = await octokit.issues.listForRepo({
    ...repository,
    ...query,
  });

  return {
    issues: list.data,
  };
};

export default getContents;
