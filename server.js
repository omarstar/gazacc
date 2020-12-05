const cors = require("cors");

const express = require("express");
const app = express();

const mongo = require("./engine/mongoose");
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

/** TEST
 * if not using routes, instead using index models
 */
const Db = require("./models/index");

app.post("/fuel/add", async (req, res) => {
  await Db.Fuel.create({
    name: req.body.name,
  })
    .then((docFuel) => res.json(docFuel))
    .catch((err) => res.json(err));
});

app.get("/fuel/", async (req, res) => {
  await Db.Fuel.find({})
    .then((docFuel) => res.json(docFuel))
    .catch((err) => res.json(err));
});

/* routes */
//done create, list, delete
const pumpsRouter = require("./routes/pumps");
app.use("/pump", pumpsRouter);
//done create, list, delete
const tanksRouter = require("./routes/tanks");
app.use("/tank", tanksRouter);
//done create, list, delete
const invoicesRouter = require("./routes/invoices");
app.use("/invoice", invoicesRouter);
//done create, list, delete
const companiesRouter = require("./routes/companies");
app.use("/company", companiesRouter);
/* listen with browser*/
app.listen(port, () => console.log(`listening on port ${port}!`));
/* connect database */
mongo.connect();
