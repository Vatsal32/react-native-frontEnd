import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export type IUserProps = {
  navigation: any;
  route: any;
};

type Wallet = {
  _id: string;
  name: string;
  walletID: string;
  img: string;
};

const User: React.FC<IUserProps> = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#111' : '#ddd',
  };

  const {_id} = route.params;

  const [data, setData] = useState<Wallet>({
    _id: '',
    name: '',
    walletID: '',
    img: '',
  });

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const result = await fetch(
      'https://wallet-server-01.herokuapp.com/api/wallets/one/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id}),
      },
    );
    const json = await result.json();
    setData(json.data[0]);
    setLoading(false);
    fadeIn();
  };

  useEffect(() => {
    getData();
  }, []);

  const textColor: TextStyle = {
    color: isDarkMode ? '#fff' : '#010101',
    textAlign: 'center',
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View
      style={[
        backgroundStyle,
        {
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
      ]}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
            borderColor: isDarkMode ? 'rgba(240, 240, 240, 0.5)' : '#010101',
            paddingBottom: 25,
            opacity: fadeAnim,
          },
        ]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <Image
            style={{
              borderRadius: 500,
              borderWidth: 1,
              borderColor: isDarkMode ? 'rgba(250, 250, 250, 0.75)' : '#020202',
            }}
            source={
              data.img === ''
                ? require('../assets/avatar.png')
                : {uri: data.img, height: 400, width: 400}
            }
          />
        </View>
        <Text style={[textColor, {marginTop: 15}]}>Name: </Text>
        <Text style={[textColor, {fontSize: 20}]}>{data.name}</Text>
        <Text style={[textColor, {marginTop: 15}]}>Wallet ID:</Text>
        <Text style={[textColor, {fontSize: 20}]}>{data.walletID}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 15,
          }}>
          <Pressable
            style={[styles.button, {}]}
            onPress={() => {
              navigation.navigate('users');
            }}>
            <Text>All Wallet</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 480,
    height: 800,
    background: '#FDFEFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  textBox: {
    marginVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  imgBox: {
    display: 'flex',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: '45%',
    backgroundColor: '#ffacac',
    color: '#53488d',
  },
});

export {User};
