import React, { ReactNodeArray, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Carousel.css'

interface Props{
  children: ReactNodeArray ;
  duration?: number;
}

export default function Carousel({children,duration=3}: Props) {
  const timer=useRef<any>()
  const [flagBullet, setFlagBullet]=useState<number>(0)

  useEffect(()=>{
    var style=document.createElement('style');
    style.innerHTML=`.bullet-active::before{transition: width ${duration}s;}`;
    document.head.appendChild(style);
    timer.current=setInterval(()=>{
      setFlagBullet(flag=>flag+1>2?0:flag+1)
    },duration*1000)
  },[])

  useEffect(()=>{
    document.getElementsByClassName("swiper-slides")[0].setAttribute("style",`transform: translate(${flagBullet*-100}vw,0)`)
  },[flagBullet])

  useLayoutEffect(()=>{
    return ()=>{
      if (timer.current) {
        clearInterval(timer.current)
        timer.current=null
      }
    }
  },[])

  const onSlide=useCallback((index: number)=>{
    if (timer.current) {
      clearInterval(timer.current)
      timer.current=null
    }
    setFlagBullet(index)
  },[children, duration])

  return (
    <div className="container">
      <div className="swiper-wrapper">
        <ul className='swiper-slides'>
          {
            children.map((ele,index)=>(
              <li key={index}>
                {ele}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="swiper-pagination">
        {
          children.map((ele,index)=>(
            <span key={index} className={flagBullet==index?"bullet-active":''} onClick={()=>onSlide(index)} data-char="4"></span>
          ))
        }
      </div>
    </div>
  )
}
