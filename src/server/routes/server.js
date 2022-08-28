const express = require("express");
const path = require("path");
const Transaction = require("../models/transaction");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "node_modules")));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Transaction", { useNewUrlParser: true });
const port = 3000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
app.get("/transactions", (err, res) => {
  Transaction.find({}).exec(function (err, result) {
    if (err || !result) {
      res.status(404).end();
    } else {
      res.send(result);
    }
  });
});
app.post("/transaction", (req, res) => {
  const transaction = req.body;
  console.log(transaction);
  let transactionObject = new Transaction({
    amount: transaction.amount,
    category: transaction.category,
    vendor: transaction.vendor,
  });
  transactionObject.save();
  res.end();
});
app.delete("/transactionDelete", (req, res) => {
  transactionTodelete = req.body;
  console.log(transactionTodelete);
  Transaction.deleteOne(
    {
      vendor: transactionTodelete.vendor,
      amount: transactionTodelete.amount,
      category: transactionTodelete.category,
    },
    function (err) {}
  );
  res.end();
});
app.get("/getReport", async (req, res) => {
  const transactions = await Transaction.aggregate([
    { $group: { _id: "$category", totalSalaries: { $sum: "$amount" } } },
  ]);
  res.send(transactions);
});
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
