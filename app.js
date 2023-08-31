const express = require("express");
const bodyParser = require("body-parser");
const sha512 = require("crypto-js/sha512");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/reverse-hash", (req, res) => {

  console.log("Gopi ", req.body);

  const key = req.body.key;
  const txnid = req.body.txnid;
  const amount = req.body.amount;
  //const productinfo = req.body.productinfo;
  // const firstname = req.body.firstname;
  // const email = req.body.email;
  // const udf1 = req.body.udf1;
  // const udf2 = req.body.udf2;
  // const udf3 = req.body.udf3;
  // const udf4 = req.body.udf4;
  // const udf5 = req.body.udf5;
  const status = req.body.status;

  //const salt = "eCwWELxi";

  //const reverseHash = getReverseHash(salt, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5, status);

  if (status === "success") {
    res.send({
      status: "success",
      message: "Transaction successful",
      data: {
        key,
        txnid,
        amount,
        // productinfo,
        // firstname,
        // email,
        // udf1,
        // udf2,
        // udf3,
        // udf4,
        // udf5,
        status,
      },
    });
  } else {
    res.send({ status: "error", message:"Transaction Failed" });
  }
});

// function getReverseHash(salt, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5, status) {
//   const data = [salt, status, "", "", "", "", udf5, udf4, udf3, udf2, udf1, email, firstname, productinfo, amount, txnid, key];
//   const str = data.join("|");
//   return sha512(str).toString();
// }

app.listen(8003, () => console.log("Server is running on port 8003"));