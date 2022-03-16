const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth-middleware');

const { kakaoCallback, googleCallback, naverCallback } = require('../controller/user');

// router.get('/auth', kakaoCallback, authMiddleware);
router.get('/kakao/callback', passport.authenticate('kakao'), kakaoCallback);
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//     failureRedirect: '/',
// }), (req, res) => {
//     res.redirect('/');
//     },
// );

// router.get('/naver/callback', passport.authenticate('naver', {
//     failureRedirect: '/',
// }), (req, res) => {
//     res.redirect('/');
//     },
// );

// router.get('/google/callback', passport.authenticate('google', {
//     failureRedirect: '/',
// }), (req, res) => {
//     res.redirect('/');
//     },
// );

module.exports = router;