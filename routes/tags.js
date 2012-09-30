/**
 * Created with JetBrains WebStorm.
 * User: guola
 * Date: 12-9-29
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
exports.index = function (req, res, next) {
    res.render('tags', { title: '兴趣管理' });
};
