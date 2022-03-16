const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver-v2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

module.exports = (app) => {
    app.use(passport.initialize()); // passport를 초기화 하기 위해서 passport.initialize 미들웨어 사용
    passport.use(
        new KakaoStrategy({
            clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
            callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
        },
        // clientID에 카카오 앱 아이디 추가
        // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
        // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
        // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
        async (accessToken, refreshToken, profile, done) => {
            console.log('kakao profile', profile);
            try {
                const exUser = await User.findOne({
                    // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                    where: { snsId: profile.id, /*providerType: 'kakao'*/ },
                });
                // 이미 가입된 카카오 프로필이면 성공
                if (exUser) {
                    done(null, exUser); // 로그인 인증 완료
                } else {
                    // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                    const newUser = await User.create({
                        // email: profile._json && profile._json.kakao_account_email,
                        nickname: profile.displayName,
                        snsId: profile.id,
                        // providerType: 'kakao',
                    });
                    done(null, newUser); // 회원가입하고 로그인 인증 완료
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        },
        ),
    );
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_ID,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: process.env.NAVER_URL
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('nvaer profile : ', profile);
                try {
                    const exUser = await User.findOne({
                        // 네이버 플랫폼에서 로그인 했고 & snsId 필드에 네이버 아이디가 일치할경우
                        where: { snsId: profile.id, providerType: 'naver' },
                    });
                    // 이미 가입된 네이버 프로필이면 성공
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            email: profile.email,
                            nick: profile.name,
                            snsId: profile.id,
                            providerType: 'naver',
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: process.env.GOOGLE_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('google profile : ', profile);
                try {
                    const exUser = await User.findOne({
                        // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
                        where : { snsId: profile.id, providerType: 'google' },
                    });
                    // 이미 가입된 구글 프로필이면 성공
                    if (exUser) {
                        done(null, exUser); // 로그인 인증 완료
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            email: profile?.email[0].value,
                            nick: profile.displayName,
                            snsId: profile.id,
                            providerType: 'google',
                        });
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};