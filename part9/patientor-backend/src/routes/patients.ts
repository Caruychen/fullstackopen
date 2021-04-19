import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('getting patient records');
  res.send('Patient records');
});

export default router;