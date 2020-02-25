import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'


const CustomDateTimePicker = props => {
    return (
        <DatePicker
            customStyles={{
                dateInput: {
                    borderWidth: 1, borderColor: 'grey', width: '100%', marginTop: 5, marginBottom: 5
                },
                dateText: {
                    left: 0, position: "absolute", padding: 5, textAlign: 'left', marginLeft: 5,
                },
                placeholderText: {
                    marginTop: 5,
                    left: 0,
                    position: "absolute",
                    color: 'black',
                    marginLeft: 5,
                    textAlign: 'left',
                }
            }}
            showIcon={false}
            is24Hour={true}
            time={props.time}
            date={props.date}
            mode={props.mode}
            placeholder={props.placeholder}
            format={props.format}
            minDate={props.minDate}
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            onDateChange={value => {
                props.onDateChange(value)
            }}
        />

    )
}
export default CustomDateTimePicker;