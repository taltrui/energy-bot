import { ApiResponse } from 'apisauce';

import api from '../../config/jiraAPI';

export const addMessage = (
  content: Array<{ type: string; content: Array<{ text: string; type: string }> }>,
  issueId: string
): Promise<ApiResponse<unknown>> =>
  api.post(`/issue/${issueId}/comment`, {
    body: {
      type: 'doc',
      version: 1,
      content,
    },
  });
