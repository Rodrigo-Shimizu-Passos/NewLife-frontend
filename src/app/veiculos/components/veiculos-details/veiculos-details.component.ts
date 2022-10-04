import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { VeiculosService } from './../../service/veiculos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-veiculos-details',
  templateUrl: './veiculos-details.component.html',
  styleUrls: ['./veiculos-details.component.scss']
})
export class VeiculosDetailsComponent implements OnInit {

  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numeroApto: number }[] = [];
  isEdit = false;//diz se a página se trata de uma inserção ou edição. por padrão, considera-se uma adição
  id!: number;

  veiculosForm = this.form.group({
    idApto:[null,[Validators.required]],
    placa:[null,[Validators.required]],
    marca:[null,[Validators.required]],
    modelo:[null,[Validators.required]],
    cor:[null,[Validators.required]]
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
        this.veiculosForm.patchValue(response);
      }
    });
  }

  changePage(x: string){
    this.router.navigate([x]);
  }

  create(){
    const data = this.veiculosForm.value;
    this.service.create(data).subscribe({
      next:()=>{
        this.confirmDialog("Veículo Adicionado com sucesso!")
        this.veiculosForm.reset();
        this.router.navigate(['/veiculos']);
      },
      error:()=>{
        this.confirmDialog("Erro ao adicionar veículo.")
      },
    });
  }

  update(){//nome antigo estava como save
    const data = this.veiculosForm.value;
    console.log(data);
    this.service.update(data, this.id).subscribe({
      next:()=>{
        this.confirmDialog("Registro de Veiculo Atualizado com sucesso! :)")
        this.router.navigate(['/veiculos']);
      },
      error:()=>{
        this.confirmDialog("Erro ao registrar Veiculo :(")
      }
    })
  }

  confirmDialog(msg: any){
    this.dialog.open(DialogConfirmacaoComponent,
      {data: msg}
    )
  }

}
