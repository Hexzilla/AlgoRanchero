import React, { useMemo, useState } from "react";
import MyAlgoConnect, { Accounts, Options } from '@randlabs/myalgo-connect';
import { AlgoContext } from "./Context";

export interface AlgoProviderProps {
  options: Options;
  children: React.ReactNode;
}

function AlgoProvider({ options, children }: AlgoProviderProps) {
  const [account, setAccount] = useState<Accounts | null>(null);

  const contextValue = useMemo(() => {
    const wallet = new MyAlgoConnect();
    return {
      wallet,
      options,
    };
  }, [options]);

  return (
    <AlgoContext.Provider
      value={{
        ...contextValue,
        account,
        setAccount,
      }}
    >
      {children}
    </AlgoContext.Provider>
  );
}

export default AlgoProvider;
