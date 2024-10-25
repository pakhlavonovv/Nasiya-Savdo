export interface SignIn {
    username: string;
    password: string;
    massage?: string
}

export interface SignUp extends SignIn{
    first_name: string;
    last_name: string;
    email: string;
}