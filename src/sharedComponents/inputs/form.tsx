import React from 'react';
import {
    useForm, FieldValues, SubmitHandler,
} from 'react-hook-form';

type FormProps<
TFormValues extends FieldValues,
> = {
    onSubmit: SubmitHandler<TFormValues>
    children: React.ReactNode;
    defaultValues?:any;
    resolver: any;
    formClass?: string;
  }

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
    resolver,
    children,
    defaultValues,
    onSubmit,
    formClass,
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>({ resolver, defaultValues });

    const {
        register,
        control,
        formState: { errors },
    } = methods;

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} className={formClass} noValidate>
            {Array.isArray(children)
                ? children.map(child => (child.props && child.props.name
                    ? React.createElement(child.type, {
                        ...{
                            ...child.props,
                            register,
                            key: child.props.name,
                            errors,
                            control,
                        },
                    })
                    : child))
                : children}
        </form>
    );
};

export default Form;
