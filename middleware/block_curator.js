module.exports = (req, res, next)=>{
    if(!req.user_permission || req.user_permission === 3) return res.status(403).json({error:'Forbidden'});
    next();
}