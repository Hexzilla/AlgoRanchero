import React from "react";
import MyAlgoConnect, { Accounts, Options } from "@randlabs/myalgo-connect";

export interface AlgoContextValue {
  wallet: MyAlgoConnect;
  options: Options;
  account: Accounts | null;
  setAccount: (account: Accounts | null) => void;
}

export const AlgoContext = React.createContext<AlgoContextValue>({} as any);

export type AlgoContextInstance = typeof AlgoContext;

if (process.env.NODE_ENV !== "production") {
  AlgoContext.displayName = "AlgoContext";
}

export default AlgoContext;
