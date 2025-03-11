import { StyleSheet, Text, View } from 'react-native'
import InputComponent from './InputComponent'

function ExpenseForm() {

  const[inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue
      };
    })
  }
 
  return (
    <View style = { styles.form } >
      <Text style = { styles.title } >Your Expense</Text>
      <View style={ styles.inputsRow } >
        <InputComponent
          style = { styles.rowInput }
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
      />
      <InputComponent
          style = { styles.rowInput }
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
      />
      </View>
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

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
});