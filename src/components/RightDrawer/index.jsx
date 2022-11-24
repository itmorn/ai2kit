import { useEffect } from 'react'
import { Col, Drawer, Form, Input, Row } from 'antd';

let numShouldGreater0=1;
const App = (props) => {
  const [form] = Form.useForm()
  const { open, setOpen, dataRightDrawer, setDataRightDrawer } = props
  
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form])

  const onClose = () => {
    if (numShouldGreater0<=0){
      alert('该值应该大于0')
      return
    }
    setOpen(false);
  }
  const showElems = () => {
    const { Text } = dataRightDrawer
    if (Text.includes("Input")) {//输入标签
      const { Channel, Length, Height, Width, Dimension } = dataRightDrawer
      let ChannelView =
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Channel"
              initialValue={Channel}
              label="Channel"
              rules={[
                {
                  required: true,
                  message: 'Please enter Channel',
                },
              ]}
            >
              <Input type="number" placeholder="Please enter Channel"
                onChange={(e) => { 
                  numShouldGreater0=e.target.value
                  setDataRightDrawer("Channel",numShouldGreater0*1) 
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      let LengthView =
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Length"
              initialValue={Length}
              label="Length"
              rules={[
                {
                  required: true,
                  message: 'Please enter Length',
                },
              ]}
            >
              <Input placeholder="Please enter Length"
                onChange={(e) => { 
                  numShouldGreater0=e.target.value
                  setDataRightDrawer("Length",numShouldGreater0*1) 
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      let HeightView =
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Height"
              initialValue={Height}
              label="Height"
              rules={[
                {
                  required: true,
                  message: 'Please enter Height',
                },
              ]}
            >
              <Input placeholder="Please enter Height"
                onChange={(e) => { 
                  numShouldGreater0=e.target.value
                  setDataRightDrawer("Height",numShouldGreater0*1) 
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Width"
              initialValue={Width}
              label="Width"
              rules={[
                {
                  required: true,
                  message: 'Please enter Width',
                },
              ]}
            >
              <Input placeholder="Please enter Width"
                onChange={(e) => { setDataRightDrawer("Width", e.target.value * 1) }}
              />
            </Form.Item>
          </Col>
        </Row>
      let DimensionView =
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Dimension"
              initialValue={Dimension}
              label="Dimension"
              rules={[
                {
                  required: true,
                  message: 'Please enter Dimension',
                },
              ]}
            >
              <Input placeholder="Please enter Dimension"
                onChange={(e) => { 
                  numShouldGreater0=e.target.value
                  setDataRightDrawer("Dimension",numShouldGreater0*1) 
                }}
              />
            </Form.Item>
          </Col>
        </Row>

      if (Text === "Input1d")
        return (
          <>
            {ChannelView}
            {LengthView}
          </>
        )
      else if (Text === "Input2d")
        return (
          <>
            {ChannelView}
            {HeightView}
          </>
        )
      else if (Text === "Input3d")
        return (
          <>
            {ChannelView}
            {HeightView}
            {DimensionView}
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
        <Form layout="vertical" hideRequiredMark form={form}>
          {showElems}
          {/* {open?showElems:''} */}
        </Form>
      </Drawer>
    </>
  );
};
export default App;