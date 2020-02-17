export type User = {
  name: string;
  login: string;
};

export type UserNode = {
  node: {
    name: string;
    login: string;
  };
};

export type PullRequest = {
  createdAt: string;
  name: string;
  author: User;
  title: string;
  assignees: Array<User>;
  state: string;
  reviewers: Array<User>;
  label: string;
  link: string;
  repo: string;
  number: number;
  updatedAt: string;
};

export type PullRequestNode = {
  node: {
    createdAt: string;
    headRefName: string;
    author: User;
    title: string;
    assignees: { edges: Array<UserNode> };
    state: string;
    reviews: Reviews;
    labels: { edges: any };
    link: string;
    repository: RepositoryNode;
    permalink: string;
    number: number;
    updatedAt: string;
  };
};

export type Repository = {
  node: {
    name: string;
    pullRequests: {
      edges: Array<PullRequestNode>;
    };
  };
};

export type RepositoryNode = {
  name: string;
};

export type RepositoriesData = {
  user: { repositories: { edges: Array<Repository> } };
};

export type Review = {
  node: {
    author: User;
    state: string;
  };
};
export type Reviews = {
  edges: Array<Review>;
};
