export interface Issue {
    number: number;
    title: string;
    labels: string[];
    body: string;
    url: string;
}
declare const getIssues: () => Promise<Record<string, Issue[]>>;
export default getIssues;
