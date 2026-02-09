import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type FooterButtonProp = {
    name : string,
    path : string
}
const FooterButton = ({name ,path } : FooterButtonProp) => {
  return (
    <div className='w-full'>
        <Button className='w-full bg-pink-500 hover:bg-pink-700' >
            <Link href={path}>
                {name}
            </Link>
        </Button>
    </div>
  )
}

export default FooterButton