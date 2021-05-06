const sequalize = require('sequelize');
const database = new sequalize('mysql://root:1204@localhost:3307/delilah-resto');

module.exports.get = async (sentence, parameters) => {
    return await database.query(sentence,
        { replacements: parameters, type: database.QueryTypes.SELECT });
}

module.exports.create = async (sentence, parameters) => {
    return await database.query(sentence,
        { replacements: parameters, type: database.QueryTypes.INSERT });
}

module.exports.update = async (model, id, data) => {
    await model.findByIdAndUpdate(id, data);
}

module.exports.delete = async (model, id) => {
    await model.findByIdAndDelete(id);
}
