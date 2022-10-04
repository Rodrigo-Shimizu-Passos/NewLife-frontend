import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FuncionariosService } from './../../services/funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';


@Component({
  selector: 'app-funcionarios-details',
  templateUrl: './funcionarios-details.component.html',
  styleUrls: ['./funcionarios-details.component.scss']
})
export class FuncionariosDetailsComponent implements OnInit {

  constructor(
    private service: FuncionariosService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numeroApto: number }[] = [];
  isEdit = false;//diz se a página se trata de uma inserção ou edição. por padrão, considera-se uma adição
  id!: number;

  funcionariosForm = this.form.group({
    idApto:[null,[Validators.required]],
    nome:[null,[Validators.required]],
    rg:[null,[Validators.required]],
    cpf:[null,[Validators.required]],
    telefone1:[null,[Validators.required]],
    telefone2:[],
    obs:[]
  })

  ngOnInit(): void {
    this.service.findAllAptos().subscribe(
      (response)=>{
        this.aptoList=response;
      }
    )
    this.route.params.subscribe({
      next: (params)=>{
        this.isEdit = params['id'] !== 'new';
        this.id = params['id'];
      }
    });

    if(this.isEdit){
      this.patch();
    }
  }

  patch(){
    this.service.getById(this.id).subscribe({
      next: (response)=>{
        this.funcionariosForm.patchValue(response);
      }
    });
  }

  changePage(x: string){
    this.router.navigate([x]);
  }

  create(){
    const data = this.funcionariosForm.value;
    this.service.create(data).subscribe({
      next:()=>{
        this.confirmDialog("Funcionário Adicionado com sucesso!")
        this.funcionariosForm.reset();
        this.router.navigate(['/funcionarios']);
      },
      error:()=>{
        this.confirmDialog("Erro ao adicionar Funcionário.")
      },
    });
  }

  update(){//nome antigo estava como save
    const data = this.funcionariosForm.value;
    console.log(data);
    this.service.update(data, this.id).subscribe({
      next:()=>{
        this.confirmDialog("Registro de Funcionário Atualizado com sucesso!")
        this.router.navigate(['/funcionarios']);
      },
      error:()=>{
        this.confirmDialog("Erro ao registrar Funcionário :(")
      }
    })
  }

  confirmDialog(msg: any){
    this.dialog.open(DialogConfirmacaoComponent,
      {data: msg}
    )
  }

}
