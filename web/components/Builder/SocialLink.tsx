import Link from 'next/link';
import React from 'react';
import { SiGithub, SiGmail, SiInstagram, SiLinkedin, SiTwitter, SiYoutube } from 'react-icons/si';

type Props = {
    title?:"Twitter"|"Linkedin"|"Instagram"|"Gmail"|"Youtube"|"Github",
    link:string,
}

const SocialLink:React.FC<Props> = ({title,link}) => {
  return (
    <Link href={link}>
        <div className='bg-gray-800 text-gray-400 p-3 rounded-md hover:text-gray-100 ease-linear duration-150 active:scale-90'>
            {title==='Twitter'&&<SiTwitter size={27}/>}
            {title==='Linkedin'&&<SiLinkedin size={27}/>}
            {title==='Instagram'&&<SiInstagram size={27}/>}
            {title==='Gmail'&&<SiGmail size={27}/>}
            {title==='Youtube'&&<SiYoutube size={27}/>}
            {title==='Github'&&<SiGithub size={27}/>}
        </div>
    </Link>
  )
}

export default SocialLink