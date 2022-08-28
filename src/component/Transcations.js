import { Component } from "react";
import Transcation from "./Transcation";
class Transcations extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        {/* <Transcation Transcation={this.props.transcations} /> */}
        <table>
          <tr>
            <th> amount </th>
            <th> vendor </th>
            <th> category </th>
          </tr>
          {this.props.transcations.map((e) => {
            return <Transcation transcation={e} delete={this.props.delete} />;
          })}
        </table>
      </div>
    );
  }
}

export default Transcations;
