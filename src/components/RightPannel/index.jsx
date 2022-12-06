import React from 'react';
import {
  Image,
  InputNumber,
  Popover,
} from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import a001_Input1d from './imgs/a001_Input1d.png';
import a002_Input2d from './imgs/a002_Input2d.png';
import a003_Input3d from './imgs/a003_Input3d.png';
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
      if (nnType === "Input1d") {
        const content = (
          <div>
            <p>{key === "Channel" ? "输入张量的通道数" : "输入张量的长度"}</p>
            <Image src={a001_Input1d} width={300} /><br />
          </div>
        );
        return (
          <li className='item' key={index}>
            <>
              <Popover content={content} >
                <QuestionCircleOutlined style={{ color: "#a78a09" }} />
              </Popover>
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
      else if (nnType === "Input2d") {
        let a = ""
        if (key === "Channel") a = "输入张量的通道数"
        else if (key === "Height") a = "输入张量的高度"
        else if (key === "Width") a = "输入张量的宽度"
        const content = (
          <div>
            <p>{a}</p>
            <Image src={a002_Input2d} width={300} /><br />
          </div>
        );
        return (
          <li className='item' key={index}>
            <>
              <Popover content={content} >
                <QuestionCircleOutlined style={{ color: "#a78a09" }} />
              </Popover>

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
      else if (nnType === "Input3d") {
        let a = ""
        if (key === "Channel") a = "输入张量的通道数"
        else if (key === "Depth") a = "输入张量的深度"
        else if (key === "Height") a = "输入张量的高度"
        else if (key === "Width") a = "输入张量的宽度"
        const content = (
          <div>
            <p>{a}</p>
            <Image src={a003_Input3d} width={300} /><br />
          </div>
        );
        return (
          <li className='item' key={index}>
            <>
              <Popover content={content} >
                <QuestionCircleOutlined style={{ color: "#a78a09" }} />
              </Popover>

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
      else if (nnType.slice(0, 4) === "Conv") {
        if (key === "kernel_size" && nnType === "Conv1d") {
          const content = (
            <div>
              <p>22222</p>
              <Image width={150} src={a001_Input1d} /><br />
              <p>33333</p>
            </div>
          );

          return (
            <li className='item' key={index}>
              <>
                <Popover content={content} >
                  <QuestionCircleOutlined style={{ color: "#a78a09" }} />
                </Popover>
                kernel_size:<br /><br />
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
        const content = (
          <div>
            <p>22222</p>
            <Image width={150} src={a001_Input1d} /><br />
            <p>33333</p>
          </div>
        );

        return (
          <li className='item' key={index}>
            <>
              <Popover content={content} >
                <QuestionCircleOutlined style={{ color: "#a78a09" }} />
              </Popover>
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