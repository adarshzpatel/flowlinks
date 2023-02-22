import React from "react";
import Card from "./Card";

type Props = {
  displayName:string,
  username:string
}
function Preview({displayName,username}:Props) {
  return (
    <div className="flex items-center justify-center bg-gray-800/50 ">
      <div>{username}</div>
      <Card bio="Test bio" name={displayName} username="Test" />
    </div>
  );
}

export default Preview;
