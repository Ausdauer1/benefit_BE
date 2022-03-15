const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/auth', authMiddleware, auth);
router.get('/kakao', passport.authenticate('kakao'));
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