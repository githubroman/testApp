import { observable, action, computed } from 'mobx';
import axios from 'axios';

class PoloniexStore {
  @observable lastData = null;
  @observable error = null;

  @action.bound
  getLastValues() {
    axios({
      url: 'https://poloniex.com/public?command=returnTicker',
    }).then((response) => {
      this.lastData = response.data;
      this.error = null;
    }).catch((err) => {
      this.error = 'Ошибка';
      console.log(err.message);
    })
  }
}

export default new PoloniexStore();