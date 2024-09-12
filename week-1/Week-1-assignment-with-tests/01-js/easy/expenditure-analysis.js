/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

const transactions = [
  { itemName: "Item 1", category: "Books", price: 15, timestamp: "2023-06-01" },
  { itemName: "Item 2", category: "Electronics", price: 50, timestamp: "2023-06-02" },
  { itemName: "Item 3", category: "Books", price: 30, timestamp: "2023-06-03" },
  { itemName: "Item 4", category: "Electronics", price: 25, timestamp: "2023-06-04" },
  { itemName: "Item 5", category: "Groceries", price: 40, timestamp: "2023-06-05" },
];

function calculateTotalSpentByCategory(transactions) {
  const categoryMap = new Map();

  // Iterate over each transaction
  for (const transaction of transactions) {
    const { category, price } = transaction;

    // If category already exists in the map, update the total price
    if (categoryMap.has(category)) {
      const totalPrice = categoryMap.get(category) + price;
      categoryMap.set(category, totalPrice);
    }
    // If category doesn't exist, add it to the map with the current price
    else {
      categoryMap.set(category, price);
    }
  }

  // Convert the map to an array of objects
  const result = Array.from(categoryMap, ([category, totalPrice]) => ({
    [category]: totalPrice
  }));

  return result;
}

const result = calculateTotalSpentByCategory(transactions);
console.log(result);

module.exports = calculateTotalSpentByCategory;
