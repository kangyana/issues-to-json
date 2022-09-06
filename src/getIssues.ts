import * as core from '@actions/core';
import type { Octokit } from '@octokit/rest';
import getContents from './getContents';

const getIssues = async () => {
  try {
    const contents = await getContents();

    console.log('Contents has been retrieved.');

    const issues = contents.issues as Octokit.IssuesListForRepoResponse;

    const result = issues.filter((item) => item.labels.findIndex((v) => v.name === 'question'));

    return result;
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

export default getIssues;
