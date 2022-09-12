declare const getContents: () => Promise<{
    issues: import("@octokit/rest").Octokit.IssuesListCommentsResponse;
}>;
export default getContents;
