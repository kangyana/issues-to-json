import type { Octokit } from '@octokit/rest/index';
import { LABELS } from './constant';
import getContents from './getContents';

export interface Issue {
  number: number;
  title: string;
  labels: string[];
  body: string;
  url: string;
}

const formatNodes = (nodes: Octokit.IssuesListCommentsForRepoResponse) => {
  const result = nodes.map((node) => {
    const { user, body } = node;
    const { login, html_url } = user;
    const author = { login, url: html_url };
    return { author, body };
  });
  return result;
};

const getIssues = async () => {
  const contents = await getContents();

  console.log('Contents has been retrieved.');

  const result = contents.issues
    .map((item) => {
      const { number, title, labels, body, html_url, nodes = [] } = item;
      const labelNames = labels.map((v) => v.name);
      return {
        number,
        title,
        labels: labelNames,
        body,
        url: html_url,
        comments: formatNodes(nodes),
      };
    })
    .reduce((prev, cur) => {
      const label = cur.labels.find((v) => LABELS.includes(v));
      if (!label) return prev;
      if (Object.prototype.hasOwnProperty.call(prev, label)) {
        prev[label].push(cur);
      } else {
        prev[label] = [cur];
      }
      return prev;
    }, {} as Record<string, Issue[]>);

  return result;
};

export default getIssues;
