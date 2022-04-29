import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  Pressable,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export type IListProps = {
  hasImage: boolean;
  img: string;
  name: string;
  _id: string;
  navigation: any;
};

const List: React.FC<IListProps> = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const textColor = {
    color: isDarkMode ? '#fff' : '#010101',
  };

  const imgColor = {
    tintColor: '#fff',
  };

  return (
    <Pressable
      onPress={() => {
        if (props._id === 'add_user') {
          props.navigation.navigate('add');
        } else {
          props.navigation.navigate('user', {
            _id: props._id,
          });
        }
      }}
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode
            ? Colors.darker
            : 'rgba(230, 230, 230, 0.75)',
          borderColor: isDarkMode ? 'rgba(240, 240, 240, 0.5)' : '#010101',
        },
      ]}>
      <Image
        style={[
          styles.img,
          isDarkMode && props._id === 'add_user' ? imgColor : {},
        ]}
        source={
          props.hasImage
            ? {uri: props.img, height: 75, width: 75}
            : require('../assets/avatar.png')
        }
      />
      <Text style={[styles.text, textColor]}>{props.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  img: {
    resizeMode: 'contain',
    width: 75,
    height: 75,
    margin: 20,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    flex: 1,
  },
});

export {List};
