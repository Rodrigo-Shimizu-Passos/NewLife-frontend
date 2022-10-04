import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { VisitantesService } from './../../services/visitantes.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss']
})
export class VisitantesComponent implements OnInit {

  visitantes = new MatTableDataSource();
  displayedColumns =['idApto','nome','rg','cpf','telefone1',
  'telefone2','obs','acoes'];

  constructor(
    private service: VisitantesService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  filterControl = new FormControl('');
  length!: number;
  pageSize: number = 10;
  page: number = 0;

  visitantesForm = this.form.group({
    idApto:[null,[Validators.required]],
    idApartamento:[null,[Validators.required]],
    nome:[null,[Validators.required]],
    rg:[null,[Validators.required]],
    cpf:[null,[Validators.required]],
    telefone1:[null,[Validators.required]],
    telefone2:[null],
    obs:[null]
  })

  pageChange(pageEvent: PageEvent){
    this.service.findAll(pageEvent, this.filterControl.value).subscribe({
      next: response => {
        this.visitantes.data=response.content;
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
          this.visitantes.data = response.content;
      });
    })

    this.pageChange({pageIndex: this.page, pageSize: this.pageSize, length: this.length})
  }

  delete(id: any) {
      this.service.delete(id).subscribe({
        next: () => {
          this.confirmDialog("Visitante excluído com sucesso!");
          this.pageChange({
            pageIndex: this.page,
            pageSize: this.pageSize,
            length: this.length,
          });
        },
        error: () => {
          this.confirmDialog("O visitante não pôde ser excluído.");
        }
      });
  }

  openDialog(id : number) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {data: "Deseja Excluir o Visitante?"});
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
