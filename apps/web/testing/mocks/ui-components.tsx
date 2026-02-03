import React from 'react';

export const Button = (props: any) => <button {...props} />;
export const Form = ({ children }: any) => <>{children}</>;
export const FormControl = ({ children }: any) => <>{children}</>;
export const FormField = ({ render }: any) => render({ field: { value: '', onChange: () => { }, onBlur: () => { } } });
export const FormItem = ({ children }: any) => <div>{children}</div>;
export const FormLabel = ({ children }: any) => <label>{children}</label>;
export const FormMessage = () => <span>Message</span>;
export const Input = (props: any) => <input {...props} />;
export const useToast = () => ({ toast: () => { } });
export const createClient = () => ({ auth: { signUp: () => { } } });
