import { REVIEW_PENDING, APPROVED, CHANGES_REQUESTED } from '../constants/github';
import { RepositoriesData, Repository, PullRequest, Reviews, PullRequestNode, UserNode } from 'github';

const getPrsFromData = (data: RepositoriesData) => data.user.repositories.edges;

const filterReposByNameAndPrs = (repos: Array<Repository>, reposToInclude: Array<string>) =>
  repos.filter(repo => reposToInclude.includes(repo.node.name) && repo.node.pullRequests.edges.length > 0);

const getPrs = (repos: Array<Repository>, labelsToAvoid: Array<string>) =>
  Array.prototype.concat.apply(
    [],
    repos.map(repo => formatPrs(filterPrs(repo.node.pullRequests.edges, labelsToAvoid)))
  );

const filterPrs = (prs: Array<PullRequestNode>, labelsToAvoid: Array<string>) =>
  labelsToAvoid
    ? prs.filter(pr => {
        const label = getLabel(pr);
        if (!label) return true;
        return labelsToAvoid.includes(label);
      })
    : prs;

const getPRState = (
  reviews: Reviews
): {
  reviewers?: Array<string>;
  state?: 'APPROVED' | 'CHANGES_REQUESTED' | 'REVIEW_PENDING' | 'REVIEW_PENDING';
} => {
  const { edges } = reviews;

  if (edges.length < 0) return { state: REVIEW_PENDING };

  const formattedReviews = edges.map(review => ({
    reviewer: review.node.author.login,
    state: review.node.state
  }));

  const approved = formattedReviews.filter(review => review.state === APPROVED);

  if (approved.length >= 2) return { state: APPROVED };

  const changesRequested = formattedReviews.find(review => review.state === CHANGES_REQUESTED);

  if (changesRequested) {
    const reviewers = formattedReviews.map(review => review.reviewer);

    return { reviewers, state: CHANGES_REQUESTED };
  }

  return { state: REVIEW_PENDING };
};

const formatPrs = (prs: Array<PullRequestNode>) =>
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

const formatAsignees = (assignees: { edges: Array<UserNode> }) =>
  assignees.edges.length > 0
    ? assignees.edges
        .map(assignee => ({
          name: assignee.node.name
        }))
        .filter(item => item.name)
    : [];

const getLabel = (pr: PullRequestNode) => pr.node.labels.edges[0] && pr.node.labels.edges[0].node.name;

export const formatPRData = (
  data: RepositoriesData,
  reposToInclude: Array<string>,
  labelsToAvoid: Array<string>
) => getPrs(filterReposByNameAndPrs(getPrsFromData(data), reposToInclude), labelsToAvoid);
