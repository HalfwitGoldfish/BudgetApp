import { getFromLocalStorage, removeFromLocalStorage } from "/scripts/localStorage.js";

const mainMenu = document.getElementById("mainMenu");
const goToBudgetBtn = document.getElementById("goToBudgetBtn");
const updateBudget = document.getElementById("updateBudget");
const budgetInput = document.getElementById("budgetInput");
const updateBudgetBtn = document.getElementById("updateBudgetBtn");
const exitBudgetMenu = document.getElementById("exitBudgetMenu");
const startingBudget = document.getElementById("startingBudget");
const budgetLeft = document.getElementById("budgetLeft");
const goToAddExpensesBtn = document.getElementById("goToAddExpensesBtn");
const goToManageExpensesBtn = document.getElementById("goToManageExpensesBtn");
const addExpensesMenu = document.getElementById("addExpensesMenu");
const manageExpensesMenu = document.getElementById("manageExpensesMenu");
const exitAddExpensesMenu = document.getElementById("exitAddExpensesMenu");
const expenseNameInput = document.getElementById("expenseNameInput");
const expenseCostInput = document.getElementById("expenseCostInput");    
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expensesManaged = document.getElementById("expensesManaged");
const exitManageExpensesMenu = document.getElementById("exitManageExpensesMenu");

goToBudgetBtn.addEventListener("click", () => {
    mainMenu.classList.toggle("hidden");
    updateBudget.classList.toggle("hidden");
});

exitBudgetMenu.addEventListener("click", () => {
    mainMenu.classList.toggle("hidden");
    updateBudget.classList.toggle("hidden");
});

goToAddExpensesBtn.addEventListener("click", () => {
    mainMenu.classList.toggle("hidden");
    addExpensesMenu.classList.toggle("hidden");
});

exitAddExpensesMenu.addEventListener("click", () => {
    mainMenu.classList.toggle("hidden");
    addExpensesMenu.classList.toggle("hidden");
});

goToManageExpensesBtn.addEventListener("click", () => {
    let expenses = getFromLocalStorage( "Expenses" );

    expenses.map(expense =>
    {
        let favDiv = document.createElement( "div" );
        favDiv.type = "div";
        favDiv.className = "mb-[10px]";

        let expenseDiv = document.createElement( "div" );
        expenseDiv.type = "div";
        expenseDiv.className = "flex justify-evenly outline rounded-[5px] w-[195px] mb-[4px]";

        let expenseName = document.createElement( "p" );
        expenseName.type = "p";
        expenseName.innerText = expense.name;

        let expenseCost = document.createElement( "p" );
        expenseCost.type = "p";
        expenseCost.innerText = expense.cost;
            
        let removeBtn = document.createElement( "button" );
        removeBtn.type = "button";
        removeBtn.className = "hover:bg-white/15 hover:cursor-pointer bg-red-400/60 outline rounded-[5px] w-[195px] mb-[10px]";
        removeBtn.innerText = "Remove";
        
        removeBtn.addEventListener( "click", async () =>
        {
            removeFromLocalStorage( expense.name );
            favDiv.remove();
        });
        
        expenseDiv.appendChild( expenseName );
        expenseDiv.appendChild( expenseCost );
        favDiv.appendChild( expenseDiv );
        favDiv.appendChild( removeBtn );
        expensesManaged.appendChild( favDiv );
    });

    mainMenu.classList.toggle("hidden");
    manageExpensesMenu.classList.toggle("hidden");
});

exitManageExpensesMenu.addEventListener("click", () => {
    mainMenu.classList.toggle("hidden");
    manageExpensesMenu.classList.toggle("hidden");
})

const updateBudgetValue = ( budgetStored ) => {
    let expenses = getFromLocalStorage( "Expenses" );

    startingBudget.innerText = budgetStored;

    for( let i = 0; i < expenses.length; i++ ){
        let remainingBudget = getFromLocalStorage( "BudgetLeft" );
        remainingBudget = budgetStored -= expenses[i].cost;
        localStorage.setItem( "BudgetLeft", JSON.stringify( remainingBudget ) );
        budgetLeft.innerText = remainingBudget;
    }
}

updateBudgetBtn.addEventListener("click", () => {
    let budget = budgetInput.value;
    let budgetStored = getFromLocalStorage( "Budget" );
    budgetStored = budget;
    localStorage.setItem( "Budget", JSON.stringify( budgetStored ) );

    updateBudgetValue( budgetStored );

    mainMenu.classList.toggle("hidden");
    updateBudget.classList.toggle("hidden");
});

addExpenseBtn.addEventListener("click", () => {
    let budgetStored = getFromLocalStorage( "Budget" );
    let expenses = getFromLocalStorage( "Expenses" );
    let name = expenseNameInput.value;
    let cost = expenseCostInput.value;
    
    if ( name == "" || cost == "" ){
        alert( "Please enter a name and cost." );
        return;
    }else if ( !expenses.includes( name ) ){
        expenses.push({name, cost});
        localStorage.setItem( "Expenses", JSON.stringify( expenses ) );
    }
    
    updateBudgetValue( budgetStored );

    expenseNameInput.value = "";
    expenseCostInput.value = "";
    mainMenu.classList.toggle("hidden");
    addExpensesMenu.classList.toggle("hidden");
});

let budgetStored = getFromLocalStorage( "Budget" );
updateBudgetValue( budgetStored );