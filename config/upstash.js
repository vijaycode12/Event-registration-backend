import { Client } from "@upstash/workflow";

import { QSTASH_URL,QSTASH_TOKEN } from "./env.js";

const WorkflowClient = new Client({
    baseUrl:QSTASH_URL,
    token:QSTASH_TOKEN,
});

export default WorkflowClient;