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
    const auth = await Storage.get('auth');

    if(auth == null) {
      this.props.navigation.navigate('Welcome');
      return;
    }

    const isAuthenticated = await PenggunaService.isAuthenticated(auth.akun.hak_akses, auth.token);

    if (isAuthenticated) {
      switch(auth.akun.hak_akses) {
        case 'pelanggan':
          this.props.navigation.navigate('DashboardPelanggan');
          break;
        case 'tukang':
          this.props.navigation.navigate('DashboardTukang');
          break;
        default:
          this.props.navigation.navigate('Welcome');
          break;
      }
    }
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