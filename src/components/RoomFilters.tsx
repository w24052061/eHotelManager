import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type RoomFiltersProps = {
  sortOption: string;
  setSortOption: (option: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
};

export default function RoomFilters({
  sortOption,
  setSortOption,
  filterDate,
  setFilterDate,
}: RoomFiltersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text style={styles.label}>Sort By Price:</Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={(value) => setSortOption(value)}
          style={styles.picker}
        >
          <Picker.Item label="Low to High" value="low-to-high" />
          <Picker.Item label="High to Low" value="high-to-low" />
        </Picker>
      </View>

      <View style={styles.filter}>
        <Text style={styles.label}>Available By Date:</Text>
        <Picker
          selectedValue={filterDate}
          onValueChange={(value) => setFilterDate(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Dates" value="" />
          <Picker.Item
            label="Today"
            value={new Date().toISOString().split("T")[0]}
          />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  filter: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "90%",
  },
});
