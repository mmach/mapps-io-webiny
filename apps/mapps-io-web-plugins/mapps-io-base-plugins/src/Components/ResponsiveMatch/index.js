/*
    ./client/components/App.js
*/

import React from "react";
import Media from "react-media";

function ResponsiveMatch(props) {
  return (
    <Media
      queries={{
        xs: "(max-width: 575px)",
        sm: "(min-width: 576px) and (max-width: 767px)",
        md: "(min-width: 768px) and (max-width: 991px)",
        lg: "(min-width: 992px) and (max-width: 1199px)",
        xl: "(min-width: 1200px)"
      }}
    >
      {(matches) => {
        let result = <span></span>;
        if (matches.xs && (props.xs || props.onPhone) == true) {
          result = props.onPhoneChildren ? props.onPhoneChildren : props.children;
        } else if (matches.sm && (props.sm == true || props.onPhone)) {
          result = props.onPhoneChildren ? props.onPhoneChildren : props.children;
        } else if (matches.md && (props.md == true || props.onPhone)) {
          result = props.onPhoneChildren ? props.onPhoneChildren : props.children;
        } else if (matches.lg && (props.lg == true || props.onDesktop)) {
          result = props.onDesktopChildren ? props.onDesktopChildren : props.children;
        } else if (matches.xl && (props.xl == true || props.onDesktop)) {
          result = props.onDesktopChildren ? props.onDesktopChildren : props.children;
        }

        return result;
      }}
    </Media>
  );
}
export default React.memo(ResponsiveMatch);
