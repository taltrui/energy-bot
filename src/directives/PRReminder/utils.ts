import moment from 'moment';
import { getSlackId } from '../../utils/slack';
import { APPROVED, READY_FOR_RELEASE, CHANGES_REQUESTED } from '../../constants/github';
import { getEmployees } from '../../models/config';
import { User, PullRequest } from 'github';
import { Employee } from 'general';

const getAssigneesToTag = (author: User, reviewers: Array<User>, assignees: Array<User>) => {
  if (!reviewers) return assignees;

  const asignedReviewers = reviewers.filter(reviewer => assignees.includes(reviewer));

  if (asignedReviewers.length >= 1) return asignedReviewers;

  if (asignedReviewers.length === 0) return [author];

  return assignees;
};

const prTextFormatter = (employees: Array<Employee>) => (pr: PullRequest) => {
  const today = moment();

  const timeInDays = today.diff(moment(pr.createdAt), 'days');
  const timeInHours = today.diff(moment(pr.createdAt), 'hours');

  const assignees: Array<User> = getAssigneesToTag(pr.author, pr.reviewers, pr.assignees);

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

  const getAssigneesName = () => {
    const names = assignees.map(assignee => {
      const name = getSlackId(employees, assignee.name);
      return name ? `*${name}*` : undefined;
    });

    const joinedNames = names.join(', ')

    if (names.length < 1 || joinedNames === '') return '_No hay asignados_';
    return joinedNames;
  };

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `• *${pr.repo}* [${pr.number}] | <${pr.link}|*${
        pr.title
      }*>\n _Asignados_: ${getAssigneesName()}\n _Abierto hace_: ${openSince}\n *Estado*: ${
        pr.state === CHANGES_REQUESTED ? 'Se requieren cambios!' : 'Se requiere revisión!'
      }`
    }
  };
};

const approvedPrTextFormatter = (pr: PullRequest) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `• *${pr.repo}* [${pr.number}] | <${pr.link}|*${pr.title}*>`
  }
});

export const createMessage = async (prs: Array<PullRequest>) => {
  const today = moment();

  const employees = await getEmployees();

  const olderPrs = prs.filter(
    pr =>
      today.diff(moment(pr.updatedAt), 'days') > 1 && pr.state !== APPROVED && !pr.labels.includes(READY_FOR_RELEASE)
  );

  const newerPrs = prs.filter(
    pr =>
      today.diff(moment(pr.updatedAt), 'days', true) < 1 &&
      pr.state !== APPROVED &&
      !pr.labels.includes(READY_FOR_RELEASE)
  );

  const approvedPRs = prs.filter(pr => pr.state === APPROVED || pr.labels.includes(READY_FOR_RELEASE));

  const formattedOlderPrs = olderPrs.map(prTextFormatter(employees));
  const formattedNewerPrs = newerPrs.map(prTextFormatter(employees));
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
