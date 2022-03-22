export class PostUserBodyDto {
    email: string;
    name: string;
}
export class PostUserServiceDto extends PostUserBodyDto{
    userID: string;
}