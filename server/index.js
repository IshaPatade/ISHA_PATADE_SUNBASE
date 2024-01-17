const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/fetchData", async (req, res) => {
  try {
    const remoteApiUrl =
      "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";
    const remoteApiResponse = await fetch(remoteApiUrl, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const data = await remoteApiResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from remote API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create", async (req, res) => {
  console.log("here");
  try {
    const { fname, lname, street, address, city, state, email, phone } =
      req.body;
    console.log(fname, lname);
    const token = req.headers.authorization;
    const remoteApiUrl =
      "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create";
    const remoteApiResponse = await fetch(remoteApiUrl, {
      method: "post",
      headers: {
        Authorization: req.headers.authorization,
      },
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        street: street,
        address: address,
        city: city,
        state: state,
        email: email,
        phone: phone,
      }),
    });

    console.log(remoteApiResponse);
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error("Error fetching data from remote API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const { uuid } = req.body;
    console.log(uuid);
    const token = req.headers.authorization;

    const apiUrl = `https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuid}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log(response);

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/update", async (req, res) => {
  console.log("here");
  try {
    const { fname, lname, street, address, city, state, email, phone, uuid } =
      req.body;
    console.log(uuid);
    console.log(fname, lname);
    const token = req.headers.authorization;
    const remoteApiUrl = `https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`;
    const remoteApiResponse = await fetch(remoteApiUrl, {
      method: "post",
      headers: {
        Authorization: req.headers.authorization,
      },
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        street: street,
        address: address,
        city: city,
        state: state,
        email: email,
        phone: phone,
      }),
    });

    console.log(remoteApiResponse);
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error("Error fetching data from remote API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
