import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { VisitantesService } from './../../services/visitantes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-visitantes-details',
  templateUrl: './visitantes-details.component.html',
  styleUrls: ['./visitantes-details.component.scss']
})
export class VisitantesDetailsComponent implements OnInit {

  constructor(
    private service: VisitantesService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numeroApto: number }[] = [];
  isEdit = false;//diz se a página se trata de uma inserção ou edição. por padrão, considera-se uma adição
  id!: number;

  visitantesForm = this.form.group({
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
        this.visitantesForm.patchValue(response);
      }
    });
  }

  changePage(x: string){
    this.router.navigate([x]);
  }

  create(){
    const data = this.visitantesForm.value;
    this.service.create(data).subscribe({
      next:()=>{
        this.confirmDialog("Visitante Adicionado com sucesso!")
        this.visitantesForm.reset();
        this.router.navigate(['/visitantes']);
      },
      error:()=>{
        this.confirmDialog("Erro ao adicionar visitante.")
      },
    });
  }

  update(){//nome antigo estava como save
    const data = this.visitantesForm.value;
    console.log(data);
    this.service.update(data, this.id).subscribe({
      next:()=>{
        this.confirmDialog("Registro de Visitante Atualizado com sucesso! :)")
        this.router.navigate(['/visitantes']);
      },
      error:()=>{
        this.confirmDialog("Erro ao registrar Visitante :(")
      }
    })
  }

  confirmDialog(msg: any){
    this.dialog.open(DialogConfirmacaoComponent,
      {data: msg}
    )
  }
}
