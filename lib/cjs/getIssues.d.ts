export interface Issue {
    number: number;
    title: string;
    labels: string[];
    body: string;
    html_url: string;
}
declare const getIssues: () => Promise<import("@octokit/rest").Octokit.IssuesListCommentsResponse>;
export default getIssues;
