import * as React from "react";
import {
  PlasmicPlay,
  DefaultPlayProps,
} from "./plasmic/online_course_or_book/PlasmicPlay";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useAssets from "../hooks/useAssets";
import useWallet from "../hooks/useWallet";
import { SuggestedParams } from "algosdk";


export interface PlayProps extends DefaultPlayProps {}

const receiver = "H5ATUPW3P7P2XOGIY2EXA7YGOZLLYXWK44XVBSV5SAIMSKI35ZRN2EKTTA";;

function Play_(props: PlayProps, ref: HTMLElementRefOf<"div">) {
  const { account } = useWallet();
  const { signTransaction, sendAssets } = useAssets();

  const handleUseTicket = async () => {
    console.log("handleUseTicket");
    if (!account) {
      return;
    }
    const response = await sendAssets(receiver);
    console.log('response', response);

    /*const params = {
      fee: 1000,
      flatFee: true,
    } as SuggestedParams;
    const response = await signTransaction(account.address, receiver, 1000, params);
    console.log('response', response);*/
  };

  return (
    <PlasmicPlay
      root={{ ref }}
      {...props}
      useTicket={{ onClick: () => handleUseTicket() }}
    />
  );
}

const Play = React.forwardRef(Play_);
export default Play;
