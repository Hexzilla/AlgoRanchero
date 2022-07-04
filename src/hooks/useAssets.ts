import { useCallback } from "react";
import algosdk, { SuggestedParams } from "algosdk";
import axios from "axios";
import { SignedTx } from "@randlabs/myalgo-connect";
import { useAlgoContext } from "./useAlgoContext";

const BASE_URL = "https://node.algoexplorerapi.io";
const ASSET_ID = 794691991;
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
          //return await algodClient.sendRawTransaction(signedTxn.blob).do();

          const traxUrl = `${BASE_URL}/v2/transactions`;
          const traxRes = await axios.post(traxUrl, signedTxn.blob, {
            headers: {
              'Content-Type': 'application/x-binary',
            },
          });
          console.log('traxRes', traxRes)

          const txId = traxRes.data.txId;
          //await algosdk.waitForConfirmation(algodClient, txId, 4);
          
          return txId;

        } catch (error) {
          console.error(error);
          return null;
        }
      };
      return account ? sendAssetsAsync(account.address, to, 1) : null;
    },
    [wallet, account]
  );

  const getAssets = useCallback(() => {
    const getAssetsAsync = async (address: string) => {
      try {
        const url = `${BASE_URL}/v2/accounts/${address}/assets/${ASSET_ID}`;
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log('res', res)
        return res.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return account? getAssetsAsync(account.address) : Promise.resolve(null);
  }, [account])

  return {
    signTransaction,
    sendAssets,
    getAssets,
  };
};

export default useAssets;
