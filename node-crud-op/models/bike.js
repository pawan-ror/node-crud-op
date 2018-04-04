module.exports = function(sequelize, Sequalize) {
    var BikeSchema = sequelize.define("Bike", {
        name: Sequalize.STRING,
        location: Sequalize.STRING,
      
    },{
        timestamps: false
    });
    return BikeSchema;
}