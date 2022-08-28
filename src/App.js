import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Transcations from "./component/Transcations";
import Transcation from "./component/Transcation";
import Operations from "./component/Operations";
import Report from "./component/Report";
import axios from "axios";
import jQuery, { data } from "jquery";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dummyData: [],
      transcationsReport: [],
      withDrwo: false,
    };
  }
  drwo = () => {
    this.setState({ withDrwo: true });
  };
  componentDidMount = () => {
    this.getData().then((result) => {
      this.setState({ dummyData: result.data });
    });
    this.getReport().then((result) => {
      this.setState({ transcationsReport: result.data });
    });
  };
  updateData = async () => {
    const response = await this.getData();
    this.setState({ dummyData: response.data });
  };
  updateReport = async () => {
    const response = await this.getReport();
    this.setState({ transcationsReport: response.data });
  };
  getReport = async () => {
    return await axios.get("http://localhost:3000/getReport");
  };
  getData = async () => {
    return await axios.get("http://localhost:3000/transactions");
  };
  depositAndWithdraw = async (vendor, category, amount) => {
    let tempdata = { amount: amount, vendor: vendor, category: category };
    await jQuery.post(`http://localhost:3000/transaction`, tempdata, (res) => {
      this.updateData();
      this.updateReport();
    });
  };
  delete = async (amount, vendor, category) => {
    let tempdata = { amount: amount, vendor: vendor, category: category };
    await jQuery.ajax({
      url: `http://localhost:3000/transactionDelete`,
      method: "DELETE",
      data: tempdata,
    });

    console.log("ssssssssssssssssss");
    this.updateData();
    this.updateReport();
  };
  getTotalAmount = () => {
    let totalAmount = 0;
    for (let i = 0; i < this.state.dummyData.length; i++) {
      totalAmount += this.state.dummyData[i].amount;
    }
    return <span className=" totalAmount">totalAmount:= {totalAmount}</span>;
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <div className="NavBar">
              <Link className="a" to="/">
                Operations
              </Link>
              <Link className="a" to="/transcations">
                Transcations
              </Link>
              <Link className="a" to="/report">
                {" "}
                Report
              </Link>
              {this.getTotalAmount()}
            </div>

            <Route
              path="/transcations"
              exact
              render={() => {
                return (
                  <Transcations
                    transcations={this.state.dummyData}
                    delete={this.delete}
                  />
                );
              }}
            ></Route>
            <Route
              path="/"
              exact
              render={() => (
                <Operations depositAndWithdraw={this.depositAndWithdraw} />
              )}
            ></Route>
            <Route
              path="/report"
              exact
              render={() => (
                <Report transcations={this.state.transcationsReport} />
              )}
            ></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
