// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import DatePicker from "react-native-datepicker";

class FindWashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employerName: "Milkshake Media",
      location: "Atlanta, GA",
      title: "UX Designer",
      startDate: false
    };
  }


  
  renderInputfield = (headerText, placeholder, value, onChangeText, image) => {
    return (
      <View style={[styles.inputFieldView]}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(15)
          }}
        >
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          <TextInput
            style={styles.inputField}
            placeholderTextColor="#b4b4b4"
            placeholder={placeholder}
            value={value}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
        </View>
      </View>
    );
  };

  renderStartDatepicker = () => {
    return (
      <DatePicker
        style={{ width: 200 }}
        date={this.state.startDate}
        mode="date"
        placeholder="February 2018"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate={"2019-05-01"}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        style={{
          width: Metrics.screenWidth * 0.45,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#b4b4b4"
        }}
        customStyles={{
          dateIcon: {
            // marginLeft: Metrics.ratio(-40),
            // marginBottom: Metrics.ratio(10),
            //top: Metrics.ratio(10),
            elevation: 8
          },
          dateInput: { borderColor: "transparent" },
          placeholderText: {
            fontSize: Metrics.ratio(16),
            fontFamily: Fonts.type.regular,
            color: "black",
            marginRight: Metrics.ratio(10),
            backgroundColor: "green"
          }
        }}
        onDateChange={date => {
          this.setState({ startDate: date });
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={"ADD EMPLOYMENT"}
          leftIcon={"chevron-left"}
          leftBtnPress={() => {}}
          rightIcon={"plus"}
          rightBtnPress={() => {
            this.setState({ isAddAgency: true });
          }}
          rightIconStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <View
          style={{
            width: Metrics.screenWidth * 0.95,
            marginLeft: Metrics.screenWidth * 0.025,
            borderRadius: Metrics.ratio(10),
            marginTop: Metrics.ratio(10),
            marginBottom: Metrics.ratio(10),
            paddingVertical: Metrics.ratio(20),
            backgroundColor: "white",
            elevation: 8
          }}
        >
          {this.renderInputfield(
            "EMPLOYER NAME",
            "Enter EMPLOYER NAME",
            this.state.employerName,
            this.onChangeEmail,
            Images.emailIcon
          )}
          {this.renderInputfield(
            "LOCATION",
            "Enter Location",
            this.state.location,
            this.onChangeEmail,
            Images.emailIcon
          )}
          {this.renderInputfield(
            "TITLE",
            "Enter Title",
            this.state.title,
            this.onChangeEmail,
            Images.emailIcon
          )}
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: Metrics.ratio(10) }}>
              <Text
                style={{
                  color: "black",
                  fontSize: Metrics.ratio(10),
                  fontFamily: Fonts.type.demibold
                }}
              >
                START DATE
              </Text>
              {this.renderStartDatepicker()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(FindWashScreen);
