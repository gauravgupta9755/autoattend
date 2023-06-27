import React from 'react'

export const AddStu = (props) => {
  console.log(props)
  const fun=async()=>{
    const name=document.getElementById("name").value
    const enroll=document.getElementById("enroll").value
    const regId=props.reg.regId
    
    const file = document.getElementById("file");
    const formData = new FormData()
    formData.append('myFile', file.files[0])
    formData.append("name",name);
    formData.append('enroll',enroll)
    formData.append("regId",regId)
    let options = {
      method: 'POST',
      body: formData
      }
      const res=await fetch("/encode",options);
      const result=await res.json()
      console.log(result)
      alert(result.msg)
  }
  return (
      <>
        <div className='m-3'>
          <div className="mb-3">
            <label for="name" classNameName="form-label">Name :</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
          </div>

          <div className="mb-3">
            <label for="enroll" className="form-label">Enrollment No. :</label>
            <input type="text" className="form-control" id="enroll"/>
          </div>

          {/* <div className="mb-3">
            <label for="branch" className="form-label">Semester :</label>
            <select type="text" className="form-control" id="branch">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div> */}

          {/* <div className='mb-3'>
          <label for="section" className="section">Section :</label>
          <div className="mb-3 form-check">
            <input type="checkbox" className="section" id="section1" />
            <label className="section m-2" for="sectionA">A</label>
            <input type="checkbox" className="section" id="section2" />
            <label className="section m-2" for="sectionB">B</label>
          </div>
          </div> */}
          
          {/* <div className="mb-3">
            <label for="year" className="form-label">Passing year</label>
            <input type="number" className="form-control" id="year"/>
          </div> */}

          <div class="mb-3">
          <label for="formFile" class="form-label">Image of Student :</label>
          <input class="form-control" type="file" id="file"/>
          </div>

         <button type="submit" onClick={fun} className="btn" style={{ backgroundColor: "#57B894" }}>Submit</button>
        </div>
      </>
  )
}

export default AddStu
