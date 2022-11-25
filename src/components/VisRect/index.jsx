import React from 'react'
import { Graph, Addon } from '@antv/x6'
import './index.css'
import { Conv, ConvTranspose } from './blocks/conv'
import { Input1d, Input2d, Input3d } from './blocks/input'
import { MaxPool } from './blocks/pool'
import RightDrawer from "../RightDrawer"

const { Stencil } = Addon
export default class VisRect extends React.Component {
  state = {
    open: false, //右侧抽屉是否打开
    dataRightDrawer: {}, //点击Cell后，右侧抽屉表单展示当前Cell数据
    showNodeMoreInfo: true, //显示结点详情
  }

  curCell = "" //当前所操作的Cell的引用

  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      grid: true,
      snapline: {
        enabled: true,
        sharp: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
    })

    //点cell 打开右侧抽屉
    this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
      this.curCell = cell //将当前Cell的引用 保存到 curCell
      if (cell.label.slice(0, 5) === "Input") {
        this.setState({ open: true, dataRightDrawer: cell.data }, () => {
        })
      }
    })

    this.graph.centerContent()

    const stencil = new Stencil({
      title: '基础模块',
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1
      },
      placeholder: '根据名称搜索',
      notFoundText: '没有找到',
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 280,
      groups: [
        { name: 'Input', title: '输入', graphHeight: 120, layoutOptions: { columns: 2, marginX: 10, center: false, rowHeight: 50 } },
        { name: 'Conv', title: '卷积层', graphHeight: 120, layoutOptions: { columns: 1, marginX: 20, center: true, rowHeight: 50 } },
        { name: 'Pool', title: '池化层', graphHeight: 60, layoutOptions: { columns: 1, marginX: 20, center: true, rowHeight: 50 } },
      ],
    })

    this.stencilContainer.appendChild(stencil.container)

    stencil.load([Input1d, Input2d, Input3d], 'Input')
    stencil.load([Conv, ConvTranspose], 'Conv')
    stencil.load([MaxPool], 'Pool')
  }
  refContainer = (container) => {
    this.container = container
  }

  refStencil = (container) => {
    this.stencilContainer = container
  }

  // 展开/关闭 抽屉
  setOpen = (newState) => {
    this.setState({
      open: newState
    })
  }
  //设置抽屉数据，并更新到cell上
  setDataRightDrawer = (key, value) => {
    const { dataRightDrawer } = this.state;
    dataRightDrawer[key] = value

    this.setState({
      dataRightDrawer: { ...dataRightDrawer }
    }, () => {
      this.curCell.data = this.state.dataRightDrawer
    })
  }

  // 复选框——显示结点详情
  showNodeMoreInfo = (e) => {
    // 遍历每个结点
    console.log(111, e.target, this.graph.getCells());
    const cells = this.graph.getCells()
    cells.forEach(cell => { cell.visible = !this.state.showNodeMoreInfo })


    this.setState({
      showNodeMoreInfo: !this.state.showNodeMoreInfo
    })

  }

  render() {
    return (
      <div>
        <input type="text" readOnly={true} value={this.state.showNodeMoreInfo} />
        <input type="checkbox" defaultChecked={this.state.showNodeMoreInfo} onClick={this.showNodeMoreInfo} />显示结点详情
        <RightDrawer
          open={this.state.open} setOpen={this.setOpen}
          dataRightDrawer={this.state.dataRightDrawer} setDataRightDrawer={this.setDataRightDrawer}
        />
        <div className="app">
          <div className="app-stencil" ref={this.refStencil} />
          <div className="app-content" ref={this.refContainer} />
        </div>
      </div>
    )
  }


}