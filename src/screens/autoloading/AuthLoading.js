import React, { Component } from 'react';
import { Spinner, Container } from '../../components';
import { colors } from '../../components/styles';
import Storage from '../../helpers/Storage';
import PenggunaService from '../../services/PenggunaService';

class AuthLoading extends Component {
  constructor(props) {
    super(props);

    this.processAuthentication();
  }

  processAuthentication = async () => {
    const authStorage = await Storage.get('auth');

    // if(authStorage !== null) {
    //   const auth = JSON.parse(authStorage);
    //   const isAuthenticated = await PenggunaService.isAuthenticated(auth.token);

    //   this.props.navigation.navigate(isAuthenticated ? 'Dashboard' : 'Welcome');
    // }
    
    this.props.navigation.navigate(authStorage ? 'DashboardPelanggan' : 'Welcome');
  }

  render() {
    return (
      <Container centerContent>
        <Spinner isVisible={true} type="bar" color={colors.white} />
      </Container>
    );
  }
}

export default AuthLoading;