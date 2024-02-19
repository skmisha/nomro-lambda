export type UserRequestData = {
    dayOfBirth: number;
    monthOfBirth: number;
    yearOfBirth: number;
    profession?: string;
    firstName: string;
    lastName: string;
    isMale: true;
    email: string;
    forDay: number;
    forMonth: number;
    forYear: number;
};

export type EmailSender = {
    userEmail: string;
    subject: string;
    content: string;
    attachmentPath: string;
    html?: string;
}