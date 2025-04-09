import React, { useEffect, useState } from 'react';
import Datatable from './Datatable';
import api from '../api/axios';

const userColumns = [
  { field: "id", headerName: "userId", width: 250 },
  { field: "name", headerName: "Name", width: 170 },
  { field: "email", headerName: "Email", width: 170 },
  { field: "isAdmin", headerName: "isAdmin", width: 150 },
  { field: "isSuperAdmin", headerName: "isSuperAdmin", width: 200 },
];

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    api.get('/api/userAll')
      .then(res => {
        if (res.status === 500) {
          console.log(res.error.message);
        } else {
          const data = res.data.map(s => ({ ...s, id: s._id }));
          console.log('user api called');
          setUsers(data);
        }
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Datatable
      tableField={userColumns}
      tableData={users}
      fetchData={fetchUsers}
      Rpage={"/dashboard/userdetail"}
      title={"User"}
    />
  );
}

export default Users;
