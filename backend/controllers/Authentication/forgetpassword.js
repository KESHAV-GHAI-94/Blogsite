const bcrypt = require("bcrypt");
const pool = require("../../config/db")
const { findUserByEmail} = require("../../models/UserModel");
const {fgpass} = require("../../utils/forgetemail")
//random otp 
const generateOtp = () => Math.floor(100000+Math.random()*900000).toString();

//while click on forgetpassword
const forgetpassword = async (req,res)=>{
    try{
        const {email}= req.body;
        if (!email) {
            return res.status(400).json({message: "Email is required"});
        }
        const user = await findUserByEmail(email);
        if (!user ) {
        return res.status(400).json({ message: "Email not found" });
        }
        if (!user.is_active) {
        return res.status(403).json({message:"Email not registered"});
        }
        const otp = generateOtp();
        await pool.query(
        "DELETE FROM password_reset_otps WHERE email = $1",
        [email]
        );
        //storing otp in db 
        await pool.query(
        `INSERT INTO password_reset_otps (user_id, email, otp, expires_at)
        VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
        [user.id, email, otp]
        );
        // sending mail from util folder by nodemailer
        await fgpass(email,otp);
        res.status(200).json({message:"OTP sent to your email"});
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"Server error"})
        }
    }
    // matching otp
const verifyotp = async (req,res)=>{
    try{
    const {email,otp}= req.body;
    if (!email || !otp) {
        return res.status(400).json({message:"Email and OTP are required"});
    }
    await pool.query(
        "DELETE FROM password_reset_otps WHERE email = $1 AND expires_at < NOW()",
        [email]
    );
    const user = await findUserByEmail(email);
    if(!user){
        return res.status(400).json({message:"Email not found."});
    }
    if (!user.is_active) {
        return res.status(403).json({message:"Email not registered"});
        }
    const result = await pool.query(
      `SELECT * FROM password_reset_otps
        WHERE email = $1 
        AND otp = $2
        AND used = false
        AND expires_at > NOW()`,
        [email, otp]
    );
    if (result.rows.length === 0) {
    return res.status(400).json({message:"Invalid OTP"});
    }
    const otpRow = result.rows[0];
    await pool.query(
        "UPDATE password_reset_otps SET used = true WHERE id = $1",
        [otpRow.id]
    );
    res.status(200).json({message:"otp verified"});
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}
const resetPassword = async (req,res)=>{
    try{
        const {email,newPassword} = req.body;
        if (!email || !newPassword) {
        return res.status(400).json({message:"Email and new password required"});
        }
        const user = await findUserByEmail(email);
        if (!user) {
        return res.status(400).json({message:"User not found"});
        }
        if (!user.is_active) {
        return res.status(403).json({message:"Account not verified. Cannot reset password."});
        }
        await pool.query(
        "DELETE FROM password_reset_otps WHERE email = $1 AND expires_at < NOW()",
        [email]
        );
        const check = await pool.query(
        `SELECT * FROM password_reset_otps 
        WHERE email = $1 AND used = true
        AND expires_at > NOW() 
        ORDER BY created_at DESC LIMIT 1`,
        [email]
        );
        if (check.rows.length === 0) {
        return res.status(400).json({message:"Verify OTP first"});
        }
        const saltrounds=10;
        const hashPassword= await bcrypt.hash(newPassword,saltrounds);
        await pool.query(
            `UPDATE users SET password = $1 WHERE email = $2`,
            [hashPassword,email]
        );
        await pool.query(
        `DELETE FROM password_reset_otps 
        WHERE email = $1 AND used = true`,
        [email]
        );
        return res.status(200).json({message:"PASSWORD UPDATED SUCESSFULLY."});
    }catch(err){ 
        console.error("ERROR:", err);
        return res.status(500).json({ error: err.message }); 
        }
};
module.exports = {
    forgetpassword,
    verifyotp,
    resetPassword,
};