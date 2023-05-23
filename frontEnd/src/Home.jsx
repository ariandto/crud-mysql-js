import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Home() {
    const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Student List</h2>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    <thead></thead>
                </tbody>
                {data.map((student, index) =>{
                    return <tr key={index}>
                        <td>{student.ID}</td>
                        <td>{student.Name}</td>
                        <td>{student.Email}</td>
                        <td>
                            <button className='btn btn-sm btn-info'>Read</button>
                            <button className='btn btn-sm btn-primary mx-2'>Edit</button>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                })}
            </table>
        </div>
    </div>
  )
}

export default Home
