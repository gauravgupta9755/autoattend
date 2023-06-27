import './login.css'
// import './login.js'
import { useEffect } from 'react'

export const Login= (props)=>{
    useEffect(() => {
		setTimeout(() => {
			let container = document.getElementById('container')
			

			const toggle = () => {
				container.classList.toggle('sign-in')
				container.classList.toggle('sign-up')
			}
			
			setTimeout(() => {
				container.classList.add('sign-in')
			}, 200)
		}, []);
	  });

	  const login= async()=>{
		console.log("fdd")
		const username=document.getElementById("username").value;
		const password=document.getElementById("password").value;
		const data={
			username:username,
			password:password
		}
		let options = {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data)
		  }

		  const res=await fetch("/login",options);
		  const result=await res.json()
		  alert(result.msg)
		  if(result.status==1){
            props.setLogin({status:true,data:result.data})
			
		  }
		  console.log(result.data)
	}

    return(
		
        <>
        <form>
        <div id="container" class="container">
		<div class="row">
 
			 <div class="col align-items-center flex-col sign-up">
				<div class="form-wrapper align-items-center">
					<div class="form sign-up">
						<div class="input-group">
							<i class='bx bxs-user'></i>
							<input type="text" placeholder="Username"/>
						</div>
						<div class="input-group">
							<i class='bx bx-mail-send'></i>
							<input type="email" placeholder="Email"/>
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password"/>
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Confirm password"/>
						</div>
						<button >
							Sign up
						</button>
						
					</div> 
	            </div> 
			
			</div>
		
			<div class="col align-items-center flex-col sign-in">
				<div class="form-wrapper align-items-center">
					<div class="form sign-in">
						<div class="input-group">
							<i class='bx bxs-user'></i>
							<input type="text" placeholder="Username" id='username'/>
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password" id='password'/>
						</div>
						<button type='button' onClick={login}>
							Sign in
						</button>
					</div>
				</div>
				<div class="form-wrapper">
		
				</div>
			</div>
			{/* <!-- END SIGN IN --> */}
		</div>
		{/* <!-- END FORM SECTION -->
		<!-- CONTENT SECTION --> */}
		<div class="row content-row">
			{/* <!-- SIGN IN CONTENT --> */}
			<div class="col align-items-center flex-col">
				<div class="text sign-in">
					<h2>
						AutoAttend
					</h2>
	
				</div>
				<div class="img sign-in">
		
				</div>
			</div>
			{/* <!-- END SIGN IN CONTENT -->
			<!-- SIGN UP CONTENT --> */}
			<div class="col align-items-center flex-col">
				<div class="img sign-up">
				
				</div>
				<div class="text sign-up">
					<h2>
						Join with us
					</h2>
	
				</div>
			</div>
			{/* <!-- END SIGN UP CONTENT --> */}
		</div>
		{/* <!-- END CONTENT SECTION --> */}
	  </div>

        </form>
        </>
    )
}