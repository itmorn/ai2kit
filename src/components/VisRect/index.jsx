import React from 'react'
import { Graph, Addon } from '@antv/x6'
// import { Button } from 'antd'
import './index.css'
import { Conv, ConvTranspose } from './blocks/conv'
import { Input1d, Input2d, Input3d } from './blocks/input'
import { MaxPool } from './blocks/pool'
import RightPannel from "../RightPannel"

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
    this.addToHistory = true
    this.graph = new Graph({
      container: this.container,
      // autoResize: true,
      width: 1510,
      // height:2000,
      grid: true,
      // resizing: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
        global: true,
      },
      selecting: {
        enabled: true,
        rubberband: true, // 启用框选
        rubberEdge: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        multiple: true,
        strict: true,
        multipleSelectionModifiers: ['123'],
        pointerEvents: 'none',
      },
      connecting: {
        snap: true,
        allowBlank: true,//是否允许连接到画布空白位置的点，默认为 true。
        allowLoop: false,//是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true。
        sourceAnchor: 'center',
        targetAnchor: 'center', // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
        highlight: true,
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl'],
        minScale: 0.1,
        maxScale: 2
      },
      history: {
        enabled: true,
      },
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

    // cell// cell// cell// cell// cell// cell// cell// cell// cell// cell// cell// cell// cell
    this.graph.on('node:added', ({ e, x, y, cell, view }) => {
      this.graph.cleanSelection()
      this.graph.select(cell)
      this.setState({ curCell: cell })
      this.showNodeMoreInfo(cell)
    })

    this.graph.on('node:mouseenter', ({ e, node, view }) => {
      this.flagMouseEnter = true

      let undoStack = JSON.parse(JSON.stringify(this.graph.history.undoStack))
      // 添加连接桩
      if (node.getPorts().length === 0) {
        node.addPorts([{ group: 'group1' }, { group: 'group1' }, { group: 'group1' }, { group: 'group1' }])
      }
      this.graph.history.undoStack = undoStack
    })

    this.graph.on('node:mouseleave', ({ e, node, view }) => {
      // console.log("node:mouseleave")
      this.flagMouseEnter = false
      let undoStack = JSON.parse(JSON.stringify(this.graph.history.undoStack))
      // 遍历和该node相连的边，将源的port删除
      let connectedEdges = this.graph.getConnectedEdges(node)
      for (let index = 0; index < connectedEdges.length; index++) {
        const element = connectedEdges[index];
        if ("port" in Object(element.source)) {
          element.source = { "cell": element.source["cell"] }
        }
      }

      node.removePorts() //移除连接桩
      this.graph.history.undoStack = undoStack

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

    })

    this.graph.on('cell:mouseup', ({ e, x, y, cell, view }) => {
      this.graph.enableSelection()
    })

    this.graph.on('cell:contextmenu', ({ cell }) => {//右键删除cell
      this.graph.removeCell(cell)
    })

    //edge //edge //edge //edge //edge //edge //edge //edge //edge 
    this.graph.on('edge:mouseenter', ({ cell }) => { //边高亮
      let undoStack = JSON.parse(JSON.stringify(this.graph.history.undoStack))
      cell.addTools([
        'source-arrowhead',
        {
          name: 'target-arrowhead',
          args: {
            attrs: {
              fill: 'red',
            },
          },
        },
      ])
      this.graph.history.undoStack = undoStack
    })

    this.graph.on('edge:mouseleave', ({ cell }) => {//边取消高亮
      let undoStack = JSON.parse(JSON.stringify(this.graph.history.undoStack))
      cell.removeTools()
      this.graph.history.undoStack = undoStack
    })

    //blank //blank //blank //blank //blank //blank //blank //blank //blank //blank //blank 
    this.graph.on('blank:mousedown', () => {//点击画布时，curCell引用指向空
      this.setState({
        curCell: ""
      })
    })

    this.graph.on('blank:mouseup', ({ e, x, y, cell, view }) => {
      this.graph.enableSelection()
      if (this.graph.getSelectedCells().length === 1) {//如果框选了一个，则展示面板
        this.setState({ curCell: this.graph.getSelectedCells()[0] }, () => {
        })
      }
    })

    this.graph.history.on('change', () => {
      this.setState({
        canRedo: this.graph.history.canRedo(),
        canUndo: this.graph.history.canUndo(),
      })
    })

    // this.graph.history.on('undo', (cmds,options) => { 
    //   console.log('undo')
    //   // code here
    // })
    this.graph.history.on('add', (cmds, options) => {

      // console.log(cmds)
      // console.log(this.graph.history.undoStack)
      // console.log(options)
      // code here
    })

    this.graph.bindKey('ctrl+z', () => {
      this.graph.history.undo()
    })
    this.graph.bindKey('ctrl+y', () => {
      this.graph.history.redo()
    })

    this.graph.bindKey('ctrl+c', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
    })

    this.graph.bindKey('ctrl+v', () => {
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 })
        this.graph.cleanSelection()
        this.graph.select(cells)
      }
    })

    this.graph.bindKey(['delete', 'backspace'], () => {
      let cells = this.graph.getSelectedCells()
      if (cells.length > 0) {
        this.graph.removeCells(cells, { disconnectEdges: true })
        this.graph.cleanSelection()
      }
      this.setState({ curCell: "" })
    })

    this.graph.bindKey('p', () => {
      // console.log(this.graph.getCells())
      console.log(this.graph.history.undoStack)
      console.log(this.graph.history.redoStack)
      // console.log(this.graph.getSelectedCells())
    })

    this.graph.bindKey('shift', () => {
      this.graph.enablePanning()
      this.graph.disableSelection()
    }, 'keypress')

    this.graph.bindKey('shift', () => {
      this.graph.disablePanning()
      this.graph.enableSelection()
    }, 'keyup')
  }


  refContainer = (container) => {
    this.container = container
  }

  refStencil = (container) => {
    this.stencilContainer = container
  }

  //设置右面板数据：根据cell的引用地址，直接修改cell的值，就会导致当前cell的重新渲染
  setCurCellData = (key, value) => {
    const CurCellRef = this.state.curCell
    let valuePrev = CurCellRef.attrs.data[key]
    CurCellRef.attrs.data[key] = value
    this.showNodeMoreInfo(CurCellRef, "changeNodeData", key, valuePrev)
  }

  // 复选框——显示结点详情
  changeNodeMoreInfo = (e) => {
    let undoStack = JSON.parse(JSON.stringify(this.graph.history.undoStack))
    this.setState({
      showNodeMoreInfo: !this.state.showNodeMoreInfo
    }, () => {
      const cells = this.graph.getCells()
      cells.forEach(cell => {
        this.showNodeMoreInfo(cell)
      })
      this.graph.history.undoStack = undoStack
    })
  }

  // 根据cell的引用直接修改cell的值，并自动重新渲染
  showNodeMoreInfo(cell, changeHistoryCase = "", ...args) {
    if (this.state.showNodeMoreInfo) {
      let label = cell.attrs.data.Text
      let heightNew = 0
      let widthNew = label.length
      for (let key in cell.attrs.data) {
        if ("Text" === key)
          continue
        let line = "\n" + key + ": " + cell.attrs.data[key]
        label += line
        heightNew += 1
        widthNew = Math.max(widthNew, line.length)
      }
      this.graph.startBatch()
      cell.label = label
      cell.resize(widthNew * 10, 40 + heightNew * 12)
      this.graph.stopBatch()
      // let a = this.graph.history.undoStack[-1][0]
    }
    else {
      this.graph.startBatch()
      cell.label = cell.attrs.data.Text
      cell.resize(cell.label.length * 10, 40)
      this.graph.stopBatch()
    }

    // 根据情况对历史记录中的prev进行修正
    switch (changeHistoryCase) {
      case "changeNodeData":
        console.log(args)
        let key = args[0]
        let valuePrev = args[1]

        console.log(11111, key, valuePrev)
        this.graph.history.undoStack.at(-1).at(0).data.prev.attrs.data[key] = valuePrev
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <div style={{ "display": "flex" }}>
          <input type="checkbox" defaultChecked={this.state.showNodeMoreInfo} onClick={this.changeNodeMoreInfo} />显示结点详情
          &nbsp;&nbsp;
          {/* <div className="app-btns">
            <Button.Group>
              <Button onClick={this.onUndo} disabled={!this.state.canUndo}>
                Undo
              </Button>
              <Button onClick={this.onRedo} disabled={!this.state.canRedo}>
                Redo
              </Button>
            </Button.Group>
          </div> */}
        </div>
        <div className="app">
          <div className="app-stencil" ref={this.refStencil} />

          <div className="app-content" ref={this.refContainer} />

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