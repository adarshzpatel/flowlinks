import React from "react";
import Card from "./Card";

type Props = {
  name:string 
}
function Preview({name}:Props) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card bio="Test bio" name={name} username="Test" />
    </div>
  );
}

export default Preview;
