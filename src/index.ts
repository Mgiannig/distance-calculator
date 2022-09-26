import express, { Request, Response } from "express";
require("dotenv").config();
import { getPersonList } from "./persons-list";
import { Person } from "./model/person";
import { ServiceResponse } from "./model/service-response";
import { execute } from "./branchRecommendator";

const port = process.env.PORT || 3000;
const app = express();
app.get("/branches", async (req: Request, res: Response) => {
  const persons: Person[] = getPersonList();
  const maxDistance: number = parseInt(req.query.maxDistance as string) || 5000;
  try {
    const response: ServiceResponse[] = await execute(persons, maxDistance);
    res.send(response);
  } catch (error) {
    res.send(`Encountered Error, please try again later ${error}`);
  }
});

app.listen(port, (): void => {
  console.log("Running in ", port);
});
