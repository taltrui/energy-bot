import { Config } from 'pr_reminder';

export type Directive = {
  config: Array<Config>;
  id: string;
  execute: (config: Config) => void;
};

export type Employee = {
  github_id: string;
  name: string;
  slack_id: string;
  team: Array<string>;
};

export type MergeableBranchRule = {
  base: string;
  head: string;
  type: 'branch';
};

export type MergeableLabelRule = {
  type: 'label';
  labels: Array<string>;
};

export type MergeableRules = MergeableBranchRule | MergeableLabelRule;

export type MergeableConfig = {
  repos: Array<string>;
  rules: Array<MergeableRules>;
};

export type ReleasedConfig = {
  repos: Array<string>;
  message: string;
};

export type ReleasedHook = {
  config: Array<ReleasedConfig>;
  id: string;
};

export type MergeableHook = {
  config: Array<MergeableConfig>;
  id: string;
};
