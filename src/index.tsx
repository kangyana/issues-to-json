import * as core from '@actions/core';
import { writeFile } from 'fs';
import getIssues from './getIssues';

async function run(): Promise<void> {
  try {
    console.log('Initializing.');

    const issueList = await getIssues();

    writeFile('./data/issues.json', JSON.stringify(issueList), () =>
      console.log('New file has been written.'),
    );
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
