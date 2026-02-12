const pool = require("../../config/db");
const {createUser,findUserByEmail,clearotp,saveOtp} = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const {sendEmailotp} = require("../../utils/userverify");
// creating an account api 
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
const Registeruser = async (req,res)=>{
    try{
        if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is missing or invalid JSON" });
        }
        const{name,email,password}= req.body;
        if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
            if (!nameRegex) return "Full Name is required";
            if(nameRegex.length<=2) return "Name should be atleast of 3 characters.";
            if (!nameRegex.test(name.trim())){
                return "Only letters allowed, no extra spaces or symbols";
                }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }
        const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!PasswordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be 8+ chars with upper, lower & number"
            });
        }
        const saltrounds = 10;
        const hashpassword = await bcrypt.hash(password,saltrounds)
        //for checking already existing acc.
        const existing = await findUserByEmail(email);
        if(existing && existing.is_active === true){
            console.log("email already exists");
            return res.status(400).json("email already exists");
        }
        //exsts but not verified with otp
        if (existing && existing.is_active === false) {
        const newOtp = generateOtp();
        await saveOtp(email, newOtp); 
        await sendEmailotp(email, newOtp);
        return res.status(200).json({
            message: "User exists but not verified — new OTP sent",
            email,
        });
        }
        //creating account api 
        const user_otp=generateOtp();
        const user_otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
        const user = await createUser(name,email,hashpassword,user_otp,user_otp_expiry,false);
        await sendEmailotp(email, user_otp);
        res.status(201).json({
        message: "User registered. Verify OTP",
        userId: user.id,
        email: user.email
        });
        }
        catch (err) {
            console.error("REGISTER ERROR:", err);
            res.status(500).json({ message: "Server error" });
    }
}
const verifySignupOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
        }
        const user = await findUserByEmail(email);
        if (!user) {
        return res.status(400).json({ message: "User not found" });
        }
        if (user.is_active) {
        return res.status(400).json({ message: "User already verified" });
        }
        if (new Date() > user.email_otp_expires_at) {
        return res.status(400).json({ message: "OTP expired" });
        }
        if (user.email_otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
        }
        await pool.query(
        "UPDATE users SET is_active = true WHERE email = $1",
        [email]
        );
        await clearotp(email);
        res.json({ message: "Email verified successfully" });
    }catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { Registeruser,verifySignupOtp };
