export interface Issue {
    number: number;
    title: string;
    labels: string[];
    body: string;
    html_url: string;
}
declare const getIssues: () => Promise<Record<string, Issue[]>>;
export default getIssues;
