import React, { Component } from "react";
import axios from "axios";
import {
forget_password,
verify_reset_code,
reset_password,

} from "./WebServices";
import moment from "moment";
import qs from 'qs';


export const resetPassword = data => {
    console.log(data);
    // return {success:true};
    // const bearer = Bearer ${data.access_token};
    const body = qs.stringify(data);
    // return {success:true}
    return new Promise((resolve, reject) => {
      axios
        .post(reset_password, body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            //Authorization: bearer
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
   };
export  const VerifyresetCode = data => {
    console.log(data);
    // return {success:true};
    // const bearer = Bearer ${data.access_token};
    const body = qs.stringify(data);
    // return {success:true}
    console.log()
    return new Promise((resolve, reject) => {
      axios
        .post(`${verify_reset_code}${data.verification_code}`, {
          headers: {
            "Content-Type": "application/json"
            //Authorization: bearer
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
   };
 export const forgetPassword = data => {
    console.log(data, "datttttttttttttt");
    // return {success:true}
    // const bearer = Bearer ${data.access_token};
    return new Promise((resolve, reject) => {
      axios
        .get(`${forget_password}${data}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
   };
