import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

interface VideoAndImageFrameWrapperSampleProp {
    title : string,
    description : string,
    children : React.ReactNode,
    Footer? : React.ReactNode
}

const VideoAndImageFrameWrapperSimple = ({title,description,children,Footer} : VideoAndImageFrameWrapperSampleProp) => {
  return (
    <div>
        <Card className='w-70 shadow-2xl'>
            <CardHeader className='h-30'>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {Footer}
            </CardFooter>
        </Card>
    </div>
  )
}

export default VideoAndImageFrameWrapperSimple