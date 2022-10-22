import JoditEditor from 'jodit-react'
import React from "react";

const Contract = ({setValue, name = "test"}) => {

  return (
    <div>
        <JoditEditor onChange={e => setValue(name, e)}/>
    </div>
  );
};

export default Contract;
