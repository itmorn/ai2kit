import React from 'react';
import {
  Image,
  InputNumber,
} from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import imgURL from './imgs/conv1d-1.png';
import './index.css'




const App = (props) => {
  const { curCell, setCurCell } = props

  if (curCell === "" || !curCell.attrs.data) {
    return ""
  }

  const showText = () => {
    return (
      <>
        <font color="red"><b>{curCell.attrs.data["Text"]}</b></font>
        <br />
        <nobr>====================</nobr>
        <br />
      </>
    )
  }

  const showElems = () => {
    const nnType = curCell.attrs.data["Text"]
    const keys = Object.keys(curCell.attrs.data);
    return keys.slice(1, keys.length).map((key, index) => {
      if (nnType.slice(0, 5) === "Input") {
        if (key === "Channel") {
          return (
            // <li style={{listStyleType:"none"}} key={index}>
            <li className='item' key={index}>
              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title="输入张量的通道数" />
                {key + " (int):"}
                <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li >

          )
        }
        if (nnType === "Input1d") {
          return (
            <li className='item' key={index}>
              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title="输入张量的长度" />
                {key + " (int):"}
                <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li>
          )
        }
        if (["Height", "Width"].includes(key)) {
          return (
            <li className='item' key={index}>

              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title={"输入张量的" + (key === "Height" ? "高度" : "宽度")} />
                {key + " (int):"}
                <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li>
          )
        }
        if (nnType === "Input2d") {
          return (
            <li className='item' key={index}>
              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title="输入张量的长度" />
                {key + " (int):"}
                <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li>
          )
        }
        if (nnType === "Input3d") {
          return (
            <li className='item' key={index}>
              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title="输入张量的深度，也可以理解为时间步数" />
                {key + " (int):"}
                <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li>
          )
        }
      }
      else if (nnType.slice(0, 4) === "Conv") {
        if (key === "kernel_size" && nnType === "Conv1d") {
          return (
            <li className='item' key={index}>
              <>
                <QuestionCircleOutlined style={{ color: "#a78a09" }}
                  title="卷积核的长度" />
                kernel_size (int):<br />
                <Image width={150} src={imgURL} /><br />
                length (int):= <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                  onChange={(num) => {
                    if (num === null) {
                      num = 1
                    }
                    setCurCell(key, num)
                  }} />
                <hr />
              </>
            </li>
          )
        }
        return (
          <li className='item' key={index}>
            <>
              {key} (int):

              <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
                onChange={(num) => {
                  if (num === null) {
                    num = 1
                  }
                  setCurCell(key, num)
                }}
              />
              <br />
              <hr />
            </>
          </li>
        )
      }
      return ""

    })
  }


  return (

    <form >
      {showText()}
      {showElems()}

    </form>
  );
};

export default App;