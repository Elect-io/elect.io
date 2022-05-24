export const signupEmail = (name, id) => {
    return (
        `
        <div style = "font-family:Verdana; line-height: 1.5rem; color:white; background-image:linear-gradient(to right, #396afc, #2948ff); margin:0; padding: 1.3rem;">
            <h3>Hey, ${name} </h3>
            <p style="color:white"> An account was created with your email on <a style="color:white">elect.io</a>; to verify that this action was performed by you, click on the "Verify your account" button below.If you didn't create this account, click on the "close account" button below. </p>
            <div style="display: grid; align-items: center; flex-direction: column; width:calc(100% - 2rem); justify-content: center; padding: 1rem">
            <a href ="${process.env.server_url}/api/user/verify/${id}" style = "background-color:#E6E8E9; border-radius: .75rem; font-size: 18px; margin: 1rem auto 2rem; padding:.8rem; color:#292929; text-decoration:none" > Verify Your Account </a>
            <a href ="${process.env.server_url}/api/user/unverify/${id}" style = "color:white; text-align:center; text-decoration: underline;"> Close account </a>
        </div>
        <h4>Regards, <br/>
            Team Elect.io
        </h4>
        </div>`)
}

export const forgetEmail = (name, id) =>{
    
    return(`<div style="font-family:Verdana; line-height: 1.5rem; color:white; background-image:linear-gradient(to right, #396afc, #2948ff); margin:0; padding: 1.3rem;">
<h3>Hey, ${name}</h3>
<p>A reset password request was created for your account on <a style="color:white">elect.io<a/>; to verify that this action was performed by you, click on the "Reset Password" button below. If you didn't perform this action, click on the "Close reset request" button below. </p>
<div style="display:grid; justify-content:center; align-items: center; flex-direction: column; width:calc(100% - 2rem); justify-content: center; padding: 1rem">
  <a href="${process.env.client_url}/profile/forgot-password/${id}" style="background-color:#E6E8E9; border-radius: .75rem; font-size: 18px; margin: 1rem auto 2rem; padding:.8rem; color:#292929; text-decoration:none">Reset Password</a>
  <a href="${process.env.server_url}/api/user/didn't-forget/${id}" style="color:white; text-align:center; text-decoration: underline;">Close reset request </a>
</div>
<h4>
Regards, <br/>
Team Elect.io
</h4>
</div>`)}