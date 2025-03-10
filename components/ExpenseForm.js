import React from 'react'
import { View } from 'react-native'
import InputComponent from './InputComponent'

function amountChangedHandler() {}

function ExpenseForm() {
  return (
    <View>
     <InputComponent
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler,
        }}
    />
    <InputComponent
        label="Date"
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <InputComponent
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'none',
          autoCorrect: true //default is true
        }}
      />
    </View>
  )
}

export default ExpenseForm