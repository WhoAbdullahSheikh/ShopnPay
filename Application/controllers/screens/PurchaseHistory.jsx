import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../components/config'; // Firestore config
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit'; // Pie chart from react-native-chart-kit
import { Dimensions } from 'react-native'; // To get screen width

const screenWidth = Dimensions.get('window').width;

const PurchaseHistory = ({ navigation }) => {  // Adding navigation prop
  const [purchaseHistoryData, setPurchaseHistoryData] = useState([]); // Renamed to purchaseHistoryData
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState([]); // For Pie Chart Data
  const [groupedPurchases, setGroupedPurchases] = useState({}); // For purchases grouped by month

  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  // Load purchase history from Firestore
  const loadPurchaseHistory = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('userSession');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        const phoneNumber = userSession.phoneNumber;

        const userRef = doc(db, 'purchaseHistory', phoneNumber);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const history = data.purchaseHistory || [];
          setPurchaseHistoryData(history); // Set full purchase history
          aggregateSpendingData(history); // Aggregate monthly spending
          groupPurchasesByMonth(history); // Group purchases by month
        } else {
          setPurchaseHistoryData([]);
        }
      } else {
        setPurchaseHistoryData([]);
      }
    } catch (error) {
      console.error('Error loading purchase history:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Aggregate monthly spending for pie chart
  const aggregateSpendingData = (history) => {
    let monthlySpending = {};

    history.forEach((purchase) => {
      const date = purchase.date; // Assuming date is in format "MM/DD/YYYY"
      const [month, day, year] = date.split('/'); // Splitting by '/' to get month, day, and year
      const monthYear = `${year}-${month}`; // Format: "YYYY-MM" (e.g., "2024-11")
      const totalBill = purchase.totalBill; // The total bill for the purchase

      if (monthlySpending[monthYear]) {
        monthlySpending[monthYear] += totalBill;
      } else {
        monthlySpending[monthYear] = totalBill;
      }
    });

    // Convert monthlySpending object into an array of chart data
    const chartData = Object.keys(monthlySpending).map((monthYear) => ({
      name: monthYear,
      population: monthlySpending[monthYear],
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }));

    setSpendingData(chartData);
  };

  // Group purchases by month (e.g., "2024-11")
  const groupPurchasesByMonth = (history) => {
    let grouped = {};

    history.forEach((purchase) => {
      const date = purchase.date; // Assuming date is in format "MM/DD/YYYY"
      const [month, day, year] = date.split('/');
      const monthYear = `${year}-${month}`; // Format: "YYYY-MM"

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(purchase);
    });

    // Sort the grouped months in descending order based on the date
    const sortedMonths = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(a + '-01'); // Convert to date object for comparison
      const dateB = new Date(b + '-01');
      return dateB - dateA; // Sort in descending order
    });

    // Sort purchases within each month by date
    sortedMonths.forEach((monthYear) => {
      grouped[monthYear].sort((a, b) => {
        const [aMonth, aDay, aYear] = a.date.split('/');
        const [bMonth, bDay, bYear] = b.date.split('/');
        const dateA = new Date(`${aYear}-${aMonth}-${aDay}`);
        const dateB = new Date(`${bYear}-${bMonth}-${bDay}`);
        return dateB - dateA; // Sort by date (most recent first)
      });
    });

    // Update grouped purchases with sorted months
    const sortedGroupedPurchases = {};
    sortedMonths.forEach((monthYear) => {
      sortedGroupedPurchases[monthYear] = grouped[monthYear];
    });

    setGroupedPurchases(sortedGroupedPurchases);
  };

  // Function to generate random color for the pie chart segments
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to render the list item for each purchase
  const renderPurchaseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.purchaseItem} 
      onPress={() => navigation.navigate('TransactionDetails', { purchase: item })} // Navigate to the TransactionDetails screen with the purchase data
    >
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Total Bill:</Text> Rs. {item.totalBill}/-
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Time:</Text> {item.time}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Date:</Text> {item.date} {/* Display date */}
      </Text>
    </TouchableOpacity>
  );

  // Function to render purchases grouped by month
  const renderMonthGroup = ({ item: monthYear }) => (
    <View style={styles.monthGroup}>
      <Text style={styles.monthText}>{monthYear}</Text>
      <FlatList
        data={groupedPurchases[monthYear]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPurchaseItem}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={['chart', ...Object.keys(groupedPurchases)]} // First item is the chart, followed by months
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item === 'chart') {
            return (
              <View style={styles.chartContainer}>
                {spendingData.length > 0 ? (
                  <PieChart
                    data={spendingData}
                    width={screenWidth - 40} // Chart width
                    height={220} // Chart height
                    chartConfig={{
                      backgroundColor: '#fff',
                      backgroundGradientFrom: '#fff',
                      backgroundGradientTo: '#fff',
                      decimalPlaces: 2, // Optional, limits decimal places to 2
                      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color of the segments
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                ) : (
                  <Text style={styles.emptyText}>No purchase history available.</Text>
                )}
              </View>
            );
          } else {
            return renderMonthGroup({ item });
          }
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No purchase history available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: 'Raleway-Regular',
  },
  chartContainer: {

    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthGroup: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchaseItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  productDetails: {
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default PurchaseHistory;
