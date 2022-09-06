import type { Octokit } from '@octokit/rest';
declare const getIssues: () => Promise<Octokit.IssuesListForRepoResponseItem[] | undefined>;
export default getIssues;
