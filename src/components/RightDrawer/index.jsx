// import  { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';//Select,
// const { Option } = Select;
const App = (props) => {
  // const [dataForm, setdataForm] = useState({});
  const { open, setOpen, dataRightDrawer, setDataRightDrawer } = props
  // setdataForm(dataRightDrawer)
  // const showDrawer = () => {
  //   setOpen(true);
  // };
  const onClose = () => {
    setOpen(false);
    // setDataRightDrawer({ "a": 2 })
  };

  const showElems = () => {
    const { text } = dataRightDrawer
    if (text.includes("Input1d")) { //输入标签
      return (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="channel"
                initialValue={3}
                label="channel"
                rules={[
                  {
                    required: true,
                    message: 'Please enter channel',
                  },
                ]}
              >
                <Input placeholder="Please enter channel"
                  onChange={(e) => { setDataRightDrawer("channel",e.target.value) }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Length"
                initialValue={512}
                label="Length"
                rules={[
                  {
                    required: true,
                    message: 'Please enter length',
                  },
                ]}
              >
                <Input placeholder="Please enter length" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )
    }

    // if text.slice(0, 5) === "Input":
    //   return

  }
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title="修改数据"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      // extra={
      //   <Space>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button onClick={onClose} type="primary">
      //       Submit
      //     </Button>
      //   </Space>
      // }
      >
        <Form layout="vertical" hideRequiredMark
        >
          {showElems}
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner',
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </Drawer>
    </>
  );
};
export default App;