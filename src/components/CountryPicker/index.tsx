import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fonts } from '../../utils/Fonts';
import country from './country.json';
import { CountryListItem, CountryProps, SelectCountryType } from './type';
import Colors from '../../utils/color';

const CountryPicker: React.FC<CountryProps> = ({ onSelectCountry, value }) => {
  // const { Colors } = useTheme();
  const [selectCountry, setSelectCountry] = useState<SelectCountryType>({
    flag: '🇺🇸',
    dial_code: '+1',
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<Array<CountryListItem>>(country);

  useEffect(() => {
    if (value) {
      const defaultValue = country.find(e => e.code === value);
      setSelectCountry({
        flag: defaultValue?.flag ?? '🇺🇸',
        dial_code: defaultValue?.dial_code ?? '+1',
      });
    }
  }, [value]);

  const renderItem: ListRenderItem<CountryListItem> = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          setSelectCountry({ flag: item.flag, dial_code: item.dial_code });
          onSelectCountry && onSelectCountry(item.dial_code);
          toggleCountry();
        }}
        style={[
          styles.listView,
          {
            borderColor: Colors.background,
            borderBottomColor:
              index == country.length - 1 ? Colors.lightGrey : Colors.lightGrey,
          },
        ]}
      >
        <Text style={styles.countryName}>{`${item.flag}  ${item.name}`}</Text>

        <Text
        // fontSize={15}
        // fontFamily="OpenSans-Medium"
        // color={Colors.primary}
        >
          {item.dial_code}
        </Text>
      </Pressable>
    );
  };

  const handleSeachCountry = (text: string) => {
    const filter = country.filter(e =>
      e.name.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filter);
  };

  const toggleCountry = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Pressable onPress={toggleCountry} style={styles.countryView}>
        <Text
        // style={styles.bottom}
        // fontSize={15}
        >
          {`${selectCountry.flag}  ${selectCountry.dial_code}`}
        </Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Pressable style={{ flex: 1 }} onPress={toggleCountry} />
          <View
            style={[styles.bottomView, { backgroundColor: Colors.background }]}
          >
            <Text style={styles.label}>Select your country code</Text>
            <View style={styles.searchInput}>
              {/* <Image
                tintColor={Colors.black}
                style={styles.searchIcon}
                source={SEARCH}
              /> */}
              <TextInput
                style={[styles.search, { color: Colors.lightGrey }]}
                placeholder="Search..."
                onChangeText={handleSeachCountry}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  countryView: { paddingVertical: 10, marginRight: 5 },
  modalView: {
    flex: 1,
    backgroundColor: '#00000033',
    justifyContent: 'flex-end',
  },
  bottom: { marginBottom: 3 },
  label: { textAlign: 'center', fontSize: 20, fontFamily: Fonts.SemiBold },
  bottomView: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    height:
      Platform.OS == 'ios'
        ? Dimensions.get('window').height / 1.5
        : Dimensions.get('window').height / 1.8,
    marginTop: Platform.OS == 'android' ? 30 : 0,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.lightGrey,
    borderWidth: 1,
    borderColor: Colors.background,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 50,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  countryName: { fontSize: 18, flex: 1 },
  searchIcon: { height: 20, width: 20 },
  search: { flex: 1, marginLeft: 20 },
});
