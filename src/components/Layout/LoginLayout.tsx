import React, { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default LoginLayout;
