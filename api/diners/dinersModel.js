const db = require("../../data/dbConfig");

module.exports = {
   addFavorite,
   getFavorites,
   removeFavorite
};

async function addFavorite(truck) {
    try {
        const [id] = await db("favorites").insert(truck, "id");
    
        return getFavorite(id);
      } catch (error) {
        throw error;
      }
}
function getFavorite(id) {
    return db('favorites').select('favorites.*').where({ id }).first();
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