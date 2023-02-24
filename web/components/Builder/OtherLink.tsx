import Link from "next/link";
import React from "react";
import { useControls } from "../../store/controlStore";
import { FiLink } from "react-icons/fi";

type Props = {
  title: string;
  link: string;
};
const OtherLink:React.FC<Props> = ({title,link}) => {
  const userBgColor = useControls((e)=>e.userBgColor)

  return (
    <Link href={link}>
      <div className={`flex justify-between items-center text-gray-50/70 hover:text-gray-50 duration-150 active:scale-95 flex-row mt-2 ${userBgColor ===''?'bg-gray-800/50':'bg-gray-900/40'}  p-2 px-3 rounded-md`}>
        <div>{title}</div>
        <div>
          <FiLink />
        </div>
      </div>
    </Link>
  );
};

export default OtherLink;
