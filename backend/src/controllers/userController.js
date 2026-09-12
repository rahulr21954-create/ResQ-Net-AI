
export const getProfile=async (req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;

    user.fullName = req.body.fullName || user.fullName;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.emergencyContact =
      req.body.emergencyContact || user.emergencyContact;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}