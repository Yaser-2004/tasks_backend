import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = 'my_secret';

export const registerUser = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const existing = await User.findOne({email: email});
        if (existing) {
            return res.status(400).json({message: 'User Already Exists'});
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({fullName, email, password: hashed});

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: '1d'});
        const {password: _, ...userWithoutPassword} = newUser._doc;

        res.status(201).json({
            message: 'User Registered Successfully',
            user: userWithoutPassword,
            token
        })

    } catch (error) {
        console.log("Error registering user: ", error);
        res.status(500).json({ error: "Server error" });
    }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.json({ message: "Logout successful" });
};