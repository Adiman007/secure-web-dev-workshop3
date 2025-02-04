const filmingLocations = require('./lieux-de-tournage-a-paris.json');
const mongoose = require('mongoose')
const Location = require('./locations/locations.model')
require('dotenv').config()


const getLocations = (locations) => {
    let _loc = []
    locations.forEach(element => {

        _loc.push({
            filmType:  element.fields.type_tournage,
            filmProducerName: element.fields.nom_producteur,
            endDate:   new Date(element.fields.date_fin),
            filmName:  element.fields.nom_tournage,
            district: element.fields.ardt_lieu,
            geolocation : {
                coordinates:element.fields.geo_shape.coordinates,
                type:element.fields.geo_shape.type
            },
            sourceLocationId : element.fields.id_lieu,
            filmDirectorName : element.fields.nom_realisateur,
            address : element.fields.adresse_lieu,
            startDate : new Date(element.fields.date_debut),
            year : element.fields.annee_tournage
        });
    })
    return _loc;
};

async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected")
    const locations = getLocations(filmingLocations);
    Location.insertMany(
        locations
    ).then(() => {
        mongoose.connection.close();
    })
}

main()