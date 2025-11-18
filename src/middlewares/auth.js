const adminAuth = (req, res) => {
    // Dummy authentication logic for admin
    console.log("Admin authentication middleware triggered");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"; // Replace with real logic

    if (! isAdminAuthorized) {
        res.status(403).send("Forbidden: Admins only");
    } else {
        res.status(200).send("Welcome, Admin!");
    }
};

module.exports = {
    adminAuth
};