import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { PagamentoService } from '../../services/pagamento.service';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { link } from 'fs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CpfPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [CpfPipe]
})
export class FormComponent implements OnInit{
  cardForm!: FormGroup

  linkAcesso: string | null = null

  constructor(private service: PagamentoService, private maskcpf: CpfPipe){}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]),
    });
    this.cardForm.get('cpf')?.valueChanges.subscribe((i)=>{
      console.log(i)
      const formato = this.maskcpf.transform(i)
      this.cardForm.get('cpf')?.setValue(formato)
    })
  }

  OnSubmit() {
    if(this.cardForm.valid){
      const dados = {
        email: this.cardForm.value.email,
        nome: this.cardForm.value.nome,
        ultimo_nome: this.cardForm.value.last_name,
        telefone: this.cardForm.value.cpf
      }
      this.service.postPag(dados).subscribe((i)=>{
        this.linkAcesso = i.link
      })
      this.cardForm.reset()
    }
  }
}
