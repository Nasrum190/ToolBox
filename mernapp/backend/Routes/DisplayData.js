const express = require('express');
const router = express.Router();

router.post('/displaydata', (req, res) => {
    try{
        res.send([global.parts_items ,global.partsCategory]);
    }catch(error){
        console.error(error.message);
        res.send("Server Error");
    }
})
module.exports = router;