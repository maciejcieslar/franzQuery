import ChromeQuery from './chrome';

const browsers = {
  chrome: ChromeQuery,
  edge: ChromeQuery,
  firefox: ChromeQuery,
  safari: ChromeQuery,
  ie: ChromeQuery,
};

const getQuery = browserType => browsers[browserType] || browsers.chrome;

export default getQuery;
