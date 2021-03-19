import { Content } from "jira";

export const createParagraph = (text: string): Content => [
  {
    type: 'paragraph',
    content: [
      {
        text,
        type: 'text',
      },
    ],
  },
];
