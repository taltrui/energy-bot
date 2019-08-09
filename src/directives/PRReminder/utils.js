import moment from 'moment';
import { getSlackId } from '../../utils/slack';

const prTextFormater = pr => {
  const today = moment();

  const timeInDays = today.diff(moment(pr.createdAt), 'days');
  const timeInHours = today.diff(moment(pr.createdAt), 'hours');

  const openSince =
    timeInDays === 1
      ? `${timeInDays} día`
      : timeInDays > 1
      ? `${timeInDays} días`
      : timeInHours === 1
      ? `${timeInHours} hora`
      : timeInHours > 1
      ? `${timeInHours} horas`
      : `${today.diff(moment(pr.createdAt), 'hours')} segundos`;

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `• *${pr.repo}* | <${pr.link}|*${
        pr.title
      }*>\n _Asignados_: ${pr.assignees
        .map(assignee => `*${getSlackId(assignee.name)}*`)
        .join(', ')}\n _Abierto hace_: ${openSince}`
    }
  };
};

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
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Estos PRs son los *más recientes* :smile:'
      }
    },
    ...formattedNewerPrs
  ];
};
