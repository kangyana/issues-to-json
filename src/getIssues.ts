import { LABELS } from './constant';
import getContents from './getContents';

export interface Issue {
  number: number;
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
      const { number, title, labels, body, html_url } = item;
      const labelNames = labels.map((v) => v.name);
      return {
        number,
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
