import React, { useEffect, useState } from 'react';
import { getUserData } from '../api_resources/request';

const Home = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
    })
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>{userData.id}</p>
      <p>{userData.email}</p>
      <p>{userData.country}</p>
      <p>{userData.href}</p>
    </div>
  )
}

export default Home;
