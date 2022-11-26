import React from 'react';
import {
  Form,
  InputNumber,
} from 'antd';



const App = (props) => {
  const { curCell, setCurCell } = props

  if (curCell === "") {
    return ""
  }

  const showElems = () => {
    const keys = Object.keys(curCell.data);
    keys.pop("Text")
    return keys.map((key, index) => {
      return (
        <Form.Item label={key} key={index}>
          <InputNumber min={1} value={curCell.data[key]}
            onChange={(num) => {
              setCurCell(key, num)
            }}
          />
        </Form.Item>
      )
    })


  }
  return (
    <Form >
      {showElems()}
    </Form>
  );
};

export default App;