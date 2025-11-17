exports.verify = (firstName,otp)=>{
    return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to firstBite</title>
    <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #2c2c2c; /* Dark background */
                margin: 0;
                padding: 0;
            }
            .container {
                width: 80%;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background-color: #f4f4f4; /* Light grey background */
                }
            .header {
                background: #333333;
                padding: 20px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                color: #ffffff;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                background-color: #28a745; /* Green background */
                color: #ffffff;
                padding: 15px 30px;
                font-size: 18px;
                text-decoration: none;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #218838;
            }
            .footer {
                background: #333333;
                padding: 10px;
                text-align: center;
                border-top: 1px solid #ddd;
                font-size: 0.9em;
                color: #cccccc;
                border-radius: 0 0 10px 10px;
            }
            </style>
            </head>
            <body>
            <div class="container">
            <div class="header">
            <h1>Welcome to TrustForge </h1>
            </div>
            <div class="content">
            <p>Hello ${firstName},</p>
            <p>this is your otp use it to verify ${otp} it expires in 5 mins</p>
                
                <p>Have a wonderful day</p>
                <p>Best regards,<br>TrustForge Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            </div>  
        </div>
    </body>
    </html>
    
  
    `)
}

exports.forgotPassword = (link,firstName)=>{
    return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset </title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #2c2c2c; /* Dark background */
                margin: 0;
                padding: 0;
            }
            .container {
                width: 80%;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background-color: #f4f4f4; /* Light grey background */
            }
            .header {
                background: #333333;
                padding: 20px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                color: #ffffff;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                background-color: #28a745; /* Green background */
                color: #ffffff;
                padding: 15px 30px;
                font-size: 18px;
                text-decoration: none;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #218838;
            }
            .footer {
                background: #333333;
                padding: 10px;
                text-align: center;
                border-top: 1px solid #ddd;
                font-size: 0.9em;
                color: #cccccc;
                border-radius: 0 0 10px 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>OLODO you don forget password</h1>
            </div>
            <div class="content">
                <p>Hello again ${firstName} </p>
                <p>See your life  </p>
                <div class="button-container">
                    <a href="${link}" class="button">click to reset password</a>
                </div>
                <p>If your village people dey follow you forget am again</p>
                <p>Best regards,<br>Trustforge Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            </div>  
        </div>
    </body>
    </html>
    
  
    `)
}

exports.verify2 = (firstName, otp) => {
  return (`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trustforge Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f5f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      }
      .header {
        text-align: center;
        padding-bottom: 10px;
      }
      .logo {
        font-size: 28px;
        color: #1e40af;
        font-weight: bold;
      }
      .content {
        text-align: left;
        color: #333;
        line-height: 1.6;
      }
      .otp-box {
        margin: 25px 0;
        padding: 15px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f8fafc;
      }
      .otp-box h2 {
        font-size: 28px;
        letter-spacing: 3px;
        color: #1e3a8a;
        margin: 10px 0;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #666;
        margin-top: 25px;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">🔷 TRUSTFORGE</div>
      </div>
      <div class="content">
        <p>Verify your email to activate your Trustforge account</p>
        <p>Hi ${firstName},</p>
        <p>
          Thanks for joining <b>Trustforge</b> — where ideas meet opportunity.
          To activate your account, please use the One-Time Passcode (OTP) below:
        </p>

        <div class="otp-box">
          <p><b>Your OTP Code:</b></p>
          <h2>${otp}</h2>
          <p>This code will expire in <b>5 minutes</b>.</p>
        </div>

        <p>
          Enter this code on the verification page to complete your registration
          and start exploring projects, investors, and collaborators on
          Trustforge.
        </p>

        <p>
          If you didn’t request this, please ignore this email.
        </p>

        <p>Trustforge — building trust, empowering innovation.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Trustforge. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `)
};

exports.forgotPassword2 = (link, firstName) => {
  return (`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password - Trustforge</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f5f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      }
      .header {
        text-align: center;
        padding-bottom: 10px;
      }
      .logo {
        font-size: 28px;
        color: #1e40af;
        font-weight: bold;
      }
      .content {
        text-align: left;
        color: #333;
        line-height: 1.6;
      }
      .button-container {
        text-align: center;
        margin: 25px 0;
      }
      .button {
        display: inline-block;
        background-color: #1e40af;
        color: #ffffff;
        padding: 12px 25px;
        font-size: 16px;
        text-decoration: none;
        border-radius: 6px;
      }
      .button:hover {
        background-color: #1d4ed8;
        }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #666;
        margin-top: 25px;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">🔷 TRUSTFORGE</div>
      </div>
      <div class="content">
        <p>Hi ${firstName},</p>
        <p>We received a request to reset your password.</p>
        <p>
          Click the button below to reset your password. If you didn’t request this, you can safely ignore this email.
        </p>

        <div class="button-container">
          <a href="${link}" class="button">Reset Password</a>
        </div>

        <p>This link will expire in <b>10 minutes</b>.</p>

        <p>Best regards,<br>Trustforge Team</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Trustforge. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `)
};