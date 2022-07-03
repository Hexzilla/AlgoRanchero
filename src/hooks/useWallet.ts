import { Accounts } from "@randlabs/myalgo-connect";
import { useCallback } from "react";
import { useAlgoContext } from "./useAlgoContext";

const useWallet = () => {
  const { wallet, account, setAccount } = useAlgoContext()!;

  const connectWallet = useCallback(() => {
    wallet
      .connect()
      .then((accounts: Accounts[]) => {
        console.log("accounts", accounts);
        const account = accounts[0];
        setAccount(account);
      })
      .catch((err) => console.error(err));
  }, [wallet, setAccount]);

  const disconnectWallet = async (): Promise<void> => {
    setAccount(null);
  };

  return {
    connectWallet,
    disconnectWallet,
    account,
    setAccount,
  };
};

export default useWallet;
