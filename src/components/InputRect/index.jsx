import React, { Component } from 'react'

export default class InputRect extends Component {



  handleKeyUp = (event) => {
    const { keyCode, target } = event
    if (keyCode === 11113) return
    console.log(target.value);
    this.props.change_context(target.value)
  }

  render() {
    return (
      <div>
        <select>
          <option value="auto">自动检测</option>
          <option value="PyTorch">PyTorch</option>
          <option value="TensorFlow">TensorFlow</option>
        </select>
        <br />
        <textarea
          onKeyUp={this.handleKeyUp}
          placeholder="输入网络定义、拖入模型文件 即可转换"
          style={{width: '800px',height: '100px'}}
        />
      </div>
    )
  }
}
