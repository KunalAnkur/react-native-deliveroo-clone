import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import sanityClient from "../sanity"

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    },[]);

    useEffect(() => {
      sanityClient.fetch(`
      *[_type=="featured"] {
        ...,
        restaurant[]->{
          ...,
          dishes[]->
        }
      }
      `).then(data => {
        setFeaturedCategories(data)
      })
    }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 mt-5">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="#00CCBB" />
          <TextInput
            placeholder="Restaurant and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />
        {featuredCategories?.map((category) => (
          <FeatureRow
            id={category._id}
            key={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen