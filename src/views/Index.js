import React from 'react';
import Cookies from 'universal-cookie'

const Index = () => {
  const cookies = new Cookies();

  return (
    <div>
      <h1>Index</h1>
      <p>{cookies.get('auth_token')}</p>
    </div>
  )
}

export default Index;
