const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Create a route to handle the reverse hash calculation
app.post("/reverse-hash", (req, res) => {
  // Get the parameters from the request
  const key = req.body.key;
  const txnid = req.body.txnid;
  const amount = req.body.amount;
  const productinfo = req.body.productinfo;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const udf1 = req.body.udf1;
  const udf2 = req.body.udf2;
  const udf3 = req.body.udf3;
  const udf4 = req.body.udf4;
  const udf5 = req.body.udf5;
  const status = req.body.status;

  res.send({
    status: "success",
    message: "Transaction successful",
  });

  // Generate the reverse hash
  const reverseHash = getReverseHash(key, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5, status);

  // Check if the hash from the request matches the generated reverse hash
  if (req.body.hash === reverseHash) {
    // Transaction is successful
    res.send({
      status: "success",
      message: "Transaction successful",
    });
  } else {
    // Transaction is tempered
    res.send({
      status: "error",
      message: "Transaction failed",
    });
  }
});

// Function to generate reverse hash
function getReverseHash(key, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5, status) {
  // Get the salt from the environment variable
  const salt = process.env.SALT;

  // Create the reverse hash string
  const reversehash_string = salt + "|" + status + "||||||" + udf5 + "|" + udf4 + "|" + udf3 + "|" + udf2 + "|" + udf1 + "|" + email + "|" + firstname + "|" + productinfo + "|" + amount + "|" + txnid + "|" + key;

  // Generate the reverse hash
  const reverseHash = sha512(reversehash_string);

  // Return the reverse hash
  return reverseHash;
}

// Start the server
app.listen(4500, () => {
  console.log("Server listening on port 4500");
});

