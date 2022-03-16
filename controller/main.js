const { Policy } = require('../models');
const { Op } = require('sequelize');
const { fn, col } = Policy.sequelize;



// 메인페이지로 줄 정보 
exports.mainpage = async (req, res) => {
  try {
    const todayBest = await Policy.findAll({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location',[fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"],  'view'],
        order: [['view','DESC']],
        limit: 5,
    });
    
    const c1 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '주거·금융' },
        order: [['view','DESC']],
    });
    const c2 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '코로나19' },
        order: [['view','DESC']],
    });
    const c3 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '창업지원' },
        order: [['view','DESC']],
    });
    const c4 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '생활·복지' },
        order: [['view','DESC']],
    });
    const c5 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '정책참여' },
        order: [['view','DESC']],
    });
    const c6 = await Policy.findOne({
        attributes:['postId', 'category', 'benefit', 'title', 'summary', 'location', [fn('concat', col('apply_start'), ' ~ ', col('apply_end')), "apply_period"], 'view'],
        where: { category: '취업지원' },
        order: [['view','DESC']],
    });
    const categoryBest = [c1,c2,c3,c4,c5,c6];

    res.json({ todayBest, categoryBest })
  } catch (error) {
    res.status(400).json({ result : 'false'})
  } 
};
// 상세 페이지로 줄 정보 
exports.detailpage = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Policy.findOne({
        attributes:['postId', 'title', 'group', 'location', 'summary', 'category', 
        'benefit_desc', 'benefit', 'apply_period', 'scale', 'age', 'education', 
        'major', 'job_status', 'special', 'process', 'dday', 'apply_site', 
        'operation', 'do_period', 'residence', 'plus', 'submit', 'etc', 
        'maker', 'reference_site1', 'reference_site2','view'],
        where: { postId: postId },
    });
    res.json({ post });
  } catch (error) {
    res.status(400).json({ result : 'false'})
  }  
};