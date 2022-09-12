import type { Octokit } from '@octokit/rest/index';
interface Issue extends Octokit.IssuesListForRepoResponseItem {
    nodes?: Octokit.IssuesListCommentsForRepoResponse;
}
declare const getContents: () => Promise<{
    issues: Issue[];
}>;
export default getContents;
