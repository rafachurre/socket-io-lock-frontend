import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Input.scss';

export class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			draftValue: this.props.value,
		}

		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		const { onChange } = this.props;
		const input = event.currentTarget;
		this.setState({ draftValue: input.value })
		onChange && onChange(event);
	}

	render() {
		const { id, name, lock, label, placeholder, value } = this.props;
		const { draftValue } = this.state;

		return (
			<div className="inputRow">
				<label htmlFor={id || (name && `input-${name}`) || undefined}>{label}</label>
				<input id={id || (name && `input-${name}`) || undefined} name={name} placeholder={placeholder} value={draftValue || value || ''} onChange={this.onInputChange} disabled={lock} />
				{lock && <i className="material-icons">lock</i>}
			</div>
		)
	}
}

Input.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	lock: PropTypes.bool,
	value: PropTypes.string,
}

