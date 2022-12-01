import React from 'react';
import {
  Form,
  InputNumber,
} from 'antd';



const App = (props) => {
  const { curCell, setCurCell } = props

  if (curCell === "" || !curCell.data) {
    return ""
  }

  const showText = () => {
    const fields = ["Text"]
    const keys = Object.keys(curCell.data);
    return keys.map((key, index) => {
      if (fields.includes(key)) {
        return (
          <Form.Item label={key} key={index}>
            {curCell.data[key]}
          </Form.Item>
        )
      }
      return ""

    })
  }

  const showInput = () => {
    const keys = Object.keys(curCell.data);
    keys.pop("Text")
    return keys.map((key, index) => {
      return (
        <Form.Item label={key} key={index}>
          <InputNumber min={1} value={curCell.data[key]} defaultValue={1}
            onChange={(num) => {
              if (num === null) {
                num = 1
              }
              setCurCell(key, num)
            }}
          />
        </Form.Item>
      )
    })
  }

  return (
    <Form >
      {showText()}
      {showInput()}
    </Form>
  );
};

export default App;