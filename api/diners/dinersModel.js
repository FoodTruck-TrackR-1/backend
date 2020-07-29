const db = require("../../data/dbConfig");

module.exports = {
   addFavorite,
   getFavorites,
   removeFavorite
};

function addFavorite(truck) {
    return db('favorites').insert(truck)
}
function getFavorites(id) {
    return db('favorites')
    .join('users', 'users.id', 'favorites.diner_id')
    .select('favorites.*')
    .where('favorites.diner_id', id)
}
function removeFavorite(truckID) {
    return db('favorites')
    .join('trucks', 'trucks.id', 'favorites.truck_id')
    .where('favorites.truck_id', truckID)
    .del()
}