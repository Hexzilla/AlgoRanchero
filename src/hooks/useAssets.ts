import { useCallback } from "react";
import algosdk, { SuggestedParams } from "algosdk";
import { SignedTx } from "@randlabs/myalgo-connect";
import { useAlgoContext } from "./useAlgoContext";

const algodClient = new algosdk.Algodv2("", "https://api.algoexplorer.io/", "");

const useAssets = () => {
  const { wallet, account } = useAlgoContext()!;

  const signTransaction = useCallback(
    (
      from: string,
      to: string,
      amount: number,
      suggestedParams: SuggestedParams
    ) => {
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        from,
        to,
        amount,
        undefined,
        undefined,
        suggestedParams
      );
      return wallet
        .signTransaction(txn.toByte())
        .then((signedTxn: SignedTx) => {
          return algodClient.sendRawTransaction(signedTxn.blob).do();
        })
        .then((response: any) => {
          console.log("response", response);
        })
        .catch((error) => console.error(error));
    },
    [wallet]
  );

  const sendAssets = useCallback(
    (to: string) => {
      if (account) {
        const suggestedParams = {
          fee: 1000,
          flatFee: true,
        } as SuggestedParams;
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: account.address,
          to: to,
          amount: 1,
          assetIndex: 1,
          suggestedParams,
        });
        return wallet
          .signTransaction(txn.toByte())
          .then((signedTxn: SignedTx) => {
            return algodClient.sendRawTransaction(signedTxn.blob).do();
          })
          .then((response: any) => {
            console.log("response", response);
            return response;
          })
          .catch((error) => console.error(error));
      } else {
        return null;
      }
    },
    [wallet, account]
  );

  return {
    signTransaction,
    sendAssets,
  };
};

export default useAssets;
