import { ApiResponse } from 'apisauce';
import { Content } from 'jira';

import api from '../../config/jiraAPI';

export const addMessage = (content: Content, issueId: string): Promise<ApiResponse<unknown>> =>
  api.post(`/issue/${issueId}/comment`, {
    body: {
      type: 'doc',
      version: 1,
      content,
    },
  });

export const transitionIssue = (transitionId: string, issueId: string): Promise<ApiResponse<unknown>> =>
  api.post(`/issue/${issueId}/transitions`, {
    transition: {
      id: transitionId,
    },
  });
