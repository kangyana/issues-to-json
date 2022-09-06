import { LABELS } from './constant';
import getContents from './getContents';

export interface Issue {
  id: number;
  title: string;
  labels: string[];
  body: string;
  html_url: string;
}

const getIssues = async () => {
  const contents = await getContents();

  console.log('Contents has been retrieved.');

  const result = contents.issues
    .map((item) => {
      const { id, title, labels, body, html_url } = item;
      const labelNames = labels.map((v) => v.name);
      return {
        id,
        title,
        labels: labelNames,
        body,
        html_url,
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
