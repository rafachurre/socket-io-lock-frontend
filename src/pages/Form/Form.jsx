import React, { Component } from 'react';
import { Input } from '../../components';
import './Form.scss';
import { difference } from '../../utils/deepDiff';

export class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      draftData: {}
    }
  }

  onInputChange = (event) => {
    const { draftData } = this.state;
    const inputValue = event.currentTarget.value;
    const inputName = event.currentTarget.name;
    this.setState({
      draftData: {
        ...draftData,
        [`${inputName}`]: inputValue
      },
      dataDifference: {}
    });
  }

  onSubmit = () => {
    const { onSubmit, currentData } = this.props;
    const { draftData, dataDifference } = this.state;
    const diff = difference(draftData, currentData);
    this.setState({dataDifference: {
      ...dataDifference,
      diff
    }})
    onSubmit( draftData );
  }

  render() {
    const { lock, currentData } = this.props;
    const { draftData, dataDifference } = this.state;
    console.log(currentData)
    return (
      <>
        <Input name='name' label='Name' value={(draftData && draftData.name) || (currentData && currentData.name)} onChange={this.onInputChange} lock={lock}></Input>
        <Input name='lastName' label='Last Name' value={(draftData && draftData.lastName) || (currentData && currentData.lastName)} onChange={this.onInputChange} lock={lock}></Input>
        <Input name='country' label='Country' value={(draftData && draftData.country) || (currentData && currentData.country)} onChange={this.onInputChange} lock={lock}></Input>
        <button onClick={this.onSubmit} disabled={false}>Save</button>
        <div className="textareaRow">
          <label htmlFor='difference'>Data Difference</label>
          <textarea name='difference' rows={10} value={JSON.stringify(dataDifference, 2)} />
          {lock && <i className="material-icons">lock</i>}
			  </div>
      </>
    )
  }
}
