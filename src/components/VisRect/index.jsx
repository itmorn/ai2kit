import React from 'react'
import { Graph, Addon } from '@antv/x6'
import { Button } from 'antd'
import './index.css'
import { Conv, ConvTranspose } from './blocks/conv'
import { Input1d, Input2d, Input3d } from './blocks/input'
import { MaxPool } from './blocks/pool'
import RightPannel from "../RightPannel"

// useEffect(() => {
//   window.addEventListener('keydown', onKeyDown); // 添加全局事件
//   return () => {
//     window.removeEventListener('keydown', onKeyDown); // 销毁
//   };
// }, []);


const { Stencil } = Addon

export default class VisRect extends React.Component {
  
  state = {
    curCell: "", //当前cell的引用
    showNodeMoreInfo: true, //显示结点详情
    canRedo: false,
    canUndo: false,
  }
  flagNewCell = "" //指向选取非空，按住ctrl所点击的 未选择的节点
  flagMouseEnter = "" //鼠标在元素上
  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      // autoResize: true,
      width: 1510,
      // height:2000,
      grid: true,
      // resizing: true,
      selecting: {
        enabled: true,
        rubberband: true, // 启用框选
        showNodeSelectionBox: true,
        multiple: true,
        strict: true,
        multipleSelectionModifiers: ['123'],
        // modifiers: 'none',
        pointerEvents: 'none',
        // movable: false
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        // pannable: true,
      },
      minimap: {
        enabled: true,
        container: this.minimapContainer,
      },
      history: true,
    })

    this.graph.on('cell:mouseenter', ({ e, x, y }) => {
      this.flagMouseEnter = true
      console.log("cell:mouseenter", this.flagMouseEnter)
    })

    this.graph.on('cell:mouseleave', ({ e, x, y }) => {
      this.flagMouseEnter = false
      console.log("cell:mouseleave", this.flagMouseEnter)
    })

    this.graph.on('cell:mousedown', ({ e, x, y, cell, view }) => {
      // 1.选区为空时：
      //    1.1.按住ctrl
      //      1.1.1. mousedown 没选中的结点 => 选中
      //    1.2.没按住ctrl
      //      1.2.1. mousedown 没选中的结点 => 选中
      //  1.1.mousedown 没选中的结点 => ①选中  ②选中(ctrl)
      // 2.选区不为空时：
      //    2.1.按住ctrl
      //      2.1.1. mousedown 没选中的结点 => 添加选中，隐藏面板
      //      2.1.2. mousedown 选中的结点 => 不变，交给click剔除掉选中的结点(ctrl)
      //    2.2.没按住ctrl
      //      2.2.1. mousedown 没选中的结点 => 选区清空，再选中
      //      2.2.2. mousedown 选中的结点 => 不变

      // 1.选区为空时：
      if (this.graph.getSelectedCells().length === 0) {
        // 1.选区为空时： 1.1.按住ctrl  1.1.1. mousedown 没选中的结点 => 选中
        if (e.ctrlKey) {
          this.graph.select(cell)
          this.setState({ curCell: cell })
          this.flagNewCell = cell
        }
        // 1.选区为空时： 1.2.没按住ctrl   1.2.1. mousedown 没选中的结点 => 选中
        else {
          this.graph.select(cell)
          this.setState({ curCell: cell })
        }
      }
      // 2.选区不为空时：
      else {
        // 2.选区不为空时：2.1.按住ctrl
        if (e.ctrlKey) {
          // 2.选区不为空时：2.1.按住ctrl 2.1.1. mousedown 没选中的结点 => 添加选中，隐藏面板
          if (!this.graph.isSelected(cell)) {
            this.flagNewCell = cell
            console.log(11, this.flagNewCell)
            this.graph.select(cell)
            this.setState({ curCell: "" })
            this.graph.disableSelection()
            console.log("disableSelection")
          }
          // 2.选区不为空时：2.1.按住ctrl 2.1.2. mousedown 选中的结点 => 不变，交给click剔除掉选中的结点(ctrl)
          else {
            this.graph.disableSelection()
            console.log("disableSelection")
          }
        }
        // 2.选区不为空时： 2.2.没按住ctrl
        else {
          // 2.选区不为空时： 2.2.没按住ctrl 2.2.1. mousedown 没选中的结点 => 选区清空，再选中
          if (!this.graph.isSelected(cell)) {
            this.graph.cleanSelection()
            this.graph.select(cell)
            this.setState({ curCell: cell })
          }
          // 2.选区不为空时： 2.2.没按住ctrl 2.2.2. mousedown 选中的结点 => 不变
          else {
          }
        }
      }
    })

    this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
      // 不按ctrl return
      if (!e.ctrlKey) return
      // 按着ctrl 选区只有一个新结点 return
      // if (this.graph.getSelectedCells().length === 1) return

      // 选区不空，按住ctrl 还要增加新节点  解释：按下时就已经增加上了
      this.graph.enableSelection()
      console.log("enableSelection")

      // 选区不空，按住ctrl 点击剔除已选择的结点  ！！！特别注意！！！：在mousedown之后，该cell会变为选中状态
      if (this.graph.isSelected(cell) & !this.flagNewCell) {//!this.flagNewCell 表示老结点
        this.graph.unselect(cell)
      }
      this.flagNewCell = ""

      if (this.graph.getSelectedCells().length === 1) {
        this.setState({ curCell: this.graph.getSelectedCells()[0] })
      } else {
        this.setState({ curCell: "" })
      }

    }
    )

    this.graph.on('cell:mouseup', ({ e, x, y, cell, view }) => {
      this.graph.enableSelection()
    })

    this.graph.on('blank:mousedown', () => {//点击画布时，curCell引用指向空
      this.setState({
        curCell: ""
      })
    })

    this.graph.on('blank:mouseup', ({ e, x, y, cell, view }) => {
      this.graph.enableSelection()
      if (this.graph.getSelectedCells().length === 1) {//如果框选了一个，则展示面板
        console.log(this.graph.getSelectedCells()[0])
        this.setState({ curCell: this.graph.getSelectedCells()[0] }, () => {
          console.log("enter blank:mouseup1", this.graph.getSelectedCells())
        })
      }
      console.log("enter blank:mouseup2", this.graph.getSelectedCells())
    })

    //添加cell时，显示结点详情
    this.graph.on('node:added', ({ e, x, y, cell, view }) => {
      this.graph.cleanSelection()
      this.graph.select(cell)
      this.setState({ curCell: cell })
      this.showNodeMoreInfo(cell)
    })

    this.history = this.graph.history
    this.history.on('change', () => {
      this.setState({
        canRedo: this.history.canRedo(),
        canUndo: this.history.canUndo(),
      })
    })

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
  refMiniMapContainer = (container) => {
    this.minimapContainer = container
  }

  //设置右面板数据：根据cell的引用地址，直接修改cell的值，就会导致当前cell的重新渲染
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
      let label = cell.data.Text
      let heightNew = 0
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
      cell.label = cell.data.Text
      cell.resize(cell.label.length * 10, 40)
    }
  }


  onUndo = () => {
    this.history.undo()
  }

  onRedo = () => {
    this.history.redo()
  }


  render() {
    return (
      <div >
        <div style={{ "display": "flex" }}>
          <input type="checkbox" defaultChecked={this.state.showNodeMoreInfo} onClick={this.changeNodeMoreInfo} />显示结点详情
          &nbsp;&nbsp;
          <div className="app-btns">
            <Button.Group>
              <Button onClick={this.onUndo} disabled={!this.state.canUndo}>
                Undo
              </Button>
              <Button onClick={this.onRedo} disabled={!this.state.canRedo}>
                Redo
              </Button>
            </Button.Group>
          </div>
        </div>
        <div className="app">
          <div className="app-stencil" ref={this.refStencil} />

          <div className="app-content" ref={this.refContainer}  />

          <div ref={this.refMiniMapContainer} style={{ position: "absolute", left: 1400, bottom: -150 }} />
          <div style={{ alignItems: "center" }} width={100}>
            <RightPannel
              curCell={this.state.curCell} setCurCell={this.setCurCellData}
            />
          </div>
        </div>
      </div>
    )
  }


}