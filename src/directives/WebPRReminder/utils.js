import moment from 'moment';

const prTextFormater = pr => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `• ${pr.repo} | <${pr.link}|*${
      pr.title
    }*>\n· _Asignados_: ${pr.assignees
      .map(assignee => assignee.name)
      .join(', ')}`
  }
});

export const createMessage = prs => {
  const today = moment();

  const olderPrs = prs.filter(
    pr => today.diff(moment(pr.createdAt), 'days') > 1
  );

  const newerPrs = prs.filter(
    pr => today.diff(moment(pr.createdAt), 'days', true) < 1
  );

  const formattedOlderPrs = olderPrs.map(prTextFormater);
  const formattedNewerPrs = newerPrs.map(prTextFormater);

  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Hola! :wave: estos son los PRs del día'
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Estos PRs están hace *más de 1 día* sin cambios :angry:'
      }
    },
    ...formattedOlderPrs,
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Estos PRs son los *más recientes* :smile:"
      }
    },
    ...formattedNewerPrs
  ];
};
