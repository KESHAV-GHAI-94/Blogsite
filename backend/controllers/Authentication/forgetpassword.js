const bcrypt = require("bcrypt");
const pool = require("../../config/db")
const { findUserByEmail,saveOtp } = require("../../models/UserModel");
const {sendotpEmail} = require("../../utils/sendEmail")
//random otp 
const generateOtp = () => Math.floor(10000+Math.random()*900000);

//while click on forgetpassword

const forgetpassword = async (req,res)=>{
    try{
        const {email}= req.body;
        const user = await findUserByEmail(email);
        if (!user) {
        return res.status(400).send("Email not registered");
        }
        const otp = generateOtp();
        //storing otp in db 
        await saveOtp(email,otp);
        // sending mail from util folder by nodemailer
        await sendotpEmail(email,otp);
        res.status(200).send("OTP sent to your email");
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server")
        }
    }

    // matching otp
const verifyotp = async (req,res)=>{
    try{
    const {email,otp}= req.body;
    const user = await findUserByEmail(email);
    if(!user){
        res.status(400).send("Email not found.");
    }
    //if otp is wrong:
    if(user.otp!=otp){
        res.status(400).send("invalid otp.");
    }
    if(!user.otp_expires_at || new Date(user.otp_expires_at)<new Date()){
        await pool.query(
        "UPDATE users SET otp = NULL, otp_expires_at = NULL, otp_verified = FALSE WHERE email = $1",
        [email]
    );
        return res.status(400).send("OTP EXPIRED!");
    }
    // marks otp as verfied
    await pool.query(
        "UPDATE users SET otp_verified = TRUE WHERE email = $1",
        [email]
    );

    res.status(200).send("otp verified");
    }catch(err){
        res.status(500).send("server error");
    }
}
const resetPassword = async (req,res)=>{
    try{
        const {email,newPassword} = req.body;
        const saltrounds=10;
        const hashPassword= await bcrypt.hash(newPassword,saltrounds);
        await pool.query(
            `UPDATE users SET password = $1, otp= NULL, otp_expires_at =NULL,otp_verified = False WHERE email = $2`,
            [hashPassword,email]
        );
        return res.status(200).send("PASSWORD UPDATED SUCESSFULLY.")
    }catch(err){
        res.status(500).send("Server error");
    }
};
module.exports = {
    forgetpassword,
    verifyotp,
    resetPassword,
};