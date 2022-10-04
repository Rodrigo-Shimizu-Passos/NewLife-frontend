import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { MoradoresService } from './../services/moradores.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-moradores-details',
  templateUrl: './moradores-details.component.html',
  styleUrls: ['./moradores-details.component.scss']
})
export class MoradoresDetailsComponent implements OnInit {

  constructor(
    private service: MoradoresService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numeroApto: number }[] = [];
  isEdit = false;//diz se a página se trata de uma inserção ou edição. por padrão, considera-se uma adição
  id!: number;

  moradoresForm = this.form.group({
    idApto:[null,[Validators.required]],
    nome:[null,[Validators.required]],
    rg:[null,[Validators.required]],
    cpf:[null,[Validators.required]],
    telefone1:[null,[Validators.required]],
    telefone2:[],
    email:[null,[Validators.required]],
    contatoEmerg:[],
    telefoneEmerg:[],
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
        this.moradoresForm.patchValue(response);
      }
    });
  }


  changePage(x: string){
    this.router.navigate([x]);
  }

  create(){
    const data = this.moradoresForm.value;
    this.service.create(data).subscribe({
      next:()=>{
        this.confirmDialog("Morador Adicionado com sucesso!")
        this.moradoresForm.reset();
        this.router.navigate(['/moradores']);
      },
      error:()=>{
        this.confirmDialog("Erro ao adicionar morador.")
      },
    });
  }

  save(){
    const data = this.moradoresForm.value;
    console.log(data);
    this.service.update(data, this.id).subscribe({
      next:()=>{
        this.confirmDialog("Registro de Morador Atualizado com sucesso! :)")
        this.router.navigate(['/moradores']);
      },
      error:()=>{
        this.confirmDialog("Erro ao registrar morador :(")
      }
    })
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {data: "Deseja Excluir o Registro?"});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.create();
      }
    }
    );
  }

  openDialogSave() {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {data: "Deseja Excluir o Registro?"});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.save();
      }
    }
    );
  }


  confirmDialog(msg: any){
    this.dialog.open(DialogConfirmacaoComponent,
      {data: msg}
    )
  }
}
