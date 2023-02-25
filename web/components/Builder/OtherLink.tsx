import Link from "next/link";
import React from "react";
import { useControls } from "../../store/useControls";
import { FiLink } from "react-icons/fi";

type Props = {
  title: string;
  link: string;
};
const OtherLink:React.FC<Props> = ({title,link}) => {
  const userTheme = useControls((e)=>e.userTheme)
  return (
    <Link href={link} target="_blank" rel='noreferrer'>
      <div  style={userTheme && {backgroundColor:userTheme.c3,color:userTheme.c1}} className={`flex justify-between items-center text-gray-50/70 hover:brightness-125 ease-linear duration-150 active:scale-95 flex-row mt-2 bg-gray-800/40 p-2 px-3 rounded-md`}>
        <div>{title}</div>
        <div>
          <FiLink />
        </div>
      </div>
    </Link>
  );
};

export default OtherLink;
