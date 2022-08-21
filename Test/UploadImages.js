import { View, Text } from 'react-native'
import React from 'react'

const UploadImages = () => {

    const options = {
        selectionLimit:0
        };
    
      const [pic, setPic] = useState([])
    
      const pickImage = () => {
        launchImageLibrary(options).then(
          res => {
            // console.log(res)
            setPic(res.assets)
          }
    
        ).catch(
          err => console.log(err)
        )
      }
      // console.log(JSON.stringify(pic))
    
      const upload = async () => {
        let data = new FormData();
        console.log("upload start")
        data.append('profile-file', {
          uri: pic.uri,
          name: pic.fileName,
          type: pic.type
        })
    
    
        await axios.post("http://192.168.0.9:4000/profile-upload-single", data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
    
            },
    
          }, { withCredentials: true }).then(res => console.log("image respose = >", res)).catch(err => console.log(err))
      }
    
    
      const upload2 = async () => {
        let data = new FormData();
        console.log("upload start")
    
        pic.forEach((item,i)=>{
          data.append('profile-files', {
            uri: item.uri,
            name: item.fileName,
            type: item.type
          })
        })
       
    
    
        await axios.post("http://192.168.0.9:4000/profile-upload-multiple", data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
    
            },
    
          }, { withCredentials: true }).then(res => console.log("image respose = >", res)).catch(err => console.log(err))
      }
  return (
    <View>
      <Text>UploadImages</Text>
    </View>
  )
}

export default UploadImages