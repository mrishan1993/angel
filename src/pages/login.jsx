
// import { Button } from "@/components/ui/button"
import React, { useContext, useEffect, useState } from 'react';
import DataTable from "@/components/table"
import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import axios from "axios"

import ProgressBar from '../components/progress';


const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  // const {data, isLoading, error } = useQuery('users', () => {
  //   console.log("before calling")
  //   axios.get("https://jsonplaceholder.typicode.com/todos/1");
  // } )

  const [data, setData] = useState(["Ishan Gupta"])
  useEffect ( () => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then( (response) => {
      setData(response.data)
    });
  }, [])
  return (
    <UsersContext.Provider value={data}>
      {children}
    </UsersContext.Provider>
  );
};


export const useUsers = () => {
  console.log("inside use users")
  return useContext(UsersContext);
}


export const columns = [
  {
    accessorKey: "sample_id",
    header: "Sample ID",
  },
  {
    accessorKey: "status",
    header: "Sample"
  },
  {
    accessorKey: "number",
    header: "Sample",
  },
  {
    accessorKey: "ID",
    header: "",
    cell: () => (
        <Link to="/sample/profile">
          See Profile
        </Link>
        
    ),
  },
]

const Login = () => {
  const data = [
    {
      sample_id: "2321ff3",
      status: "Status",
      number: "234234",
    },
  ]

  const users = useUsers();
  console.log("users", users)
  return (
      <div className="col-span-8" >
        <h3 className="my-30 text-2xl font-semibold tracking-tight" 
          style={{"margin-top": "25px", "margin-bottom": "25px"}}>
          Sample List
        </h3>
        <DataTable columns={columns} data={data} />
        {/* <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul> */}
      </div>
    
  )
    
}

export default Login