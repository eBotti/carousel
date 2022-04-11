import React, { useEffect } from 'react';
import {FC} from 'react';
import Carousel from './carousel/Carousel';
import './App.css'
const App: FC = (): JSX.Element => {
  const data=[
    {title: '华为2022年度报告', discription: '-> 敬请期待', url: require('./img/1.jpg').default},
    {discription: '', url: require('./img/2.jpg').default},
    {discription: '', url: require('./img/3.jpg').default},
  ]
  const renderData: React.ReactNodeArray=[]
  data.map((item,index)=>{
    renderData.push(
      <div className='content'>
        <div>
          <h1>{item.title}</h1>
          <p>{item.discription}</p>
        </div>
        <img style={{height: '100%'}} src={item.url} alt="图片1" /> 
      </div>
    )
  })
  
  // renderData.push(<img style={{height: '100%'}} src={require('./img/2.jpg').default} alt="图片2" />)
  // renderData.push(<img style={{height: '100%'}} src={require('./img/3.jpg').default} alt="图片3" />)
  return <div className='container'>
    {/* <ShowCase/> */}
    <p>DEMO:</p>
    <Carousel children={renderData} duration={3} />
  </div>
}

export default App;
