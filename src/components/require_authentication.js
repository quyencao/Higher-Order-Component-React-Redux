import React, { Component } from 'react';
import { connect } from 'react-redux';

// ComposedComponent is component want to wrap by this higher component
export default function(ComposedComponent) {
	class Authentication extends Component {
		render() {
			console.log(this.props.authenticated);
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return {
			authenticated: state.authenticated
		};
	}

	return connect(mapStateToProps)(Authentication);
}

// In some other location...Not in this file
// We want to use this HOC
// How To USE
// import Authentication // HOC
// import Resources // component want to wrap

// const ComposedComponent = Authentication(Resources);

// In render 
// <ComposedComponent />
// {...this.props} -> <ComposedComponent resources={resources} />
// use this.props.resources