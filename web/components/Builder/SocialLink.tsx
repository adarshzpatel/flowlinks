import Link from 'next/link';
import React from 'react';
import { useControls } from '../../store/controlStore';
import { SiGithub, SiGmail, SiInstagram, SiLinkedin, SiTwitter, SiYoutube } from 'react-icons/si';

type Props = {
    title?:"Twitter"|"Linkedin"|"Instagram"|"Gmail"|"Youtube"|"Github",
    link:string,
}

const SocialLink:React.FC<Props> = ({title,link}) => {
  const userBgColor = useControls((e)=>e.userBgColor)

  return (
    <Link href={link}>
        <div className={`w-full ${userBgColor ===''?'bg-gray-800/50':'bg-gray-900/40'} text-gray-50/70 p-3 rounded-md hover:text-gray-50 ease-linear duration-150 active:scale-90`}>
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