const pool = require("../config/db");
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0]; 
};
const createUser = async (
    name,
    email,
    password,
    email_otp,
    email_otp_expires_at,
    is_active
    ) => {
    const result = await pool.query(
        `INSERT INTO users 
        (name, email, password, email_otp, email_otp_expires_at, is_active)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id, name, email, is_active`,
        [name, email, password, email_otp, email_otp_expires_at, is_active]
    );
    return result.rows[0];
    };

const saveOtp = async (email,email_otp)=>{
    const result = await pool.query(
        `UPDATE users SET email_otp = $1,email_otp_expires_at= NOW() + INTERVAL '10 minutes' WHERE email = $2 RETURNING id,email,email_otp,email_otp_expires_at`,
        [email_otp,email]
    );
    return result.rows[0];
};
const clearotp = async(email)=>{
    await pool.query(
        `UPDATE users SET email_otp = NULL, email_otp_expires_at = NULL WHERE email = $1`,
        [email]
    )
};

module.exports = {
    createUser,
    findUserByEmail,
    saveOtp,
    clearotp,
};
