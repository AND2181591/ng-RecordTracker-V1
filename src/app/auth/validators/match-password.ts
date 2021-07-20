import { Injectable } from "@angular/core";
import { FormGroup, Validator } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {
    validate(form: FormGroup) {
        const { password, passwordConfirm } = form.value;

        if (password === passwordConfirm) {
            return null;
        }
        return { passwordsDontMatch: true };
    }
}
