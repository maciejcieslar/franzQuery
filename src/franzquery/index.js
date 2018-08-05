import getQuery from './browsers';
import { browser } from '../utils';

export const FranzQuery = getQuery(browser.getBrowserType());

const $ = (...elements) => new FranzQuery(elements, document);

export default $;
