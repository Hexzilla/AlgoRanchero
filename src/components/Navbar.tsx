import * as React from "react";
import {
  PlasmicNavbar,
  DefaultNavbarProps,
} from "./plasmic/algo_ranchero/PlasmicNavbar";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useWallet from "../hooks/useWallet";

export interface NavbarProps extends DefaultNavbarProps {}

function Navbar_(props: NavbarProps, ref: HTMLElementRefOf<"header">) {
  const { account, connectWallet, disconnectWallet } = useWallet();

  const handleSyncButton = () => {
    if (account) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <PlasmicNavbar
      root={{ ref }}
      {...props}
      synced={!!account}
      syncWallet={{
        onClick: () => handleSyncButton(),
      }}
    />
  );
}

const Navbar = React.forwardRef(Navbar_);
export default Navbar;
