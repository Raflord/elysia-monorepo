import type * as tables from "@server/database/tables/";

export interface Database {
  user: tables.UserTable;
  session: tables.SessionTable;
  account: tables.AccountTable;
  verification: tables.VerificationTable;
}
