declare const getContents: () => Promise<{
    issues: import("@octokit/rest").Octokit.IssuesListForRepoResponse;
}>;
export default getContents;
