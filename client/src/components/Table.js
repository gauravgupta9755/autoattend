import React from 'react'

export const Table = (props) => {
  console.log(props.data)
  return (
    <>
    <table class="table table-stripped text-center mt-5">
  <thead>
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">Enroll</th>
      <th scope="col">Name</th>
      <th scope='col'>Days</th>
      <th scope="col">Attendance</th>
      

    </tr>
  </thead>
  <tbody>
   {
    props.data.list.map((item)=>{
      return <tr>
      <th scope="row">1</th>
      <td>{item.enroll}</td>
      <td>{item.name}</td>
      <td>{props.data.enroll[item.enroll]?props.data.enroll[item.enroll]:0}</td>
      <td>{props.data.enroll[item.enroll]?(props.data.enroll[item.enroll]/props.data.total)*100:0}%</td>
    </tr>
    })
   }
   
    
  </tbody>
</table>
    </>
  )
}

export default Table
