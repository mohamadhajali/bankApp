import { Component } from "react";
class Report extends Component {
  constructor() {
    super();
    this.state = {};
  }
  getAllTransations = () => {};
  render() {
    return (
      <div>
        <table>
          <tr>
            <th> Total Salaries </th>
            <th> category </th>
          </tr>
          {this.props.transcations.map((e) => {
            return (
              <tr>
                {/* <td>{e._id}</td> */}
                {e.totalSalaries < 500 ? (
                  <td style={{ backgroundColor: "red" }}>{e.totalSalaries}</td>
                ) : (
                  <td style={{ backgroundColor: "green" }}>
                    {e.totalSalaries}
                  </td>
                )}
                <td>{e._id}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Report;
