import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import Label from '../../../generic/Label/Label';
import { updateBalance } from '../../../../../redux/actions/TokenAction';

const mapStateToProps = state => ({
    balance: state.token.balance,
    token: state.token.token,
  });

const mapDispatchToProps = (dispatch) => ({
    getBalance: (token) => {
      dispatch(updateBalance(token));
    },
  });

class ProfilePage extends Component {

  static propTypes = {
    getBalance: PropTypes.func,
    balance: PropTypes.number,
  };

  static defaultProps = {
    getBalance: () => console.warn('getBalance is not defined'),
    newToken: () => console.warn('newToken is not defined'),
    balance: 0,
  };

  componentDidMount() {
    if (this.props.token)
      this.props.getBalance(this.props.token);
  }

  render() {
    return (
      <div>
        <NavigationBar title='Profile'/>
        <Label text={`Your balance: ${(this.props.balance / 100).toFixed(2)}`}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
