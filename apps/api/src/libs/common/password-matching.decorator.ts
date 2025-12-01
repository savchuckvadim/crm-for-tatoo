import { RegisterDto } from "@/modules/auth/dto/auth.dto";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
    implements ValidatorConstraintInterface {


    public validate(passwordRepeat: string, args: ValidationArguments) {
        const obj = args.object as RegisterDto;
        return passwordRepeat === obj.password;
    }
    public defaultMessage(args: ValidationArguments) {
        return `Passwords do not match`;
    }
}