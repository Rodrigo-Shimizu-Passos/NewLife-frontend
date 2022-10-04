import { DialogConfirmacaoComponent } from '../../shared/dialog-confirmacao/dialog-confirmacao.component';
import { MoradoresService } from './../services/moradores.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.component.html',
  styleUrls: ['./moradores.component.scss']
})
export class MoradoresComponent implements OnInit {

  moradores = new MatTableDataSource();
  displayedColumns =['idApto','nome','rg','cpf','telefone1',
  'telefone2','email','contatoEmerg','telefoneEmerg','obs','acoes'];

  constructor(
    private moradoresService: MoradoresService,
    private form: FormBuilder,
    public dialog: MatDialog
    ) {
  }

  filterControl = new FormControl('');
  length!: number;
  pageSize: number = 10;
  page: number = 0;

  moradoresForm = this.form.group({
    idApto:[null,[Validators.required]],
    idApartamento:[null,[Validators.required]],
    nome:[null,[Validators.required]],
    rg:[null,[Validators.required]],
    cpf:[null,[Validators.required]],
    telefone1:[null,[Validators.required]],
    telefone2:[null],
    email:[null,[Validators.required]],
    contatoEmerg:[null],
    telefoneEmerg:[null],
    obs:[null]
  })

  pageChange(pageEvent: PageEvent){
    this.moradoresService.findAll(pageEvent, this.filterControl.value).subscribe({
      next: response => {
        this.moradores.data=response.content;
        this.length = response.totalElements;
        this.pageSize = response.size;
        this.page = pageEvent.pageIndex;
      },
      error:()=> console.log("Erro ao carregar")
    });
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.moradoresService.findAll({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.length,
      },
        query).subscribe(response => {
          this.moradores.data = response.content;
      });
    })

    this.pageChange({pageIndex: this.page, pageSize: this.pageSize, length: this.length})
  }

  new: string = "new";

  delete(id: any) {
      this.moradoresService.delete(id).subscribe({
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

  downloadAllRequests(query?: string | null){
    this.moradoresService.findAllList(query).subscribe( response => {
      import("xlsx").then(xlsx => {
        const header:any[][] = [[
            'Apartamento',
            'Morador',
            'RG',
            'CPF',
            'Telefone Primário',
            'Telefone Secundário',
            'Email',
            'Contato de Emergência',
            'Telefone Emergência',
            'Observações'
        ]];
        let ws: any = xlsx.utils.book_new();
        xlsx.utils.sheet_add_aoa(ws,header);
        xlsx.utils.sheet_add_json(
          ws,
          response,
          {
            header: [
              'idApto',
              'nome',
              'rg',
              'cpf',
              'telefone1',
              'telefone2',
              'email',
              'contatoEmerg',
              'telefoneEmerg',
              'obs'
            ],skipHeader: true,origin: 'A2'});
        const workbook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        ws['!cols'] = [{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100}]
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Moradores_NewLife");
      });
    });
  }



  exportExcel(){
    if(this.filterControl.value != ''){
      this.downloadAllRequests(this.filterControl.value);
    }else{
      this.downloadAllRequests();
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fs.saveAs(
      data,
      fileName + EXCEL_EXTENSION
    );
  }
}
