export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      _id: req.user._id,
      name: req.user.fullName,
      email: req.user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};