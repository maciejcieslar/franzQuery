import ChromeQuery from './chrome';
import FirefoxQuery from './firefox';
import SafariQuery from './safari';
import EdgeQuery from './edge';
import IEQuery from './internet-explorer';

const browsers = {
  chrome: ChromeQuery,
  edge: EdgeQuery,
  firefox: FirefoxQuery,
  safari: SafariQuery,
  ie: IEQuery,
};

const getQuery = browserType => browsers[browserType.toLowerCase()] || browsers.chrome;

export default getQuery;
