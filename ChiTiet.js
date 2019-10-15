import React from 'react';
import { FlatList, ActivityIndicator, TouchableHighlight, Text, View, Image } from 'react-native';

export default class TruyenCuoi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
            ,
            anh: '', tieude: '', noidung: '', theloai: '', thoigian: ''

        }

    }
    static navigationOptions = {
        title: 'Truyện Đọc',
      };
    _NoiDung() {
        var arr = this.state.noidung.split('-');
        return arr;
    }
    componentDidMount() {
        return fetch('http://10.0.3.3:8080/truyen/chitiet.php?id=' + this.props.navigation.getParam("id", 0))
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    anh: responseJson.anh,
                    tieude: responseJson.tieude,
                    noidung: responseJson.noidung,
                    thoigian: responseJson.thoigian,
                    theloai: responseJson.theloai,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Text style={{fontSize:20}}>{this.state.tieude}</Text>
                <Image source={{ uri: this.state.anh }} style={{ width: 400, height: 200 }} />
                {/* <Text>{this.state.noidung}</Text> */}
                <FlatList
                    data={this._NoiDung()}
                    renderItem={({ item }) => <Text >{item}</Text>}
                />

            </View>
        );
    }
}

