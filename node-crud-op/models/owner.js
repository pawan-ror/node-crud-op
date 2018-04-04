module.exports = function(sequelize, Sequalize) {
    var OwnerSchema = sequelize.define("Owner", {
        name: Sequalize.STRING,
        surname: Sequalize.STRING,
        address: Sequalize.STRING,
        phone: Sequalize.STRING
    },{
        timestamps: false
    });
    return OwnerSchema;
}