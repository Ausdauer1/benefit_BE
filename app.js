require('dotenv').config(); // 환경변수
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const passportConfig = require('./passport');
const port = 3000;
const cors = require('cors');
// const router = require('./routes/auth');

app.use(cors());
passportConfig(app);

// force: 서버 실행 시 마다 테이블을 재생성 할 것인지 아닌지
sequelize.sync({ force: false }).then(() => {
    console.log("DB Connected Success");
}).catch((err) => {
    console.error(err);
});

const userRouter = require('./routes/user');
const mainDetail = require('./routes/main')

app.use([userRouter, mainDetail]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
