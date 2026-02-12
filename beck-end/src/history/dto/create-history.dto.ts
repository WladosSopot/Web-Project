import { IsNotEmpty, IsString } from "class-validator";

export class CreateHistoryDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;
}