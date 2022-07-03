import * as React from "react";
import {
  PlasmicPlay,
  DefaultPlayProps
} from "./plasmic/online_course_or_book/PlasmicPlay";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface PlayProps extends DefaultPlayProps {}

function Play_(props: PlayProps, ref: HTMLElementRefOf<"div">) {
  return <PlasmicPlay root={{ ref }} {...props} />;
}

const Play = React.forwardRef(Play_);
export default Play;
