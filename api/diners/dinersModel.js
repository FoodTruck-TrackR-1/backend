const db = require("../../data/dbConfig");

module.exports = {
   addFavorite,
   getFavorites,
   removeFavorite,
   findTruck,
   findMenu,
   findTrucks,
};
// favorites list
async function addFavorite(fav) {
    
    try {
        const [id] = await db("favorites").insert(fav, "id");
    
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
function removeFavorite(id, truckID) {
    return db('favorites')
    .join('trucks', 'trucks.id', 'favorites.truck_id')
    .where('favorites.truck_id', truckID && 'favorites.diner_id', id)
    .del()
}

// truck and menu search
function findTrucks() {
    return db('trucks').select('trucks.*')
}
function findTruck(id) {
    return db('trucks').select('trucks.*').where({ id }).first();
}
function findMenu(truckID) {
    return db('menu_items')
    .join('trucks', 'trucks.id', 'menu_items.truck_id')
    .select('menu_items.*')
    .where('menu_items.truck_id', truckID)
}