const WIPandHoldNames = ['wip', 'work in progress', 'hold', 'on hold'];

export const isRelease = (branchName: string): boolean => new RegExp('release-*').test(branchName);

export const isWIPorHold = (labels: Array<{ name: string }>): boolean =>
  labels.some((label) => {
    console.log(label.name.toLowerCase());
    return WIPandHoldNames.includes(label.name.toLowerCase());
  });

export const getReleaseVersionFromComment = (comment: string): string | undefined => {
  const regex = /([a-z]+@\d+.\d+.\d+)|(\d+.\d+.\d+)/gi;

  return comment.match(regex)?.[0];
};