import React, {useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export type ISignUpProps = {
  navigation: any;
};

const SignUp: React.FC<ISignUpProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#111' : '#ddd',
  };

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');

  const [img, setImg] = useState<Asset>({});

  const textColor = {
    color: isDarkMode ? '#fff' : '#010101',
    fontSize: 16,
  };

  const takePic = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const res = await launchCamera({
        mediaType: 'photo',
      });
      if (res.assets !== undefined && res.assets[0].uri !== undefined) {
        setImg(res.assets[0]);
      }
    }
  };

  const chooseGallery = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (res.assets !== undefined && res.assets[0].uri !== undefined) {
      setImg(res.assets[0]);
    }
  };

  const reg = async () => {
    let data1 = new FormData();
    data1.append('name', name);
    data1.append('walletID', Date.now());
    data1.append('file', {
      type: img.type,
      uri: img.uri,
      size: img.fileSize,
      name: img.fileName,
    });

    fetch('https://wallet-server-01.herokuapp.com/api/wallets/add', {
      method: 'POST',
      body: data1,
    })
      .then(res => res.json())
      .then(res => {
        setLoading(true);
        navigation.navigate('user', {
          _id: res.data._id,
        });
        setLoading(false);
      })
      .catch(console.log);
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            borderColor: isDarkMode ? 'rgba(240, 240, 240, 0.5)' : '#010101',
          },
        ]}>
        <Text style={[textColor, styles.heading]}>New Wallet</Text>
        <Text style={textColor}>Name: </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor={isDarkMode ? '#afafaf' : '#717171'}
          style={[
            styles.textBox,
            {
              color: isDarkMode ? '#fff' : '#010101',
              borderColor: isDarkMode ? 'rgba(240, 240, 240, 0.75)' : '#010101',
            },
          ]}
          value={name}
          onChangeText={e => setName(e)}
        />
        <Text style={textColor}>Image: </Text>
        <View style={styles.imgBox}>
          <Pressable style={styles.button} onPress={takePic}>
            <Text style={{color: '#fff'}}>Take Image</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={chooseGallery}>
            <Text style={{color: '#fff'}}>Choose from gallery</Text>
          </Pressable>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 5,
          }}>
          <Pressable style={styles.button} onPress={reg}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
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
  heading: {
    fontSize: 32,
    textAlign: 'center',
    margin: 40,
  },
});

export {SignUp};
