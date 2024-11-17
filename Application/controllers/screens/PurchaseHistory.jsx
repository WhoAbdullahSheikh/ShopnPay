import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { db } from '../components/config';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PurchaseHistory = ({ navigation }) => {
  const [purchaseHistoryData, setPurchaseHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState([]);
  const [groupedPurchases, setGroupedPurchases] = useState({});
  const [chartConfig, setChartConfig] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPurchaseHistory();
  }, []); // No longer depends on selectedYear

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[parseInt(monthNumber) - 1];
  };

  const loadPurchaseHistory = async () => {
    try {
      setLoading(true);
      const sessionData = await AsyncStorage.getItem('userSession');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        const phoneNumber = userSession.phoneNumber;

        const userRef = doc(db, 'purchaseHistory', phoneNumber);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const history = data.purchaseHistory || [];

          setPurchaseHistoryData(history);
          aggregateSpendingData(history);
          groupPurchasesByMonth(history);
        } else {
          setPurchaseHistoryData([]);
        }
      } else {
        setPurchaseHistoryData([]);
      }
    } catch (error) {
      console.error('Error loading purchase history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing once data is loaded
    }
  };

  const aggregateSpendingData = (history) => {
    let monthlySpending = {};

    const allMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    allMonths.forEach(month => {
      monthlySpending[month] = 0;
    });

    let maxSpending = 0;

    history.forEach((purchase) => {
      const date = purchase.date;
      const [month, day, year] = date.split('/');
      const monthName = getMonthName(month).substring(0, 3);
      const totalBill = purchase.totalBill;

      monthlySpending[monthName] += totalBill;
      if (totalBill > maxSpending) {
        maxSpending = totalBill;
      }
    });

    const chartData = {
      labels: allMonths,
      datasets: [
        {
          data: allMonths.map((monthName) => monthlySpending[monthName]),
          color: (opacity = 1) => `rgba(165, 42, 42, ${opacity})`,  // Color of the line
          strokeWidth: 2,
          dotColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})` // New color for the dots (red in this case)
        },
      ],
    };

    const yMax = Math.ceil(maxSpending / 20000) * 20000;
    const yStep = 20000;

    setSpendingData(chartData);

    setChartConfig({
      backgroundColor: '#fff000',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#fffffa',
      decimalPlaces: 0,
      linejoinType: "round",
      scrollableDotFill: 'transparent',
      scrollableDotRadius: 6,
      scrollableDotStrokeColor: 'tomato',
      scrollableDotStrokeWidth: 3,
      scrollableInfoViewStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#828282',
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 0,
      },
      scrollableInfoTextStyle: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 2,
        flex: 1,
        textAlign: 'center',
      },
      scrollableInfoSize: { width: 80, height: 30 },
      scrollableInfoOffset: 15,

      color: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,

      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

      style: {
        borderRadius: 16,
        borderLeftWidth: 50,
        borderStyle: 'solid',
      },
      propsForBackgroundLines: {
        strokeDasharray: "",
        strokeDashoffset: 15
      },
      yAxisLabel: "Rs.",
      yAxisSuffix: " /-",
      yAxisMinValue: 0,
      yAxisMaxValue: yMax,
      yAxisInterval: yStep,

      yAxisLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
      },
    });
  };

  const groupPurchasesByMonth = (history) => {
    let grouped = {};

    history.forEach((purchase) => {
      const date = purchase.date;
      const [month, day, year] = date.split('/');
      const monthName = getMonthName(month);
      const monthYear = `${monthName} ${year}`;

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(purchase);
    });

    const sortedGroupedPurchases = Object.keys(grouped)
      .sort((a, b) => {
        const [aMonth, aYear] = a.split(' ');
        const [bMonth, bYear] = b.split(' ');

        const monthOrder = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const aMonthIndex = monthOrder.indexOf(aMonth);
        const bMonthIndex = monthOrder.indexOf(bMonth);

        if (aYear !== bYear) {
          return bYear - aYear;
        } else {
          return bMonthIndex - aMonthIndex;
        }
      })
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

    setGroupedPurchases(sortedGroupedPurchases);
  };

  const renderPurchaseItem = ({ item }) => (
    <TouchableOpacity style={styles.purchaseItem}>
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Date:</Text> {item.date} {/* Display date */}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Time:</Text> {item.time}
      </Text>
      <Text style={styles.itemText}>
        <Text style={styles.boldText}>Total Bill:</Text> Rs. {item.totalBill}/-
      </Text>

      {/* Details Button */}
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('TransactionDetails', { purchase: item })}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
        <Icon name="arrowright" size={20} color="#fff" style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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

  // Pull-to-refresh logic
  const onRefresh = () => {
    setRefreshing(true);
    loadPurchaseHistory();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A52A2A" />
          <Text style={styles.loadingText}>Loading History</Text>
        </View>
      ) : (
        <FlatList
          data={['chart', ...Object.keys(groupedPurchases)]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (item === 'chart') {
              return (
                <View style={styles.chartContainer}>
                  {spendingData.datasets ? (
                    <View style={styles.chartWrapper}>
                      <LineChart
                        data={spendingData}
                        width={screenWidth}
                        height={220}
                        withShadow={true}
                        withDots={true}
                        withScrollableDot={true}
                        withOuterLines={true}
                        transparent={false}
                        withInnerLines={true}
                        chartConfig={chartConfig}
                        segments={4}
                        style={styles.graphStyle}
                      />
                    </View>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A52A2A" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 5,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphStyle: {
    borderRadius: 16,
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#A52A2A',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  monthGroup: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#A52A2A',
    marginBottom: 5,
  },
  purchaseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '600',
    color: '#4A4A4A',
  },
  detailsButton: {
    backgroundColor: '#A52A2A',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',  // Align icon and text horizontally
    width: '100%',  // Make the button take full width
    justifyContent: 'space-between',  // Space out text and icon
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,  // Adds spacing between text and icon
  },
});

export default PurchaseHistory;
