import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user with all necessary fields including UserID
        const newUser = await Users.create({
            name: name,
            email: email,
            password: hashPassword
            // Sequelize will handle the insertion of UserID (auto-increment)
        });

        res.json({ msg: "Registration Successful", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Registration failed. Please try again later." });
    }
};
 
export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        if (!user || user.length === 0) {
            return res.status(404).json({ msg: "Email not found" });
        }

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role; // Assuming there's a 'role' field in the user model

        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });

        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken, role }); // Include 'role' in the response
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


// Example controller method
export const getDashboardContent = async (req, res) => {
    try {
        // Extract user role from request (assuming it's attached after verification)
        const { role } = req.user; // Assuming role is available after token verification

        // Implement logic based on user role
        if (role === 'admin') {
            // Return admin-specific content
            return res.json({ message: 'Admin Dashboard Content' });
        } else if (role === 'user') {
            // Return user-specific content
            return res.json({ message: 'User Dashboard Content' });
        } else {
            return res.status(403).json({ message: 'Forbidden' }); // Invalid or unrecognized role
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
