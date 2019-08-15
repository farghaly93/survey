const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    const encoded = jwt.verify(token, 'mohammadfarghalyalisaadawydevelopersurvey');
    if(encoded) {
   // req.user = {username: encoded.username, userId: encoded.userid};
    next();
        }
    }
    catch(err) {
        res.status(401).json({err, mess: 'Please Login as (ADMIN) first...'});
    }
}


