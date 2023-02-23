import React from 'react'
import Card from './Card';

type Props = {
  displayName:string,
  username:string
  bio:string
}
function Preview({displayName,username,bio}:Props) {
  return (
    <div className="flex items-center justify-center h-full">
      
      <Card bio={bio} name={displayName} username={username} />
    </div>
  );
}

export default Preview
