const gender = require('../models/gender-model');

getGender = async (req, res) => {
    await gender.find({}, (err, gender) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!gender.length) {
            return res
                .status(404)
                .json({ success: false, error: `Sexos não encontrados` })
        }
        return res.status(200).json({ success: true, genderList: gender })
    }).catch(err => console.log(err))
}

module.exports = {
    getGender
}