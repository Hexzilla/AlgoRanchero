import { useCallback } from "react";
import algosdk, { SuggestedParams } from "algosdk";
import axios from "axios";
import { SignedTx } from "@randlabs/myalgo-connect";
import { useAlgoContext } from "./useAlgoContext";

const BASE_URL = "https://node.algoexplorerapi.io";
const token = {
  'Access-Control-Allow-Origin': '*',
  'X-API-Key': '9RteuDnvR06kVoU1tMdE69Gxajzb4479ajWR7FKe',
};
const algodClient = new algosdk.Algodv2("", "https://mainnet-algorand.api.purestake.io/ps2", "", token);

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
      const sendAssetsAsync = async (
        from: string,
        to: string,
        amount: number
      ) => {
        try {
          const url = `${BASE_URL}/v2/transactions/params`;
          const res = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          //const suggestedParams = await algodClient.getTransactionParams().do();
          const params = res.data;
          const suggestedParams: SuggestedParams = {
            flatFee: true,
            fee: 1000,
            firstRound: params["last-round"],
            lastRound: params["last-round"] + 1000,
            genesisID: params["genesis-id"],
            genesisHash: params["genesis-hash"],
          };
          console.log("suggestedParams", suggestedParams);

          const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(
            {
              from,
              to,
              amount,
              assetIndex: 794691991,
              suggestedParams,
            }
          );
          console.log('txn', txn)
          const signedTxn = await wallet.signTransaction(txn.toByte());
          console.log('signedTxn', signedTxn)
          return await algodClient.sendRawTransaction(signedTxn.blob).do();

          /*const traxUrl = `${BASE_URL}/v2/transactions`;
          const data = Buffer.from(signedTxn.blob);
          const payload = Buffer.from(new Uint8Array(Buffer.from(JSON.stringify(data))))
          const traxRes = await axios.post(traxUrl, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('traxRes', traxRes)*/

        } catch (error) {
          console.error(error);
          return null;
        }
      };
      return account ? sendAssetsAsync(account.address, to, 1) : null;
    },
    [wallet, account]
  );

  return {
    signTransaction,
    sendAssets,
  };
};

export default useAssets;
