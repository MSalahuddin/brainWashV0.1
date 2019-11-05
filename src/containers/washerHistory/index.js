// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image, ScrollView } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import DatePicker from "react-native-datepicker";
import { Actions } from "react-native-router-flux";
import {request as get_wash_history} from '../../actions/WashHistoryAction'
class WasherhistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employerName: "Milkshake Media",
            location: "Atlanta, GA",
            title: "UX Designer",
            startDate: false
        };
    }

    componentWillMount(){
        this.getData()
    }

    getData = () => {
        console.log('jncabksdhhaskdhasjhdkahskdshkj ')
        const {user} = this.props;
        console.log(user,'jjjjjjj7jdskajdkajskdjaskjk777778888999')
        this.props.get_wash_history()
    }
    renderOrder = () => {
        return (
            <View style={styles.statuscard}>

                <View style={styles.statusImg}>
                    <Image source={Images.profilePicture} style={styles.profileImg} />
                    <View style={styles.userDetail}>
                        <Text style={styles.userName}>JOHN DOE</Text>
                        <Text style={styles.userEmail}>doe@edu.edu</Text>
                        <Text style={styles.userEmail}>12-oct-2019</Text>

                    </View>
                    <View style={styles.amount}>
                        <Text style={
                            {
                                fontFamily: Fonts.type.demibold,
                                fontSize: Metrics.ratio(18),
                                color: 'black'
                            }
                        }>$51</Text>
                    </View>
                </View>

            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    headerText={"Wash History"}
                    leftIcon={Images.LeftArrow}
                    leftBtnPress={() => { Actions.pop() }}

                />
                <View>
                    <ScrollView style={{marginBottom:Metrics.ratio(80)}}>
                        {this.renderOrder()}
                        {this.renderOrder()}
                        {this.renderOrder()}
                        {this.renderOrder()}
                        {this.renderOrder()}
                        {this.renderOrder()}
                        {this.renderOrder()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({user:  state.userReducer.user });

const actions = {get_wash_history};

export default connect(
    mapStateToProps,
    actions
)(WasherhistoryScreen);
