import React from "react";
import { useControls } from "../../store/useControls";
import Card from "./Card";


type Props = {
  displayName:string,
  username:string
}

function Preview({displayName,username}:Props) {
  const bg = useControls((e)=>e.userBgColor)
  return (
    <div style={{backgroundImage:bg}} className="flex items-center justify-center section__height fixed right-0 w-[50%]  ease-linear duration-150">
      <Card />
    </div>
  );
}

export default Preview;
