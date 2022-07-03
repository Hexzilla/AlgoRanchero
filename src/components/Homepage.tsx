import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  PlasmicHomepage,
  DefaultHomepageProps,
} from "./plasmic/online_course_or_book/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface HomepageProps extends DefaultHomepageProps {}

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {
  const history = useHistory();

  const handleStartPlay = (e: any) => {
    e.preventDefault();
    history.push("/play");
  };

  return (
    <PlasmicHomepage
      root={{ ref }}
      {...props}
      startPlayButton={{
        onClick: (e) => handleStartPlay(e),
      }}
      playButton={{
        onClick: (e) => handleStartPlay(e),
      }}
      playGameButton={{
        onClick: (e) => handleStartPlay(e),
      }}
      playNowButton={{
        onClick: (e) => handleStartPlay(e),
      }}
    />
  );
}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;
