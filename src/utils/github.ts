import { REVIEW_PENDING, APPROVED, CHANGES_REQUESTED } from '../constants/github';
import { RepositoriesData, Repository, Reviews, PullRequestNode, UserNode, PullRequest } from 'github';

const getPrsFromData = (data: RepositoriesData) => data.data.user.repositories.edges;

const filterReposByNameAndPrs = (repos: Array<Repository>, reposToInclude: Array<string>) =>
  repos.filter((repo) => reposToInclude.includes(repo.node.name) && repo.node.pullRequests.edges.length > 0);

const getPrs = (repos: Array<Repository>, labelsToAvoid: Array<string>) =>
  Array.prototype.concat.apply(
    [],
    repos.map((repo) => formatPrs(filterPrs(repo.node.pullRequests.edges, labelsToAvoid)))
  );

const filterPrs = (prs: Array<PullRequestNode>, labelsToAvoid: Array<string>) =>
  labelsToAvoid
    ? prs.filter((pr) => {
        const labels = getLabels(pr);
        if (labels.length === 0) return true;
        return !labelsToAvoid.some((label) => labels.includes(label));
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

  const formattedReviews = edges.map((review) => ({
    reviewer: review.node.author.login,
    state: review.node.state,
  }));

  const filteredReviews = formattedReviews.filter(
    (review) =>
      !formattedReviews.some(
        (reviewToCheck) =>
          reviewToCheck.reviewer === review.reviewer && reviewToCheck.state === reviewToCheck.state
      )
  );
  const approved = filteredReviews.filter((review) => review.state === APPROVED);

  if (approved.length >= 2) return { state: APPROVED };

  const changesRequested = filteredReviews.find((review) => review.state === CHANGES_REQUESTED);

  if (changesRequested) {
    const reviewers = filteredReviews.map((review) => review.reviewer);

    return { reviewers, state: CHANGES_REQUESTED };
  }

  return { state: REVIEW_PENDING };
};

const formatPrs = (prs: Array<PullRequestNode>) =>
  prs.map((pr) => {
    const { state, reviewers } = getPRState(pr.node.reviews);
    return {
      createdAt: pr.node.createdAt,
      name: pr.node.headRefName,
      author: pr.node.author.login,
      title: pr.node.title,
      assignees: formatAsignees(pr.node.assignees),
      state,
      reviewers,
      labels: getLabels(pr),
      link: pr.node.permalink,
      repo: pr.node.repository.name,
      number: pr.node.number,
      updatedAt: pr.node.updatedAt,
    };
  });

const formatAsignees = (assignees: { edges: Array<UserNode> }) =>
  assignees.edges.length > 0
    ? assignees.edges
        .map((assignee) => ({
          name: assignee.node.name,
        }))
        .filter((item) => item.name)
    : [];

const getLabels = (pr: PullRequestNode) => {
  const edges = pr.node.labels.edges;
  return edges.map((edge: { node: { name: string } }) => edge.node.name);
};

export const formatPRData = (
  data: RepositoriesData,
  reposToInclude: Array<string>,
  labelsToAvoid: Array<string>
): Array<PullRequest> => getPrs(filterReposByNameAndPrs(getPrsFromData(data), reposToInclude), labelsToAvoid);
