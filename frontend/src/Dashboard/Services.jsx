import React, { useEffect, useState } from 'react';
import Datatable from './Datatable';
import { Paper } from '@mui/material';
import api from '../api/axios';

const userColumns = [
  { field: "id", headerName: "ServiceId", width: 250 },
  { field: "servicename", headerName: "Service Name", width: 170 },
  {
    field: "plan",
    headerName: "Plan",
    width: 150,
    renderCell: (params) => (
      <Paper sx={{ background: (theme) => theme.palette.common.grey, color: (theme) => theme.palette.primary.main, p: 1 }} elevation={1}>
        {params.row.plan}
      </Paper>
    ),
  },
  { field: "description", headerName: "Description", width: 220 },
  { field: "price", headerName: "Price", width: 130 },
];

function Services() {
  const [services, setServices] = useState([]);

  const fetchServices = () => {
    api.get('/api/servicesAll')
      .then(res => {
        if (res.status === 500) {
          console.log(res.error.message);
        } else {
          const data = res.data.map(s => ({ ...s, id: s._id }));
          console.log('services api called');
          setServices(data);
        }
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      {services && (
        <Datatable
          tableField={userColumns}
          tableData={services}
          fetchData={fetchServices}
          Rpage={"/dashboard/servicedetail"}
          title={"Service"}
        />
      )}
    </>
  );
}

export default Services;
