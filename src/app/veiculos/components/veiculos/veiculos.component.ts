import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { VeiculosService } from '../../service/veiculos.service'
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  veiculos = new MatTableDataSource();
  displayedColumns =['idApto','placa','marca','modelo','cor','acoes'];

  constructor(
    private service: VeiculosService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  filterControl = new FormControl('');
  length!: number;
  pageSize: number = 10;
  page: number = 0;

  veiculosForm = this.form.group({
    idApto:[null,[Validators.required]],
    idApartamento:[null,[Validators.required]],
    placa:[null,[Validators.required]],
    marca:[null,[Validators.required]],
    modelo:[null,[Validators.required]],
    cor:[null,[Validators.required]]
  })

  pageChange(pageEvent: PageEvent){
    this.service.findAll(pageEvent, this.filterControl.value).subscribe({
      next: response => {
        this.veiculos.data=response.content;
        this.length = response.totalElements;
        this.pageSize = response.size;
        this.page = pageEvent.pageIndex;
      },
      error:()=> console.log("Erro ao carregar")
    });
  }
  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.service.findAll({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.length,
      },
        query).subscribe(response => {
          this.veiculos.data = response.content;
      });
    })

    this.pageChange({pageIndex: this.page, pageSize: this.pageSize, length: this.length})
  }

  delete(id: any) {
    this.service.delete(id).subscribe({
      next: () => {
        this.confirmDialog("Registro excluído com sucesso!");
        this.pageChange({
          pageIndex: this.page,
          pageSize: this.pageSize,
          length: this.length,
        });
      },
      error: () => {
        this.confirmDialog("O registro não pôde ser excluído.");
      }
    });
}

openDialog(id : number) {
  const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {data: "Deseja Excluir o Registro?"});
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.delete(id);
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
