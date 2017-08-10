import { retryDelay } from './retryDelay';
import Ambrosus from 'ambrosus';

export const waitForAmbrosus = async () => await retryDelay(() =>
    typeof Ambrosus.MarketContract.currentProvider === 'undefined' || web3.eth.accounts.length === 0);
