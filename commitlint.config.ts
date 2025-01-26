import type { UserConfig } from '@commitlint/types'; 

const Configuration: UserConfig = {

  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [0, 'always', Infinity],
    'footer-max-line-length': [0, 'always', Infinity],
  },
};

export default Configuration;