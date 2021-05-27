import React from "react";

import Options from "../Options/Options";

const GeneralOptions = props => {
  return <Options options={props.optionsData} title="Options" {...props} />;
};

export default GeneralOptions;