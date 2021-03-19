import { MergeableConfig } from 'general';

export const isRelease = (branchName: string): boolean => new RegExp('release-*').test(branchName);

export const getReleaseVersionFromComment = (comment: string): string | undefined => {
  const regex = /([a-z]+@\d+.\d+.\d+)|(\d+.\d+.\d+)/gi;

  return comment.match(regex)?.[0];
};

// PoC for allowing to config the hooks via Firebase.
const checkBranchRule = (prHead: string, prBase: string, baseRule: string, headRule: string): boolean => {
  const checkBaseRule = new RegExp(baseRule).test(prBase);
  const checkHeadRule = new RegExp(headRule).test(prHead);

  return (checkBaseRule && checkHeadRule) || !checkBaseRule;
};

const checkLabelsRule = (labels: Array<{ name: string }>, configLabels: Array<string>): boolean =>
  !labels.some((label) => {
    console.log(label.name.toLowerCase());
    return configLabels.includes(label.name.toLowerCase());
  });

export const canBeMerged = (
  pr: { head: { ref: string }; base: { ref: string }; labels: Array<{ name: string }> },
  configToUse: MergeableConfig
): boolean => {
  const { rules } = configToUse;

  return rules.every((rule) => {
    switch (rule.type) {
      case 'branch':
        return checkBranchRule(pr.head.ref, pr.base.ref, rule.base, rule.head);
      case 'label':
        return checkLabelsRule(pr.labels, rule.labels);
    }
  });
};
