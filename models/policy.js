const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Policy extends Model {
        static associate(models) {
            //테이블과 테이블의 관계를 설정
            
        }

    }
    Policy.init(
            {
            postId: {
                type: Sequelize.INTEGER(100),
                primaryKey : true,
                autoIncrement : true,
            },
            policyNum: {
                type: Sequelize.STRING(100), 
            },
            category: {
                type: Sequelize.STRING(100), 
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(500), 
                allowNull: false,
            },
            group: {
                type: Sequelize.STRING(100), 
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(100), 
                allowNull: false,
            },
            summary: {
                type: Sequelize.STRING(1000), 
                allowNull: false,
            },
            benefit_desc: {
                type: Sequelize.STRING(2000), 
                allowNull: false,
            },
            benefit: {
                type: Sequelize.STRING(100), 
                allowNull: false,
            },
            benefit_tmp: {
                type: Sequelize.STRING(100), 
                allowNull: false,
            },
            apply_period: {
                type: Sequelize.STRING(500), 
                allowNull: false,
            },
            apply_start: {
                type: Sequelize.DATEONLY, 
                allowNull: false,
            },
            apply_end: {
                type: Sequelize.DATEONLY, 
                allowNull: false,
            },
            scale: {
                type: Sequelize.STRING(500), 
            },
            age: {
                type: Sequelize.STRING(500), 
            },
            education: {
                type: Sequelize.STRING(500), 
            },
            major: {
                type: Sequelize.STRING(500), 
            },
            job_status: {
                type: Sequelize.STRING(500), 
            },
            special: {
                type: Sequelize.STRING(100), 
            },
            process: {
                type: Sequelize.STRING(500), 
            },
            dday: {
                type: Sequelize.STRING(500), 
            },
            apply_site: {
                type: Sequelize.STRING(500), 
            },
            operation: {
                type: Sequelize.STRING(500), 
            },
            category_tmp: {
                type: Sequelize.STRING(500), 
            },
            do_period: {
                type: Sequelize.STRING(500), 
            },
            residence: {
                type: Sequelize.STRING(2000), 
            },
            plus: {
                type: Sequelize.STRING(2000), 
            },
            without: {
                type: Sequelize.STRING(1000), 
            },
            submit: {
                type: Sequelize.STRING(1000), 
            },
            etc: {
                type: Sequelize.STRING(1000), 
            },
            maker: {
                type: Sequelize.STRING(100), 
            },
            reference_site1: {
                type: Sequelize.STRING(500), 
            },
            reference_site2: {
                type: Sequelize.STRING(500), 
            },
            view: {
                type: Sequelize.INTEGER(100), 
            },

        },
            {
            // 테이블에 대한 설정 지정
            sequelize,              // static init의 매개변수와 연결되는 옵션, model/index.js에서 연결
            timestamps: false,      // true시 createAt, updateAt 컬럼 추가, 각각 생성 및 수정 시 시간 반영
            underscored: false,     // 테이블과 컬럼명을 자동으로 캐멀케이스로 만든다.
            modelName: 'Policy',      // 프로젝트에서 사용하는 모델의 이름
            tableName: 'policies',     // 실제 데이터베이스의 테이블 이름
            paranoid: false,        // true로 설정 시 데이터 삭제 시 완벽하게 삭제하지 않고 삭제기록
            charset: 'utf8',
            collate: 'utf8_general_ci',
            },
        );
  
    return Policy;
}





