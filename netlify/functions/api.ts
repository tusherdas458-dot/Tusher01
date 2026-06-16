import serverless from "serverless-http";
import { apiApp } from "../../src/api";

export const handler = serverless(apiApp);
