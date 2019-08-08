import config from './config';

const getPrsFromData = data => data.data.user.repositories.edges;

const filterReposByNameAndPrs = repos =>
  repos.filter(
    repo =>
      config.repositories.includes(repo.node.name) &&
      repo.node.pullRequests.edges.length > 0
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

const formatPrs = prs =>
  prs.map(pr => ({
    createdAt: pr.node.createdAt,
    name: pr.node.headRefName,
    author: pr.node.author.login,
    title: pr.node.title,
    assignees: formatAsignees(pr.node.assignees),
    link: pr.node.permalink,
    repo: pr.node.repository.name
  }));

const formatAsignees = assignees =>
  assignees.edges.length > 0
    ? assignees.edges
        .map(assignee => ({
          name: assignee.node.name
        }))
        .filter(item => item.name)
    : [];

const getLabel = pr =>
  pr.node.labels.edges[0] && pr.node.labels.edges[0].node.name;

export const formatPRData = data =>
  getPrs(filterReposByNameAndPrs(getPrsFromData(data)));
