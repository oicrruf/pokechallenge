import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import firebase, {validateEmail} from '@pokechallenge/utils';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import Clipboard from '@react-native-clipboard/clipboard';
import CryptoJS from 'react-native-crypto-js';

firebase.firestore().settings({experimentalForceLongPolling: true});

const db = firebase.firestore(firebase);

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
                Sign In
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
              borderRadius: 3,
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
  const [visible, setVisible] = useState(false);
  const {email, uid} = firebase.auth().currentUser;

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
              style={styles.imageModal}
              source={require('@pokechallenge/assets/images/sad.png')}
            />
            <Text style={styles.textModal}>
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
            let newGroup = {group: []};
            for (const key in select) {
              newGroup.group.push(pokemonsEncounters[key]);
            }
            db.collection(uid)
              .add(newGroup)
              .then(() =>
                ToastAndroid.show(
                  'You have created a new group!',
                  ToastAndroid.LONG,
                ),
              )
              .then(() => {
                setTimeout(() => {
                  setSelect({});
                }, 1000);
              })
              .catch((e) => {
                console.log(e);
              });
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
  const [group, setGroup] = useState([]);
  const [visible, setVisible] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [copiedText, setCopiedText] = useState('');
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    db.collection(uid)
      .get()
      .then((response) => {
        const pokemons = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          pokemons.push(data);
        });
        pokemons.length == 0 && setLoading(false);
        setGroup(pokemons);
      });
    group.length > 0 && setLoading(false);
  }, [group]);

  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(item);
      }}>
      <View style={groups.carrousel}>
        {item.group.map((p, i) => {
          return (
            <View key={i} style={groups.pokemonBox}>
              <Image
                style={groups.pokemonImage}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(
                    p.url.split('/')[p.url.split('/').length - 2],
                  )}.png`,
                }}
              />
              <View style={groups.pokemonInfo}>
                <Text style={groups.pokemonName}>{p.name}</Text>
                <Text style={groups.pokemonId}>
                  {parseInt(p.url.split('/')[p.url.split('/').length - 2])}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={groups.carrouselFooter}>
          <IconButton
            icon="delete"
            color={color.gray[0]}
            size={25}
            onPress={() => {
              setVisible(true), setItemDelete(item.id);
            }}
          />
          <IconButton
            icon="share"
            color={color.gray[0]}
            size={25}
            onPress={() => {
              Clipboard.setString(
                CryptoJS.AES.encrypt(
                  JSON.stringify({owner: uid, group: item.id}),
                  '@pokechallenge',
                ).toString(),
              ),
                ToastAndroid.show(
                  'Your code is on the clipboard',
                  ToastAndroid.LONG,
                );
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <View style={{padding: 20}}>
            <Image
              style={styles.imageModal}
              source={require('@pokechallenge/assets/images/sad.png')}
            />
            <Text style={styles.textModal}>
              Are you sure you want to delete this group?
            </Text>
          </View>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                db.collection(uid).doc(itemDelete).delete(), setVisible(false);
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={[
          styles.titleAction,
          {height: 58, backgroundColor: color.white[0]},
        ]}>
        <Text style={styles.titleActionName}>
          You have a total of {group.length} groups
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.gray[4],
            paddingVertical: hp(1),
          },
        ]}>
        <Carousel
          data={group}
          renderItem={renderItem}
          sliderWidth={wp(100)}
          itemWidth={wp(80)}
        />
      </View>
    </>
  );
};

export const Clone = (props) => {
  const [loading, setLoading] = useState(false);
  const {email, uid} = firebase.auth().currentUser;
  const [code, setCode] = useState('');
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={{padding: wp(5)}}>
            <TextInput
              autoCorrect={false}
              style={register.input}
              label="Your code here"
              onChangeText={(c) => setCode(c)}
            />
            <Button
              style={{
                backgroundColor: code == '' ? color.gray[0] : color.green[0],
              }}
              disabled={code == '' ? true : false}
              contentStyle={{height: 35, flexDirection: 'row-reverse'}}
              icon={'clipboard'}
              mode="contained"
              loading={loading}
              uppercase={false}
              labelStyle={{color: color.white[0]}}
              onPress={() => {
                setLoading(true);
                let bytes = CryptoJS.AES.decrypt(code, '@pokechallenge');
                let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                console.log(decrypted);
                var doc = db.collection(decrypted.owner).doc(decrypted.group);
                doc
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      const save = async () => {
                        const data = await doc.data();
                        db.collection(uid)
                          .add(data)
                          .then(
                            () =>
                              ToastAndroid.show(
                                'You have created a new group!',
                                ToastAndroid.LONG,
                              ),
                            setCode(''),
                          )
                          .catch((e) => {
                            console.log(e);
                          });
                      };
                      save();
                      setLoading(false);
                    } else {
                      console.log('No such document!');
                    }
                  })
                  .catch(function (error) {
                    console.log('Error getting document:', error);
                  });
              }}>
              Clone Group
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  imageModal: {
    width: wp(40),
    height: wp(60),
    alignSelf: 'center',
  },
  textModal: {
    fontSize: 16,
    color: color.gray[1],
    marginTop: 20,
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

const groups = StyleSheet.create({
  carrousel: {
    backgroundColor: color.white[0],
    marginVertical: wp(1),
    marginHorizontal: wp(0),
    borderRadius: 5,
    paddingVertical: 5,

    alignContent: 'stretch',
    height: hp(75),
  },
  pokemonBox: {
    paddingTop: hp(1),
    paddingHorizontal: hp(2),
    flexDirection: 'row',
  },
  pokemonImage: {
    height: hp(9),
    width: hp(9),
    alignSelf: 'center',
    backgroundColor: color.gray[3],
    marginVertical: hp(0.3),
    borderRadius: 5,
  },
  pokemonInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: wp(5),
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  pokemonName: {
    fontSize: font.lg,
    fontFamily: font.bold,
    color: color.gray[2],
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: font.normal,
    color: color.gray[0],
    textTransform: 'capitalize',
  },
  carrouselFooter: {
    marginTop: hp(1),
    width: '100%',
    height: hp(9),
    position: 'absolute',
    bottom: 0,
    borderRadius: 3,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.gray[1],
  },
});
