import { IsNotEmpty } from "class-validator";

export class DeleteDTO{
    @IsNotEmpty()
    email : string;
}