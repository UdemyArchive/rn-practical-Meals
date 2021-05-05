import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(meal => meal.categoryId.indexOf(catId) >= 0);

  {/*<Text>Category Meals</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details" onPress={() => {
                props.navigation.navigate("MealDetails");
            }} />
            <Button title="Go Back" onPress={() => {
                props.navigation.goBack();
        }} />*/}

  if (displayedMeals.length === 0) {
    return <View style={styles.conten}>
      <DefaultText>No meals found, check your filters.</DefaultText>
    </View>
  }

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
}

CategoryMealsScreen.navigationOptions = (navData) => {
  const catId = navData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
    /*headerLeft: (
        <TouchableOpacity
            onPress={() => console.log("back")}
        >
            <Text></Text>
        </TouchableOpacity>
    )*/
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealsScreen;
