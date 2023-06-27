import React from 'react'

export const TestSys = () => {
  return (
       <>
        <form className='m-4'>
          <div className="mb-3">
          <label for="formFile" className="form-label">Enter the image of a Student to find his/her enrollment number :</label>
          <input className="form-control" type="file" id="formFile"/>
          </div>

         <button type="submit" className="btn" style={{ backgroundColor: "#57B894" }}>Submit</button>
        </form>
      </>
  )
}

export default TestSys
