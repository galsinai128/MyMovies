export function isInFavorites(favorites,movieName){
    return favorites.find(el => el === movieName)
}