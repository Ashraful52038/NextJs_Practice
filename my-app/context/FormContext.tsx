'use client';

import { createContext, ReactNode, useContext, useState } from "react";

interface FormData {
    email: string;
    password: string;
    name: string;
    shippingAddress: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface FormContextType{
    formData: FormData;
    updateFormData:(data:Partial<FormData>)=>void;
    resetFormData:()=>void;
}

const defaultFormData:FormData = {
    email:'',
    password:'',
    name:'',
    shippingAddress:'',
    phone:'',
    cardNumber:'',
    expiryDate:'',
    cvv:'',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error ('useFormContext must be used within FormProvider');
    }
    return context;
}

interface FormProviderProps{
    children:ReactNode;
}

export const FormProvider: React.FC<FormProviderProps>=({children})=>{
    const[formData, setFormData] = useState<FormData>(defaultFormData);

    const updateFormData = (data: Partial<FormData>)=>{
        setFormData(prev=>({...prev,...data}));
    };

    const resetFormData=()=>{
        setFormData(defaultFormData);
    };

    return (
        <FormContext.Provider value={{formData,updateFormData,resetFormData}}>
            {children}
        </FormContext.Provider>
    );
};