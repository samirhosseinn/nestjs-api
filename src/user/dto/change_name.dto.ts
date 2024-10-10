import { IsNotEmpty } from "class-validator";

export class chNameDTO {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;
}