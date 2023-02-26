import Link from 'next/link';
import React from 'react';
import { SiGithub, SiGmail, SiInstagram, SiLinkedin, SiTwitter, SiYoutube } from 'react-icons/si';
import { Tooltip } from '@mantine/core';

type Props = {
    title?:"Twitter"|"Linkedin"|"Instagram"|"Gmail"|"Youtube"|"Github",
    link:string,
    userTheme:any
}

const SocialLink:React.FC<Props> = ({title,link,userTheme}) => {

  return (
    <Tooltip label={title} position='bottom' withArrow color={userTheme&&userTheme.c3} offset={10}>
    
    <Link href={title==='Gmail'?'mailto:'+link:link} target="_blank">
        <div style={userTheme && {backgroundColor:userTheme.c3,color:userTheme.c1}} className={`w-full bg-gray-800/50 p-3 text-gray-50/70  rounded-md hover:brightness-125 ease-linear duration-150 active:scale-90`}>
            {title==='Twitter'&&<SiTwitter size={24}/>}
            {title==='Linkedin'&&<SiLinkedin size={24}/>}
            {title==='Instagram'&&<SiInstagram size={24}/>}
            {title==='Gmail'&&<SiGmail size={24}/>}
            {title==='Youtube'&&<SiYoutube size={24}/>}
            {title==='Github'&&<SiGithub size={24}/>}
        </div>
    </Link>
    </Tooltip>
  )
}

export default SocialLink