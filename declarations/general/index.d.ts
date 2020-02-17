import { Config } from "pr_reminder";

export type Directive = {
  config: Array<Config>,
  id: string,
  execute: (config: Config) => void
}

export type Employee = {
  github_id: string;
  name: string;
  slack_id: string;
  team: Array<string>
}