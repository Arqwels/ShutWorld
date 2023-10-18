import { makeAutoObservable } from 'mobx';

class FormStore {
  stateVisibl1 = false;
  stateVisibl2 = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDropdownVisible1 = () => {
    this.stateVisibl1 = !this.stateVisibl1;
    if (this.stateVisibl1) {
      this.stateVisibl2 = false;
    }
  }

  toggleDropdownVisible2 = () => {
    this.stateVisibl2 = !this.stateVisibl2;
    if (this.stateVisibl2) {
      this.stateVisibl1 = false;
    }
  }

  get isStateVisibl1() {
    return this.stateVisibl1;
  }

  get isStateVisibl2() {
    return this.stateVisibl2;
  }
}

const formStore = new FormStore();

export default formStore;
