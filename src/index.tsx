import * as core from '@actions/core';
import { writeFileSync } from 'fs';
import { WRITE_FILE } from './constant';
import getIssues from './getIssues';

const main = async () => {
  try {
    console.log('Initializing.');

    const issueList = await getIssues();

    await writeFileSync(WRITE_FILE, JSON.stringify(issueList));

    console.log('New file has been written.');
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

main();
