import { useEffect, useState } from 'react';
import './styles/VerificationModule.css'
import ConfirmAccount from './ConfirmAccount';
import DesactiveAccount from './DesactiveAccount';
import ChangePassword from './ChangePassword';

function VerificationModule (){
    const [queryValues, setQueryValues] = useState({
        caseValue:'',
        tokenValue:''
    })

    useEffect(()=>{
        if(window.location.search.length){
            const [query1, query2] = window.location.search.split('&&')
            const caseValue = query1.split('=')[1]
            const tokenValue = query2.split('=')[1]

            const someCase = ['confirmAccount', 'desactiveAccount', 'forgotPassword', 'changePassword'].some( e => e===caseValue)
            if(someCase) setQueryValues({caseValue, tokenValue})

        }
    },[])


    return(
        <>
        {
            queryValues.caseValue==='confirmAccount'?
            <ConfirmAccount tokenValue={queryValues.tokenValue}/>
            :null
        }
        {
            queryValues.caseValue==='desactiveAccount'?
            <DesactiveAccount tokenValue={queryValues.tokenValue}/>
            :null
        }
        {
            queryValues.caseValue==='forgotPassword'|| queryValues.caseValue==='changePassword'?
            <ChangePassword caseValue={queryValues.caseValue} tokenValue={queryValues.tokenValue}/>
            :null
        }
        </>
    )
}

export default VerificationModule;