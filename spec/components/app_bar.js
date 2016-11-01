import React from 'react';
import AppBar from '../../components/app_bar';

const AppBarTest = () => (
  <section>
    <h5>AppBar</h5>
    <br/>
    <AppBar title='V. Alexander' />
    <br/>
    <AppBar leftIcon='menu' title='V. Alexander' />
    <br/>
    <AppBar leftIcon='arrow_back' title='V. Alexander' rightIcon='close' />
    <br/>
    <AppBar>
      Custom content
    </AppBar>
  </section>
);

export default AppBarTest;
