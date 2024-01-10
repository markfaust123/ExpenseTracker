import { FlatList, Text } from "react-native";
import { Expense } from "../../lib/types";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.toString()}
      renderItem={(itemData) => <Text>{itemData.item.amount} - {itemData.item.description}</Text>}
    />
  );
};

export default ExpensesList;
