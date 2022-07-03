import * as React from "react";
import { UnityContext } from 'react-unity-webgl';
import {
  PlasmicPlay,
  DefaultPlayProps,
} from "./plasmic/online_course_or_book/PlasmicPlay";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as notification from './Notification';
import useAssets from "../hooks/useAssets";
import useWallet from "../hooks/useWallet";

export interface PlayProps extends DefaultPlayProps {}

const receiver = "H5ATUPW3P7P2XOGIY2EXA7YGOZLLYXWK44XVBSV5SAIMSKI35ZRN2EKTTA";
const title = 'Algo';

const unityContext = new UnityContext({
  loaderUrl: 'Build/1.loader.js',
  dataUrl: 'Build/1.data',
  frameworkUrl: 'Build/1.framework.js',
  codeUrl: 'Build/1.wasm',
});

function Play_(props: PlayProps, ref: HTMLElementRefOf<"div">) {
  const [loading, setLoading] = React.useState(false);
  const { account } = useWallet();
  const { sendAssets } = useAssets();

  const handleUseTicket = async () => {
    console.log("handleUseTicket");
    if (!account) {
      notification.error(title, "Please connect your wallet");
      return;
    }
    setLoading(true);

    const transaction = await sendAssets(receiver);
    console.log('response', transaction);
    if (transaction) {
      unityContext.send('AccessController', 'InsertToken');
      notification.info(title, `The ticket has been used successfully.\n Transaction: ${transaction}`);
    } else {
      notification.error(title, "Something wrong");
    }
    setLoading(false);
  };

  return (
    <PlasmicPlay
      root={{ ref }}
      {...props}
      useTicket={{ 
        isDisabled: loading,
        onClick: () => handleUseTicket() 
      }}
    />
  );
}

const Play = React.forwardRef(Play_);
export default Play;
