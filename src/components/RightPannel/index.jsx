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
import a004_Conv1d_part1 from './imgs/a004_Conv1d_part1.png';
import a005_Conv1d_stride from './imgs/a005_Conv1d_stride.png';
import a006_Conv1d_padding from './imgs/a006_Conv1d_padding.png';
import a007_Conv1d_dilation from './imgs/a007_Conv1d_dilation.png';
import a008_Conv1d_groups from './imgs/a008_Conv1d_groups.png';
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
      } else if (nnType === "Input2d") {
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

      } else if (nnType === "Input3d") {
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

      } else if (nnType === "Conv1d") {
        let content = ""
        let b = ""
        if (key === "in_channels") {
          content = (
            <div>
              <p>输入张量的通道数</p>
              <Image src={a004_Conv1d_part1} width={300} /><br />
            </div>
          )
        } else if (key === "out_channels") {
          content = (
            <div>
              <p>输出张量的通道数</p>
              <Image src={a004_Conv1d_part1} width={300} /><br />
            </div>
          )
        } else if (key === "kernel_size") {
          content = (
            <div>
              <p>卷积核的尺寸（Conv1d中只有Length）</p>
              <Image src={a004_Conv1d_part1} width={300} /><br />
            </div>
          );
          b = (
            <>
              <br />
              Length:
            </>
          )
        } else if (key === "stride") {
          content = (
            <div>
              <p>卷积核每次滑动的步长</p>
              <Image src={a005_Conv1d_stride} width={300} /><br />
            </div>
          );
        } else if (key === "padding") {
          content = (
            <div>
              <p>给input两边做填充</p>
              <Image src={a006_Conv1d_padding} width={300} /><br />
            </div>
          );
        } else if (key === "dilation") {
          content = (
            <div>
              <p>卷积核元素之间的间隔</p>
              <Image src={a007_Conv1d_dilation} width={300} /><br />
            </div>
          );
        } else if (key === "groups") {
          content = (
            <div>
              <p>
                将input分块（在特征维度上切分），每一块为一组，对每一组进行卷积，然后concat。<br />
                在AlexNet的年代，由于显存限制，无法将数据全部载入进行运算，因此其中就使用了分组卷积。"
              </p>
              <Image src={a008_Conv1d_groups} width={300} /><br />
            </div>
          );
        }

        return (
          <li className='item' key={index}>
            <>
              <Popover content={content} >
                <QuestionCircleOutlined style={{ color: "#a78a09" }} />
              </Popover>

              {key + " (int):"}
              {b}
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