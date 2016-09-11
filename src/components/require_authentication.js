import React, { Component } from 'react';
import { connect } from 'react-redux';

// ComposedComponent is component want to wrap by this higher component
export default function(ComposedComponent) {
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object
		}

		// Call before rendering state not update yet
		componentWillMount() {
			if(!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		// Call before rendering but with new set of new props (nextProps)
		// state update
		componentWillUpdate(nextProps) {
			if(!nextProps.authenticated) {
				this.context.router.push('/');
			}
		}

		render() {
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