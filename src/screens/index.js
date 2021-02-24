import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import firebase, {validateEmail} from '@pokechallenge/utils';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const {navigation} = props;
  const defaultValue = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const _login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
          setLoading(false);
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={login.page}>
          <View style={login.container}>
            <Image
              style={login.logo}
              source={require('@pokechallenge/assets/images/pokeball.png')}
            />
            <View>
              <Text
                style={{
                  marginBottom: hp(2),
                  textAlign: 'center',
                }}>
                Sign in with
              </Text>
              <TextInput
                error={formError.email}
                autoCorrect={false}
                style={register.input}
                label="Email"
                onChange={(e) => onChange(e, 'email')}
              />
              <TextInput
                error={formError.password}
                autoCorrect={false}
                style={register.input}
                label="Password"
                secureTextEntry={true}
                onChange={(e) => onChange(e, 'password')}
              />
              <Button
                style={{
                  marginTop: 30,
                  backgroundColor: color.green[0],
                }}
                contentStyle={{height: 45}}
                icon={'login'}
                mode="contained"
                loading={loading}
                uppercase={false}
                labelStyle={{color: color.white[0]}}
                onPress={() => {
                  _login();
                }}>
                Register
              </Button>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <View style={{width: wp(50), alignSelf: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Text>New User?</Text>
                    <Text
                      style={{
                        marginLeft: 8,
                        color: color.red[0],
                        fontFamily: font.bold,
                      }}>
                      Sign Up
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const Register = (props) => {
  const values = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(values);
  const [formError, setFormError] = useState({});

  const _register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
          setLoading(false);
        });
    }
    setFormError(errors);
    console.log(formData, formError);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={register.page}>
          <Image
            source={require('@pokechallenge/assets/images/pokemon-register.png')}
            style={register.image}
          />
          <TextInput
            error={formError.email}
            autoCorrect={false}
            style={register.input}
            label="Email"
            value={formData.email}
            onChangeText={(email) => setFormData({...formData, email})}
          />
          <TextInput
            error={formError.password}
            autoCorrect={false}
            secureTextEntry={true}
            style={register.input}
            label="Password"
            value={formData.password}
            onChangeText={(password) => setFormData({...formData, password})}
          />
          <TextInput
            error={formError.repeatPassword}
            autoCorrect={false}
            secureTextEntry={true}
            style={register.input}
            label="Repeat password"
            value={formData.repeatPassword}
            onChangeText={(repeatPassword) =>
              setFormData({...formData, repeatPassword})
            }
          />
          <Button
            loading={loading}
            style={{
              marginTop: 30,
              backgroundColor: color.green[0],
            }}
            contentStyle={{height: 45}}
            mode="contained"
            uppercase={false}
            labelStyle={{color: color.white[0]}}
            onPress={() => {
              _register();
            }}>
            Register
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const Region = (props) => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const [regions, setRegions] = useState([]);
  const route = useRoute();

  const getRegions = () => {
    axios
      .get('https://pokeapi.co/api/v2/region/')
      .then((response) => {
        setRegions(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRegions();
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item, index}) => (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('Locations', {
            region: item.name,
          })
        }>
        <View
          style={[
            renderComponent.textContainer,
            {
              backgroundColor: color.white[0],
              elevation: 2,
              marginVertical: 5,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 0,
              paddingBottom: 15,
            },
          ]}>
          <Image
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              width: '100%',
              borderRadius: 5,
            }}
            source={require('@pokechallenge/assets/images/map.jpg')}
          />
          <Text style={{textTransform: 'capitalize', paddingLeft: 5}}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <Text style={styles.title}>Regions</Text>
      <View style={[styles.container, {backgroundColor: color.gray[4]}]}>
        <FlatList
          numColumns={2}
          scrollEnabled={true}
          keyExtractor={keyExtractor}
          data={regions}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export const Locations = (props) => {
  const {route, navigation} = props;
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState({});
  const [textContent, setTextContent] = useState('Download Locations');
  const {region} = route.params;
  const [locations, setLocations] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const next = () => {
    let selectList = [];
    let areas = [];
    for (const key in select) {
      if (select[key]) {
        selectList.push(key);
      }
    }
    selectList.map((a) => {
      axios
        .get(`https://pokeapi.co/api/v2/location/${a}/`)
        .then((response) => {
          response.data.areas.map((l) => {
            areas.push(l);
          });
        })
        .catch((e) => {
          console.log(e);
          throw e;
        });
    });
    return areas;
  };

  const getLocations = (region) => {
    axios
      .get(`https://pokeapi.co/api/v2/region/${region}/`)
      .then((response) => {
        const locations = response.data.locations;
        setLocations(locations);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  useEffect(() => {
    getLocations(region);
  }, []);

  useEffect(() => {
    for (const key in select) {
      if (!select[key]) {
        delete select[key];
      }
    }
  }, [select]);

  useEffect(() => {
    let allSelect = {};
    locations.map((l) => {
      allSelect = {...allSelect, [l.name]: toggleCheckBox};
    });
    setSelect(allSelect);
  }, [toggleCheckBox]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!select[item.name]) {
          setSelect({...select, [item.name]: true});
        } else {
          setSelect({...select, [item.name]: false});
        }
      }}>
      <View
        style={[
          renderComponent.textContainer,
          {
            backgroundColor: select[item.name]
              ? color.yellow[0]
              : color.white[0],
          },
        ]}>
        <Text style={renderComponent.name}>{item.name.replace(/-/g, ' ')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Spinner
        visible={loading}
        color={color.red[0]}
        textContent={textContent}
        textStyle={{fontFamily: font.bold}}
      />
      <View style={styles.titleAction}>
        <Text style={styles.titleActionName}>Locations</Text>
        <Button
          style={{
            backgroundColor: color.green[0],
          }}
          contentStyle={{height: 35, flexDirection: 'row-reverse'}}
          icon={'forward'}
          mode="contained"
          loading={false}
          uppercase={false}
          labelStyle={{color: color.white[0]}}
          onPress={() => {
            console.log(select);
            navigation.navigate('Areas', {
              areas: next(),
            });
          }}>
          Get Areas
        </Button>
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.gray[3],
            padding: wp(3),
            paddingBottom: 5,
          },
        ]}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            tintColors={{
              true: color.orange[0],
            }}
            value={toggleCheckBox}
            onValueChange={(value) => {
              setToggleCheckBox(value);
            }}
          />
          <Text>Select All</Text>
        </View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          scrollEnabled={true}
          keyExtractor={keyExtractor}
          data={locations}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export const Areas = (props) => {
  const {route, navigation} = props;
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState({});
  const [textContent, setTextContent] = useState('Download Areas');
  const {areas} = route.params;
  const [locationsArea, setLocationsArea] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const next = () => {
    let selectList = [];
    let pokemons = [];
    for (const key in select) {
      if (select[key]) {
        selectList.push(key);
      }
    }
    selectList.map((p) => {
      axios
        .get(`https://pokeapi.co/api/v2/location-area/${p}/`)
        .then((response) => {
          response.data.pokemon_encounters.map((p) => {
            pokemons.push(p.pokemon);
          });
        })
        .catch((e) => {
          console.log(e);
          throw e;
        });
    });
    console.log(pokemons);
    return pokemons;
  };

  useEffect(() => {
    setTimeout(() => {
      setLocationsArea(areas);
      setLoading(false);
    }, 1000);
    console.log(areas);
  }, []);

  useEffect(() => {
    for (const key in select) {
      if (!select[key]) {
        delete select[key];
      }
    }
  }, [select]);

  useEffect(() => {
    let allSelect = {};
    locationsArea.map((l) => {
      allSelect = {...allSelect, [l.name]: toggleCheckBox};
    });
    setSelect(allSelect);
  }, [toggleCheckBox]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!select[item.name]) {
          setSelect({...select, [item.name]: true});
        } else {
          setSelect({...select, [item.name]: false});
        }
      }}>
      <View
        style={[
          renderComponent.textContainer,
          {
            backgroundColor: select[item.name]
              ? color.yellow[0]
              : color.white[0],
          },
        ]}>
        <Text style={renderComponent.name}>{item.name.replace(/-/g, ' ')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Spinner
        visible={loading}
        color={color.red[0]}
        textContent={textContent}
        textStyle={{fontFamily: font.bold}}
      />
      <View style={styles.titleAction}>
        <Text style={styles.titleActionName}>Areas</Text>

        <Button
          style={{
            backgroundColor: color.green[0],
          }}
          contentStyle={{height: 35, flexDirection: 'row-reverse'}}
          icon={'forward'}
          mode="contained"
          loading={false}
          uppercase={false}
          labelStyle={{color: color.white[0]}}
          onPress={() => {
            console.log(select);
            navigation.navigate('Pokemons', {
              pokemons: next(),
            });
          }}>
          Get Pokemons
        </Button>
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.gray[3],
            padding: wp(3),
            paddingBottom: 5,
          },
        ]}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            tintColors={{
              true: color.orange[0],
            }}
            value={toggleCheckBox}
            onValueChange={(value) => {
              setToggleCheckBox(value);
            }}
          />
          <Text>Select All</Text>
        </View>

        <FlatList
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          scrollEnabled={true}
          keyExtractor={keyExtractor}
          data={locationsArea}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export const Pokemons = (props) => {
  const {route, navigation} = props;
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState({});
  const [textContent, setTextContent] = useState('Download Pokemons');
  const {pokemons} = route.params;
  const [pokemonsEncounters, setPokemonsEncounters] = useState([]);
  const [counter, setCounter] = useState(0);

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    setTimeout(() => {
      setPokemonsEncounters(pokemons);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    for (const key in select) {
      if (!select[key]) {
        delete select[key];
      }
    }
    setCounter(Object.keys(select).length);
  }, [select]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!select[index]) {
          if (counter >= 6) {
            setVisible(true);
          } else {
            setSelect({...select, [index]: true});
          }
        } else {
          setSelect({...select, [index]: false});
        }
      }}>
      <View
        style={[
          renderComponent.textContainer,
          {
            backgroundColor: select[index] ? color.yellow[0] : color.white[0],
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Image
          style={{height: 100, width: 100}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
              item.url.split('/')[item.url.split('/').length - 2],
            )}.png`,
          }}
        />
        <Text style={renderComponent.name}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <View style={{padding: 20}}>
            <Image
              style={{
                width: wp(40),
                height: wp(60),
                alignSelf: 'center',
              }}
              source={require('@pokechallenge/assets/images/sad.png')}
            />
            <Text
              style={{
                fontSize: 16,
                color: color.gray[1],
                marginTop: 20,
              }}>
              You cannot select more than six pokemons!
            </Text>
          </View>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => setVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Spinner
        visible={loading}
        color={color.red[0]}
        textContent={textContent}
        textStyle={{fontFamily: font.bold}}
      />
      <View style={styles.titleAction}>
        <Text style={styles.titleActionName}>{counter} pokemons selected</Text>
        <Button
          style={{
            backgroundColor: counter < 3 ? color.gray[0] : color.green[0],
          }}
          disabled={counter < 3 ? true : false}
          contentStyle={{height: 35, flexDirection: 'row-reverse'}}
          icon={'forward'}
          mode="contained"
          loading={false}
          uppercase={false}
          labelStyle={{color: color.white[0]}}
          onPress={() => {
            console.log('kjhhkjhk');
          }}>
          Create Group
        </Button>
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.gray[3],
            padding: wp(3),
            paddingBottom: 5,
          },
        ]}>
        <FlatList
          numColumns={3}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          scrollEnabled={true}
          keyExtractor={keyExtractor}
          data={pokemonsEncounters}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export const Groups = (props) => {
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <Text>{email}</Text>
      </View>
    </>
  );
};

export const Clone = (props) => {
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <Text>{email}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    backgroundColor: color.white[0],
  },
  screenContent: {
    color: color.gray[1],
    fontSize: font.normal,
    marginBottom: hp(2),
  },
  title: {
    padding: wp(5),
    color: color.gray[2],
    fontFamily: font.bold,
    fontSize: font.lg,
    backgroundColor: color.white[0],
  },
  titleAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.white[0],
    paddingHorizontal: wp(5),
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: color.gray[3],
  },
  titleActionName: {
    color: color.gray[2],
    fontFamily: font.bold,
    fontSize: font.lg,
    backgroundColor: color.white[0],
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white[0],
    marginHorizontal: 3,
    marginBottom: 10,
    borderRadius: 5,
  },
});

const renderComponent = StyleSheet.create({
  textContainer: {
    flex: 1,
    margin: 3,
    padding: 10,
    borderRadius: 5,
    elevation: 1,
  },
  name: {
    textTransform: 'capitalize',
  },
});

const login = StyleSheet.create({
  logo: {
    width: hp(20),
    height: hp(20),
    marginBottom: hp(5),
    alignSelf: 'center',
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(100),
    backgroundColor: color.white[0],
  },
  container: {
    padding: wp(5),
    justifyContent: 'space-between',
  },
});

const register = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(100),
    padding: wp(5),
    backgroundColor: color.white[0],
  },
  input: {
    marginBottom: 10,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
    width: wp(90),
  },
});

const region = StyleSheet.create({
  elementList: {textTransform: 'capitalize', fontFamily: font.regular},
});
