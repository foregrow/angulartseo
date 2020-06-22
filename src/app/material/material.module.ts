import { NgModule } from '@angular/core';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
 import { MatInputModule} from '@angular/material/input';
const materialComponents =[
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
