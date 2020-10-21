import { makeAutoObservable, runInAction } from 'mobx';
import faker from 'faker';
import axios from 'axios';

export default class SearchStore {
  results = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  async search(searchStr) {
    try {
      const data = await axios.get('https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a');

      runInAction(() => {
        this.results = this.generateMockTransactions(10000);
      });
    } catch (e) {
      console.log(e);
    }
  }

  generateMockTransactions(amount = 100) {
    return [...Array(amount)
      .keys()].map((value, index) => ({
      id: index,
      timestamp: faker.date.past()
        .toISOString(),
      from: faker.finance.ethereumAddress(),
      to: faker.finance.ethereumAddress(),
      value: faker.finance.amount()
    }));
  };
}




