import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, SetStepCount] = useState(0);

  var Dist = stepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);

  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  React.useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("./assets/bg.jpg")}
      >
        <View style={{ flex: 1, marginTop: 120, alignContent: "center" }}>
          <View style={{ marginLeft: 30, marginBottom: 40, marginTop: 60 }}>
            <CircularProgress
              value={stepCount}
              maxValue={6500}
              radius={150}
              textColor={"#ECF0F1"}
              activeStrokeColor={"#8A2BE2"}
              inActiveStrokeColor={"rgb(70,130,180)"}
              inActiveStrokeOpacity={1}
              inActiveStrokeWidth={30}
              activeStrokeWidth={30}
              title={"Step Count"}
              titleColor={"#ECF0F1"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.textDesignAvailable}>
                Pedometer available : {PedometerAvailability}{" "}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textDesign}>Target : 6500 steps(5KMS)</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textDesign}>
                Distance Covered : {DistanceCovered} kms
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textDesign}>
                Calories Burned : {caloriesBurnt}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadingTitle: {
    color: "white",
    backgroundColor: "rgba(70,130,180, 0.5)",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textDesign: {
    backgroundColor: "rgba(70,130,180,0.5)",
    height: 50,
    width: "100%%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    padding: 10,
    paddingRight: 30,
    // fontFamily: "Papyrus",
  },
  textDesignAvailable: {
    backgroundColor: "rgba(0,0,139, 0.03)",
    height: 45,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    padding: 10,
    paddingRight: 30,
    marginLeft: 50,
  },
  textContainer: {
    margin: 10,
    width: "100%",
  },
});
