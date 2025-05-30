// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Users",
    columns: [
      { name: "email", type: "text", notNull: true, defaultValue: "empty" },
      { name: "firstName", type: "text", notNull: true, defaultValue: "empty" },
      { name: "lastName", type: "text", notNull: true, defaultValue: "empty" },
    ],
    revLinks: [{ column: "user", table: "Jobs" }],
  },
  {
    name: "Jobs",
    columns: [
      { name: "job_name", type: "text", notNull: true, defaultValue: "empty" },
      {
        name: "job_company",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      { name: "job_salary", type: "text", notNull: true, defaultValue: "0" },
      {
        name: "job_location",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      {
        name: "job_post_url",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      { name: "job_desc", type: "text", notNull: true, defaultValue: "empty" },
      {
        name: "job_application_date",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      {
        name: "job_interview_date",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      {
        name: "job_offer_received_date",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      {
        name: "job_offer_accepted_date",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
      { name: "user", type: "link", link: { table: "Users" } },
      {
        name: "job_status",
        type: "text",
        notNull: true,
        defaultValue: "empty",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["Users"];
export type UsersRecord = Users & XataRecord;

export type Jobs = InferredTypes["Jobs"];
export type JobsRecord = Jobs & XataRecord;

export type DatabaseSchema = {
  Users: UsersRecord;
  Jobs: JobsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://bookworm7572-s-workspace-e0s0n4.us-east-1.xata.sh/db/job-tracker-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
