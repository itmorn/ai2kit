import React from 'react';
import {
  Form,
  InputNumber,
} from 'antd';



const App = (props) => {
  const { curCell, setCurCell } = props

  if (curCell === "" || !curCell.attrs.data) {
    return ""
  }

  const showText = () => {
    return (
      <Form.Item label="Text">
        {curCell.attrs.data["Text"]}
      </Form.Item>
    )

  }

  const showElems = () => {
    const nnType = curCell.attrs.data["Text"]
    const keys = Object.keys(curCell.attrs.data);
    return keys.slice(1,keys.length).map((key, index) => {
      if (nnType.slice(0,5)==="Input") {
        return (
          <Form.Item label={key} key={index}>
            <InputNumber min={1} value={curCell.attrs.data[key]} defaultValue={1}
              onChange={(num) => {
                if (num === null) {
                  num = 1
                }
                setCurCell(key, num)
              }}
            />
          </Form.Item>
        )
      } 

    })
  }


  return (
    <Form >
      {showText()}
      {showElems()}
    </Form>
  );
};

export default App;