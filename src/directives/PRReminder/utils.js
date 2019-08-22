import moment from 'moment';
import { getSlackId } from '../../utils/slack';
import { APPROVED, READY_FOR_RELEASE, CHANGES_REQUESTED } from '../../constants/github';

const getAssigneesToTag = (state, author, reviewers, assignees) => {
  if (!reviewers) return assignees;

  const asignedReviewers = reviewers.filter(reviewer => assignees.includes(reviewer));

  if (asignedReviewers.lenght >= 2) return asignedReviewers;

  if (asignedReviewers.lenght === 0) return [author];

  return assignees;
};

const prTextFormatter = pr => {
  const today = moment();

  const timeInDays = today.diff(moment(pr.createdAt), 'days');
  const timeInHours = today.diff(moment(pr.createdAt), 'hours');

  const assignees = getAssigneesToTag(pr.state, pr.author, pr.reviewers, pr.assignees);

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
      text: `• *${pr.repo}* [${pr.number}] | <${pr.link}|*${pr.title}*>\n _Asignados_: ${assignees
        .map(assignee => `*${getSlackId(assignee.name)}*`)
        .join(', ')}\n _Abierto hace_: ${openSince}\n *Estado*: ${
        pr.state === CHANGES_REQUESTED ? 'Se requieren cambios!' : 'Se requiere revisión!'
      }`
    }
  };
};

const approvedPrTextFormatter = pr => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `• *${pr.repo}* [${pr.number}] | <${pr.link}|*${pr.title}*>`
  }
});

export const createMessage = prs => {
  const today = moment();

  const olderPrs = prs.filter(
    pr =>
      today.diff(moment(pr.updatedAt), 'days') > 1 && pr.state !== APPROVED && pr.label !== READY_FOR_RELEASE
  );

  const newerPrs = prs.filter(
    pr =>
      today.diff(moment(pr.updatedAt), 'days', true) < 1 &&
      pr.state !== APPROVED &&
      pr.label !== READY_FOR_RELEASE
  );

  const approvedPRs = prs.filter(pr => pr.state === APPROVED || pr.label === READY_FOR_RELEASE);

  const formattedOlderPrs = olderPrs.map(prTextFormatter);
  const formattedNewerPrs = newerPrs.map(prTextFormatter);
  const formattedApprovedPRs = approvedPRs.map(approvedPrTextFormatter);
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
        text: 'Estos PRs están hace *más de 1 día* sin cambios ni revisiones! :angry:'
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
        text: 'Estos PRs son los que fueron modificados o revisados recientemente :smile:'
      }
    },
    ...formattedNewerPrs,
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Estos PRs ya están aprobados o listos para release! ✅'
      }
    },
    ...formattedApprovedPRs
  ];
};
