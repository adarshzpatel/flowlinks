import React from 'react'
import {Modal} from "@mantine/core"
import Button from '../ui/Button'


type Props = {
  open:boolean 
  setOpen:any 
  addNewLink:any 
}

const AddLinkModal = ({open,setOpen,addNewLink}: Props) => {
  // title 
  // href
  return (
    <Modal
    opened={open}
    onClose={() => setOpen(false)}
    title="Introduce yourself!"
  >

    <Button onClick={()=>addNewLink(title,href)}></Button>
  </Modal>

  )
}

export default AddLinkModal