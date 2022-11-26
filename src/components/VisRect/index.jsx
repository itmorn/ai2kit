import React from 'react'
import { Graph, Addon } from '@antv/x6'
import { Button } from 'antd'
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

  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      width: 1510,
      // height:2000,
      grid: true,
      // resizing: true,
      selecting: {
        enabled: true,
        rubberband: true, // 启用框选
        showNodeSelectionBox: true,
        multiple: false,
        multipleSelectionModifiers: ['alt'],
        modifiers: null,
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

    // this.graph.on('blank:mouseup', ({ e, x, y, cell, view }) => {
    //   console.log('blank:mouseup当前选中的结点有',this.graph.getSelectedCells())
    // })


    this.graph.on('cell:mousedown', ({ e, x, y, cell, view }) => {
      // 1.选区为空时：
      //            1.1.mousedown 没选中的结点 => 选中
      // 2.选区不为空时：
      //            2.1.mousedown 选中的结点 => 不变
      //            2.2.mousedown 没选中的结点 => 选区清空，选中
      if (this.graph.getSelectedCells().length === 0) { //1.选区为空时：
        this.graph.select(cell) //1.1.mousedown 没选中的结点 => 选中
      }
      else { //2.选区不为空时：
        if (this.graph.isSelected(cell)) {// 2.1.mousedown 选中的结点 => 不变
          console.log(this.graph.getSelectedCells())
          this.graph.disableSelection()
          return
        } else { //2.2.mousedown 没选中的结点 => 选区清空，选中
          this.graph.cleanSelection()
          this.graph.select(cell)
        }


        //   if (e.ctrlKey) { //按下ctrlKey
        //     // console.log(111,this.graph.getSelectedCells())
        //     // console.log(555,this.graph.isSelected(cell))

        //     console.log("2当前选中的结点有：", this.graph.getSelectedCells())
        //     console.log("当前选中的结点为：", cell)
        //     console.log(this.graph.isSelected(cell))
        //     if (this.graph.isSelected(cell)) { //如果是已选中的  则减去该结点
        //       console.log("选的是已选中的")
        //       this.graph.unselect(cell)
        //     }
        //     else { //如果不是已选中的  则增加该结点
        //       console.log("选的不是已选中的")
        //       this.graph.select(cell)
        //     }
        //     // console.log(444,this.graph.getSelectedCells())
        //     //只要是按下ctrlKey进行点击 就关闭弹窗
        //     this.setState({
        //       curCell: ""
        //     })
        //     console.log("out", this.graph.getSelectedCells())
        //     return
        //   }
        //   else { //没按 ctrl
        //     //如果选的是已经被选中的
        //     if (this.graph.isSelected(cell)) { //如果是已选中的  则不动
        //       return
        //     }
        //     else { //如果选了一个没被选中的，则清空选区选中该结点
        //       this.graph.cleanSelection()
        //       this.graph.select(cell)
        //     }
        //   }
        // }
      }
      if (cell.label.slice(0, 5) === "Input") {
        this.setState({ curCell: cell }, () => {
        })
      }
    })

    this.graph.on('cell:mouseup', ({ e, x, y, cell, view }) => {
      this.graph.enableSelection() 
      console.log("enter mouseup",this.graph.getSelectedCells())
    })
    this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
      console.log("enter click",this.graph.getSelectedCells())
      // 1.选区为空时：
      //            1.1.click 没选中的结点 => 选中
      // 2.选区不为空时：
      //            2.1.mousedown 选中的结点 => 不变
      //            2.2.mousedown 没选中的结点 => 选区清空，选中
      if (this.graph.getSelectedCells().length === 0) { //1.选区为空时：
        this.graph.select(cell) //1.1.mousedown 没选中的结点 => 选中
      }
      else { //2.选区不为空时：
        if (this.graph.isSelected(cell)) {// 2.1.mousedown 选中的结点 => 不变
          console.log(this.graph.getSelectedCells())
          return
        } else { //2.2.mousedown 没选中的结点 => 选区清空，选中
          this.graph.cleanSelection()
          this.graph.select(cell)
        }

      }
    })

    //添加cell时，显示结点详情
    this.graph.on('node:added', ({ e, x, y, cell, view }) => {
      this.showNodeMoreInfo(cell)
    })

    //点击画布时，curCell引用指向空
    this.graph.on('blank:mousedown', () => {
      this.setState({
        curCell: ""
      })
    })

    // // 选中cell
    // this.graph.on('cell:mousedown', ({ cell, options }) => {
    //   this.graph.resetSelection()
    //   console.log("resetSelection",this.graph.getSelectedCells())
    // })

    // // 选中cell
    // this.graph.on('cell:selected', ({ cell, options }) => {
    //   console.log("选中cell",this.graph.getSelectedCells())
    // })


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
          <div className="app-content" ref={this.refContainer} />
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