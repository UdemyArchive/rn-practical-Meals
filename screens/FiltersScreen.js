import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = props => {
  return <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Colors.accentColor}
      value={props.state}
      onValueChange={props.onChange}
    />
  </View>
}

const FiltersScreen = props => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vehan: isVegan,
      Vegetarian: isVegetarian
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={setIsVegan}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
}

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filters",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer();
      }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Save" iconName="ios-save" onPress={
        navData.navigation.getParam("save")
      } />
    </HeaderButtons>
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15
  }
});

export default FiltersScreen;
