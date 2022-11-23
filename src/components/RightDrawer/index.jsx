import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';//Select,
const App = (props) => {
  const { open, setOpen, dataRightDrawer, setDataRightDrawer } = props
  const onClose = () => {
    setOpen(false);
  };

  const showElems = () => {
    const { text } = dataRightDrawer
    if (text.includes("Input1d")) { //输入标签
      const { length } = dataRightDrawer
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
                  onChange={(e) => { setDataRightDrawer("channel",e.target.value*1) }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="length"
                initialValue={length}
                label="length"
                rules={[
                  {
                    required: true,
                    message: 'Please enter length',
                  },
                ]}
              >
                <Input placeholder="Please enter length" 
                onChange={(e) => { setDataRightDrawer("length",e.target.value*1) }}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )
    }

  }
  return (
    <>
      <Drawer
        title="修改数据"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          {showElems}
        </Form>
      </Drawer>
    </>
  );
};
export default App;