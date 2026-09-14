import generateToken from "../utils/generateTokens.js";
import User from "../models/User.js";

export const signup=async (req,res)=>{
    try {
        const {
        fullName,
      email,
      phone,
      password,
      bloodGroup,
      address,
      emergencyContact,
      location,
    }= req.body

    const userExists=await User.findOne({email})

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      bloodGroup,
      address,
      emergencyContact,
      location: {
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
  },
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user,
    });


    } catch (error) {
  console.error("Signup Error:");
  console.error(error);
  console.error(error.message);
  console.error(error.errors);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const match = await user.matchPassword(password);

    console.log("Password Match:", match);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
