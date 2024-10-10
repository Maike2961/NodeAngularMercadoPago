import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
