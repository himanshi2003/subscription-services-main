import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('access-token');
    console.log("Bearer " + token);

    const timer = setTimeout(() => {
      api.post('/api/cartempty', {}, {
        headers: { "Authorization": token }
      }).then(() => {
        navigate('/');
      }).catch(() => {
        navigate('/cart');
      });
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, [navigate]); // ✅ Included navigate in dependencies

  return (
    <h1>Success</h1>
  );
}

export default Success;
