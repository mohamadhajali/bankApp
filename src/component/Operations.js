import { Component } from "react";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: "",
      drwo: false,
    };
  }
  handlerLesenrForVendor = (e) => {
    this.setState({ vendor: e.target.value });
  };
  handlerLesenrForCatogry = (e) => {
    this.setState({ category: e.target.value });
  };
  handlerLesenrForAmount = (e) => {
    this.setState({ amount: e.target.value });
  };
  depositAndWithdraw = () => {
    let tempamount = -1 * parseInt(this.state.amount);
    {
      this.state.drwo
        ? this.setState({ amount: tempamount })
        : this.setState({ amount: this.state.amount });
    }
    this.props.depositAndWithdraw(
      this.state.vendor,
      this.state.category,

      parseInt(this.state.amount)
    );
  };
  Withdraw = () => {
    let tempamount = -1 * parseInt(this.state.amount);
    console.log(tempamount);
    this.setState({ amount: tempamount });
    this.props.depositAndWithdraw(
      this.state.vendor,
      this.state.category,
      this.state.amount
    );
  };
  render() {
    return (
      <div className="operations">
        <input
          type="text"
          placeholder="vendor"
          onChange={this.handlerLesenrForVendor}
        ></input>
        <input
          type="text"
          placeholder="category"
          onChange={this.handlerLesenrForCatogry}
        ></input>
        <input
          type="number"
          placeholder="amount"
          onChange={this.handlerLesenrForAmount}
        ></input>
        <span>
          <button onClick={this.depositAndWithdraw}> Deposit </button>
          <button onClick={this.Withdraw}>Withdraw</button>
        </span>
      </div>
    );
  }
}

export default Operations;
