import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  ImageBackground 
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from '../../styles/styles';
import CustomButton from '../common/CustomButton';
import CenterWrapper from '../common/CenterWrapper';


const ProfileEdit = () => {


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
 const [foodImage, setFoodImage] = useState("");
 const [imagePath, setImagePath] = useState("");

   // Handles caching of uploaded image
   const handleUpload = async () => {
    // permission to access phone camera
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted == false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // opens file explorer to upload image
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    // if user cancels upload
    if (pickerResult.cancelled === true) {
      return;
    }

    setFoodImage(pickerResult);
    setImagePath(pickerResult.uri);
  };
    
    
    
  const handleConfirm = async () => {
    alert("You succesfully updated your profile!");

    navigation.navigate("Profile Details");
  };

    
  
  const handleCancel = () => {
    navigation.goBack();
  };
   

  // ... other functions and logic

  return (
    <View>
    <Pressable onPress={handleUpload}>
      <ImageBackground
        style={styles.foodBannerImage}
        source={
          !imagePath || imagePath == ""
            ? require("../../assets/images/no-image.jpg")
            : { uri: imagePath }
        }
      >
        <Text style={styles.foodBannerImageText}>Upload New Store Image</Text>
      </ImageBackground>
      </Pressable>
      <CenterWrapper>
      <View style={profileStyles.propertyContainer}>
            <Text style={profileStyles.field}>{auth.currentUser.email}</Text>
          </View>
        <Field
          label={"name"}
          value={name}
          placeholder={"Enter your name here"}
          callback={setName}
        />
        <Field
          label={"phone number"}
          value={phone}
          placeholder={"{auth.currentUser.email}"}
          callback={setPhone}
        />
        <Field
          label={"Location"}
          value={location}
          placeholder={"Enter you new business location here"}
          callback={setLocation}
        />
        <CustomButton
          callback={handleConfirm}
          content={"Confirm"}
          cstyle={[styles.button, { marginTop: 20 }]}
        />
        <CustomButton
          callback={handleCancel}
          content={"Cancel"}
          cstyle={styles.buttonSecondary}
        />
      </CenterWrapper>
    </View>
  );
};

const profileStyles = StyleSheet.create({
 
  propertyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

    // fontWeight: "bold",

  field: {
    // fontSize: 18,
    // fontWeight: "bold",
  },
});
  


export default ProfileEdit;
