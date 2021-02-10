const express = require('express');
const router = express.Router();
const guessing_controller = require('../controllers')

router.use('/api', router)
router.post('/forsee', (req, res) => {
  if(!Object.keys(req.body).length)
    return res.status(400).json({ error: 'Request body is empty' })
  
  guessing_controller.getData(req.body, res)
}) 

module.exports = router;