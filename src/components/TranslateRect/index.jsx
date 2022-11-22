import React, { Component } from 'react'

export default class TranslateRect extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
        </select>
        <br />
        <textarea
          readOnly={true}
          value={this.props.context}
          style={{ width: '400px', height: '100px' }}
        />

      </div>
    )
  }
}
