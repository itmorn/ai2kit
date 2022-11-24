import { useEffect } from 'react'
import { Col, Drawer, Form, Input, Row } from 'antd';


const App = (props) => {
  const [form] = Form.useForm()
  const { open, setOpen, dataRightDrawer, setDataRightDrawer } = props


  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form])

  const onClose = (e) => {
    setOpen(false);
  }

  const showElems = () => {
    const { Text } = dataRightDrawer
    if (Text.includes("Input")) {//输入标签
      const { Channel, Length, Height, Width, Dimension } = dataRightDrawer

      let ChannelView = ""; let LengthView = ""; let HeightView = ""; let DimensionView = "";
      if (Channel) {
        ChannelView =
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
                <Input placeholder="Please enter Channel"
                  onChange={(e) => { setDataRightDrawer("Channel", e.target.value * 1) }}
                />
              </Form.Item>
            </Col>
          </Row>
      }
      if (Length) {
        LengthView =
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
                  onChange={(e) => { setDataRightDrawer("Length", e.target.value * 1) }}
                />
              </Form.Item>
            </Col>
          </Row>
      }
      if (Height) {
        HeightView =
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
                  onChange={(e) => { setDataRightDrawer("Height", e.target.value * 1) }}
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
      }
      if (Dimension) {
        DimensionView =
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
                  onChange={(e) => { setDataRightDrawer("Dimension", e.target.value * 1) }}
                />
              </Form.Item>
            </Col>
          </Row>
      }

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