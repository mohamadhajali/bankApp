import { Component } from "react";

class Transcation extends Component {
  constructor() {
    super();
  }
  delete = (amount, vendor, category) => {
    this.props.delete(amount, vendor, category);
  };
  render() {
    return (
      <tr>
        {/* <p>{this.props.transcation.vendor}</p> */}
        <td>{this.props.transcation.amount}</td>
        <td>{this.props.transcation.vendor}</td>
        <td>{this.props.transcation.category}</td>
        <button
          className="deleteButton"
          onClick={(event) => {
            this.delete(
              this.props.transcation.amount,
              this.props.transcation.vendor,
              this.props.transcation.category
            );
          }}
        >
          Delete
        </button>
      </tr>
    );
  }
}

export default Transcation;
