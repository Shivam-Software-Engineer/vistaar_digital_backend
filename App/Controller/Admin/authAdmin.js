
const resend = require("../../Configurations/mailConfig");
const { adminLoginModel } = require("../../Model/Admin_Model/adminLogin");

 let useOtp = new Map()
 

let changePass = async (req, res) => {
  try {
    let { oldPass, newPass } = req.body;

    // Get admin (assuming single admin)
    let admin = await adminLoginModel.findOne();

    if (!admin) {
      return res.send({
        status: 0,
        msg: "Admin not found"
      });
    }

    let dbOldPass = admin.pass;
    let dbEmail = admin.uname;

    // Check old password first
    if (oldPass !== dbOldPass) {
      return res.send({
        status: 0,
        msg: "Invalid old password"
      });
    }

    // Generate OTP (better and clean)
     let OTP = Number((Math.random()*999999).toString().split('.')[0].slice(0,4))

    // store OTP (your method kept)
    useOtp.set("myOtp", OTP);

    // send email safely
    try {
      const emailRes =await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "a23739330@gmail.com",
        subject: "Reset Your Password ",
        html: `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>



body{

    margin:0;

    padding:0;

    background:#f4f7fb;

    font-family:Arial,Helvetica,sans-serif;

}



.wrapper{

    width:100%;

    padding:40px 0;

}



.container{

    max-width:650px;

    margin:auto;

    background:#ffffff;

    border-radius:14px;

    overflow:hidden;

    box-shadow:0 8px 25px rgba(0,0,0,.08);

}



.header{

    background:#2563eb;

    color:#ffffff;

    text-align:center;

    padding:35px;

}



.header h1{

    margin:0;

    font-size:30px;

}



.content{

    padding:35px;

    color:#444;

    line-height:1.8;

}



.otp-box{

    margin:35px auto;

    width:260px;

    background:#f8fafc;

    border:2px dashed #2563eb;

    border-radius:10px;

    text-align:center;

    padding:22px;

}



.otp{

    font-size:34px;

    font-weight:bold;

    color:#2563eb;

    letter-spacing:8px;

}



.warning{

    background:#fff8e6;

    border-left:5px solid #f59e0b;

    padding:15px;

    border-radius:8px;

    margin-top:25px;

}



.footer{

    background:#f5f5f5;

    padding:20px;

    text-align:center;

    color:#777;

    font-size:13px;

}



</style>

</head>



<body>



<div class="wrapper">



<div class="container">



<div class="header">



<h1>Vistaar Digital</h1>



<p>Password Reset Verification</p>



</div>



<div class="content">



<h2>Hello,</h2>



<p>

We received a request to reset your password for your

<strong>Vistaar Digital</strong> account.

</p>



<p>

Please use the following One-Time Password (OTP) to continue.

</p>



<div class="otp-box">



<div style="font-size:15px;color:#666;">

Your Verification Code

</div>



<div class="otp">

${OTP}

</div>



</div>



<div class="warning">



<strong>Important:</strong>



<ul style="margin-top:10px;">

<li>This OTP is valid for <strong>5 minutes</strong>.</li>

<li>Do not share this OTP with anyone.</li>

<li>If you didn't request a password reset, you can safely ignore this email.</li>

</ul>



</div>



<p style="margin-top:30px;">

If you continue to experience issues, feel free to contact our support team.

</p>



<p>



Regards,<br>



<strong>Vistaar Digital Team</strong>



</p>



</div>



<div class="footer">



© ${new Date().getFullYear()} Vistaar Digital<br>



This is an automated email. Please do not reply.



</div>



</div>



</div>



</body>

</html>

`
      });
      console.log("RESEND FULL RESPONSE:", emailRes);

      console.log("OTP EMAIL SENT SUCCESS");

    } catch (mailError) {
      console.log("EMAIL ERROR:", mailError);

      return res.send({
        status: 0,
        msg: "Failed to send OTP email"
      });
    }

    return res.send({
      status: 1,
      msg: "OTP sent to email successfully"
    });

  } catch (error) {
    console.log(error);

    return res.send({
      status: 0,
      msg: error.message
    });
  }
};

let verifyOtp = async (req, res) => {
    let {otp, newPass} = req.body
    let myOtp = useOtp.get('myOtp')

    let respons={

    }


    if(otp==myOtp){


        await adminLoginModel.updateOne(
    {},
    {
        $set: {
            pass: newPass
        }
    }
);

        respons = {
            status:1,
            msg: "Password Change Successfully"
        }
    }
    else{
        respons = {
            status:0,
            msg: "Invalid OTP"
        }
    }



    res.send(respons)

} 

module.exports={changePass, verifyOtp};