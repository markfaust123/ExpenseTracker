import { FlatList, Text } from "react-native";
import { Expense } from "../../lib/types";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  const renderExpenseItem = (itemData: { item: Expense }) => {
    return (
      <Text>
        {itemData.item.amount} - {itemData.item.description}
      </Text>
    );
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
