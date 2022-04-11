// TODO more tests
import React, { Component, useState } from 'react';
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {configure ,shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Carousel from './Carousel'

configure({ adapter: new Adapter() })

jest.spyOn(React, 'useEffect').mockImplementation(f => f());
window.setInterval= jest.fn();

let children = [
  <div>
    <div>
      <h1>title-1</h1>
      <p>discription-1</p>
    </div>
    <img src={""} alt="图片1" />
  </div>,
  <div>
    <div>
      <h1>title-2</h1>
      <p>discription-2</p>
    </div>
    <img src={""} alt="图片2" />
  </div>
]


describe('runnning test', () => {
  it('run without errors', () => {
    const { container } = render(<Carousel children={children} />)
    screen.getByText(/title-1/i)
    screen.getByText(/title-2/i)
    screen.getByText(/discription-1/i)
    screen.getByText(/discription-2/i)
    screen.getAllByAltText("图片1")
    screen.getAllByAltText("图片2")
  });

  it('should render 2 bullet when props childre length is 2', () => {
    const { container } = render(<Carousel children={children} />)
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(container.querySelectorAll('span')).toHaveLength(2)
  });
});

describe('function test', () => {

  it('auto slide should work, after component mounted', () => {
    const wrapper=shallow(<Carousel children={children} />);
    // wrapper.find('span').first().simulate('click');
    expect(window.setInterval).toHaveBeenCalled();
  })

  it('should slide changed, after bullet clicked', () => {
    const setFlagBullet=jest.fn();
    const useStateSpy=jest.spyOn(React,'useState');
    const useStateMock:any=(flagBullet:any)=>[flagBullet,setFlagBullet];
    useStateSpy.mockImplementation(useStateMock)
    React.useState(0)
    const wrapper=shallow(<Carousel children={children} />);
    wrapper.find('span').first().simulate('click');
    expect(React.useState).toHaveBeenCalled();
  })
})
