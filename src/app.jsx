import React from 'react'
import './app.css'
import InputRect from './components/InputRect'
import TranslateRect from './components/TranslateRect'
import VisRect from './components/VisRect'


export default class Example extends React.Component {
  state = { //只有state里的值发生变化，才会重新渲染
    context: "",
    data: {
      // 节点
      nodes: [
        {
          id: 'node1',
          x: 40,
          y: 40,
          width: 80,
          height: 40,
          label: 'Hello',
        },
        {
          id: 'node2',
          x: 160,
          y: 180,
          width: 80,
          height: 40,
          label: 'World',
        },
      ],
      // 边
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
      ],
    }
  }

  render() {
    return (
      <div >
        <div style={{ display: 'flex', alignItems: "center" }}>

          <div style={{ textAlign:"center",fontSize: 30 }}>
            <InputRect change_context={this.change_context} />
            &nbsp;&nbsp;&uarr;&darr;&nbsp;&nbsp;
          </div>

          <div style={{ fontSize: 30 }}>
            &nbsp;&nbsp;&larr;&nbsp;&nbsp;
            <br />
            &nbsp;&nbsp;&rarr;&nbsp;&nbsp;
          </div>

          <div style={{ textAlign:"center",fontSize: 30 }}>
          <TranslateRect context={this.state.context} />
            &nbsp;&nbsp;&uarr;&darr;&nbsp;&nbsp;
          </div>

        </div>

        <VisRect data={this.state.data} />
      </div>
    )
  }

  change_context = (newState) => {
    // 请求服务器，获取转换后的代码
    this.setState({
      context: newState
    })
  }

  // translate() {
  //   this.setState({ context: this.state.context + "1" })
  // }
}
