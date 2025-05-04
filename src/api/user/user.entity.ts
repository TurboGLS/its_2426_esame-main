export type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher';
    fullName?: string;
    picture: string;
}