import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'
const PreparingOrderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        },5000)
    },[])
  return (
    <SafeAreaView className="bg-[#84D9F3] flex-1 justify-end items-center">
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-16 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
      />
    </SafeAreaView>
  );
}

export default PreparingOrderScreen