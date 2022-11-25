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
    // dataRightDrawer: {}, //点击Cell后，右侧抽屉表单展示当前Cell数据
    curCell: {}, //当前cell的引用
    showNodeMoreInfo: true, //显示结点详情
  }

  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      grid: true,
      // resizing: true,
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
      if (cell.label.slice(0, 5) === "Input") {
        this.setState({ open: true, curCell: cell }) // 打开抽屉，并把当前cell的引用传过去
      }
    })

    //添加cell时，显示结点详情
    this.graph.on('node:added', ({ e, x, y, cell, view }) => {
      this.showNodeMoreInfo(cell)
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

  //设置抽屉数据：根据cell的引用地址，直接修改cell的值，就会导致当前cell的重新渲染
  setCurCellData = (key, value) => {
    const CurCellRef = this.state.curCell
    CurCellRef.data[key] = value
    this.showNodeMoreInfo(CurCellRef) 
  }

  // 复选框——显示结点详情
  changeNodeMoreInfo = (e) => {
    this.setState({
      showNodeMoreInfo: !this.state.showNodeMoreInfo
    }, () => {
      // 遍历每个结点
      const cells = this.graph.getCells()
      // cells.forEach(cell => { cell.visible = !this.state.showNodeMoreInfo })
      cells.forEach(cell => {
        this.showNodeMoreInfo(cell)
      })
    })
  }

  // 根据cell的引用直接修改cell的值，并自动重新渲染
  showNodeMoreInfo(cell) {
    if (this.state.showNodeMoreInfo) {
      console.log(111)
      let label = cell.data.Text + "\n"
      let heightNew = 1
      let widthNew = label.length
      for (let key in cell.data) {
        if ("Text" === key)
          continue
        let line = "\n" + key + ": " + cell.data[key]
        label += line
        heightNew += 1
        widthNew = Math.max(widthNew, line.length)
      }
      cell.label = label
      cell.resize(widthNew * 10, 40 + heightNew * 12)
    }
    else {
      console.log(222)
      cell.label = cell.data.Text
      cell.resize(cell.label.length * 10, 40)
    }
  }

  render() {
    return (
      <div>
        <input type="text" readOnly={true} value={this.state.showNodeMoreInfo} />
        <input type="checkbox" defaultChecked={this.state.showNodeMoreInfo} onClick={this.changeNodeMoreInfo} />显示结点详情
        <RightDrawer
          open={this.state.open} setOpen={this.setOpen}
          curCell={this.state.curCell} setCurCell={this.setCurCellData}
        />
        <div className="app">
          <div className="app-stencil" ref={this.refStencil} />
          <div className="app-content" ref={this.refContainer} />
        </div>
      </div>
    )
  }


}