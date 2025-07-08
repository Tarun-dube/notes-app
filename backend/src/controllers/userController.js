import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";

export async function signupUser(req, res) {
    const { userName, email, password } = req.body;

    try {
        // Validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Weak password. Use min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol' });
        }
        //check if user already exists
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "user already exists" });
        //create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "user created successfully" });


    } catch (error) {
        console.error("error in signup user", error);
        res.status(500).json({ message: "internal server error" });
    }
}




export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        // Validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        //find user
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) return res.status(404).json({ message: "user not found" });

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) return res.status(401).json({ message: "invalid credentials" });

        //create a token
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        console.log("JWT_SECRET:", token);


        return res.status(200).json({ message: "login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
