import config from './config';
import { REVIEW_PENDING, APPROVED, CHANGES_REQUESTED } from '../constants/github';

const getPrsFromData = data => data.data.user.repositories.edges;

const filterReposByNameAndPrs = repos =>
  repos.filter(
    repo => config.repositories.includes(repo.node.name) && repo.node.pullRequests.edges.length > 0
  );

const getPrs = repos =>
  Array.prototype.concat.apply(
    [],
    repos.map(repo => formatPrs(filterPrs(repo.node.pullRequests.edges)))
  );

const filterPrs = prs =>
  prs.filter(pr => {
    const label = getLabel(pr);
    if (!label) return true;
    return !config.labelsToAvoid.includes(label);
  });

const getPRState = reviews => {
  const edges = reviews.edges;

  if (edges.length < 0) return REVIEW_PENDING;

  const formattedReviews = edges.map(review => ({
    reviewer: review.node.author.login,
    state: review.node.state
  }));

  const approved = formattedReviews.filter(review => review.state === APPROVED);

  if (approved.length >= 2) return { state: APPROVED };

  const changesRequested = formattedReviews.find(review => review.state === CHANGES_REQUESTED);

  if (changesRequested) {
    const reviewers = edges.map(review => review.reviewer);

    return { reviewers, state: CHANGES_REQUESTED };
  }

  return { state: REVIEW_PENDING };
};

const formatPrs = prs =>
  prs.map(pr => {
    const { state, reviewers } = getPRState(pr.node.reviews);
    return {
      createdAt: pr.node.createdAt,
      name: pr.node.headRefName,
      author: pr.node.author.login,
      title: pr.node.title,
      assignees: formatAsignees(pr.node.assignees),
      state,
      reviewers,
      label: getLabel(pr),
      link: pr.node.permalink,
      repo: pr.node.repository.name,
      number: pr.node.number,
      updatedAt: pr.node.updatedAt
    };
  });

const formatAsignees = assignees =>
  assignees.edges.length > 0
    ? assignees.edges
        .map(assignee => ({
          name: assignee.node.name
        }))
        .filter(item => item.name)
    : [];

const getLabel = pr => pr.node.labels.edges[0] && pr.node.labels.edges[0].node.name;

export const formatPRData = data => getPrs(filterReposByNameAndPrs(getPrsFromData(data)));
