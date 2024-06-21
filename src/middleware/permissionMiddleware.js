const chechPermission = async (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({error: 'Unauthorized access'});
    }
    next();
}

export default chechPermission;