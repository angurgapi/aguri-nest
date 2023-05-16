export class UpdateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    completedLessons: number[]
}