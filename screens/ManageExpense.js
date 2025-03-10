import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../assets/constants/styles';
import CustomButton from '../components/CustomButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ExpenseForm';

const ManageExpense = ({ route, navigation }) => {
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if(isEditing) {
            expenseCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Test Update',
                    amount: 29.99,
                    date: new Date('2022-05-20'),
                }
            )
        } else {
            expenseCtx.addExpense({
                description: 'Test Add',
                amount: 19.99,
                date: new Date('2024-05-20'),
            })
        }
        navigation.goBack();
    }

    return <View style = { styles.container } >
        <ExpenseForm />
        <View style={styles.buttons} >
            <CustomButton style={styles.button} mode={'flat'} onPress={cancelHandler}>
                Cancel
            </CustomButton>
            <CustomButton style={styles.button} onPress={confirmHandler}>
                { isEditing ? 'Update' : 'Add' }
            </CustomButton>
        </View>
        { isEditing && 
            <View style = { styles.deleteContainer } >
                <IconButton 
                    icon='trash' 
                    color={GlobalStyles.colors.error50}
                    size={ 36 }
                    onPress={ deleteExpenseHandler }
                /> 
            </View>
        }    
    </View>
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})