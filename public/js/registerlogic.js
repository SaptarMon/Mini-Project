function registerUser() {
  let empid = document.getElementById("empid").value;
  let name = document.getElementById("nameofuser").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log(name, email, username, password);

  const link = "http://localhost:3000/register";

  let senddata = JSON.stringify({
    employeeid: empid,
    name: name,
    email: email,
    username: username,
    password: password,
  });


  fetch(link, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: senddata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }

      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })

    .then((data) => 
    {

        // console.log(data);
      if(data.token)
      {
        let content="<p id='custommessage' >Registration Successful</p>"
        document.getElementById('message').innerHTML=content;

        setTimeout(()=>{
          let content="<p id='custommessageredirect' >Redirecting to Login !</p>"
          document.getElementById('message').innerHTML=content;
        },1000)
         
        setTimeout(()=>{
          location.href="./login.html"
        },2000)
        
       
      }


    })
    .catch((error) => {
      console.log(error.message);
    });
}
