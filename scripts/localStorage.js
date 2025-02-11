const getFromLocalStorage = ( keyName ) =>
{
    let localStorageData = localStorage.getItem( keyName );
        
    if( localStorageData == null ){
        return [];
    }
        
    return JSON.parse( localStorageData );
}
        
const removeFromLocalStorage = ( expenseName ) =>
{
    console.log( expenseName );

    let localStorageData = getFromLocalStorage( "Expenses" );

    let nameIndex = localStorageData.findIndex( expense => expense.name == expenseName );
    console.log( nameIndex );
        
    localStorageData.splice( nameIndex, 1 );
        
    localStorage.setItem( "Expenses", JSON.stringify(localStorageData) );
}

export { getFromLocalStorage, removeFromLocalStorage };