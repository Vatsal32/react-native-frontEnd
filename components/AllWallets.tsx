import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  View,
} from 'react-native';
import {List} from './List';

export type IAllWalletsProps = {
  navigation: any;
};

const AllWallets: React.FC<IAllWalletsProps> = ({navigation}) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const result = await fetch(
      'https://wallet-server-01.herokuapp.com/api/wallets',
    );
    const json = await result.json();
    setData(json.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const lists = useMemo(() => {
    return data.map((item: any, ind: number) => {
      return (
        <List
          key={ind + 1}
          hasImage={item.img !== '' && item.img !== undefined}
          img={item.img}
          name={item.name}
          _id={item._id}
          navigation={navigation}
        />
      );
    });
  }, [data]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <>
            <List
              key={0}
              hasImage
              name="Create new Wallet"
              img="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png"
              _id="add_user"
              navigation={navigation}
            />
            {lists}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export {AllWallets};
