const typeHouse = require('../models/typeHouse-model');

getTypeHouse = async (req, res) => {
    await typeHouse.find({}, (err, types) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!types.length) {
            return res
                .status(404)
                .json({ success: false, error: `Tipos de endereços não encontrados` })
        }
        return res.status(200).json({ success: true, typesHouseList: types })
    }).catch(err => console.log(err))
}

module.exports = {
    getTypeHouse
}