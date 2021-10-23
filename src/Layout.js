import React from 'react';
import Header from 'components/Header';

const Layout = props => (
    <div className="main">
        <Header nickname="Admin" age={28} marry={true} />
        {props.children}
    </div>
);

export default Layout;