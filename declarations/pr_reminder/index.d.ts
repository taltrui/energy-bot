export interface Config {
  channel: string,
  cron: string,
  id: string,
  labelsToAvoid: Array<string>,
  repositories: Array<string>,
}

export interface CLIOptions {
  channel: string,
  on: string,
  current: boolean,
  id: string,
  repos: Array<string>
}
