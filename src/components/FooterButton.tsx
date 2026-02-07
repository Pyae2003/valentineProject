import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type FooterButtonProp = {
    name : string,
    path : string
}
const FooterButton = ({name ,path } : FooterButtonProp) => {
  return (
    <div>
        <Button>
            <Link href={path}>
                {name}
            </Link>
        </Button>
    </div>
  )
}

export default FooterButton