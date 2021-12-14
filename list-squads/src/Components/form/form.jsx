import React, {Component} from 'react'
import './form.css';
import moment from 'moment';

class Form extends Component{

    constructor(props){
        super(props);
        this.nameSquad="";
        this.sprint ="1";
        this.porcent =50;
        this.days ="";
        this.dateBegin ="";
        this.dateFinal ="";
      }

      // funcao de formataçao das datas
      date(date){
        date = new Date(date);
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        var newdate = day + '/' + month + '/' + year;
        return newdate;
      }
    
      // funcao referente ao nome do squad
      _handleNameSquad(evento){
        evento.stopPropagation();
        this.nameSquad = evento.target.value;
      }
    
      // funcao referente ao numero da sprint 
      _handleSprint(evento){
        evento.stopPropagation();
        this.sprint = evento.target.value;
      }

      // funcao referente a porcentagem da sprint finalizada
      _handlePorcent(evento){
        evento.stopPropagation();
        this.porcent = evento.target.value;
        var span = document.getElementById('span-porcent')
        span.textContent = this.porcent;
      }

      // funcao referente a quantidade de dias restantes
      _handleDays(date){
        var today = moment(new Date());
        var dateFinal = moment(new Date(date));
        const duration = moment.duration(dateFinal.diff(today));


        this.days =  ' Acaba em ' + duration.asDays().toFixed(0) + ' dias'; 

        if  (duration.asDays().toFixed(0) === 0){
          this.days = 'Acaba em menos de 1 dia';
          
        }

        else if (duration.asDays().toFixed(0) < 0){
          this.days = 'Atrasado à ' + (-1 * parseInt(duration.asDays().toFixed(0)))  + ' dias';
        }
      }

      // funcao referente a data de inicio da sprint
      _handleDateBegin(evento){
        evento.stopPropagation();
        this.dateBegin= evento.target.value;
        this.dateBegin = this.date(this.dateBegin);
      }
    
      // funcao referente a data de termino da sprint
      _handleDateFinal(evento){
        evento.stopPropagation();
        this.dateFinal = evento.target.value;
        this._handleDays(this.dateFinal);
        this.dateFinal = this.date(this.dateFinal);
      }
    
      // funcao referente a criacao da tarefa
      _criarTask(evento){
        evento.preventDefault();
        evento.stopPropagation();
        this._display()
        this.props.criarTask(this.nameSquad, this.sprint, this.porcent, this.days, this.dateBegin, this.dateFinal);
      }

      // funcao referente ao fechamento do formulario
      _display(){
        var form = document.getElementById("form");
        form.style.display = 'none';
      }

    render(){
        return(
          // formulario de criaçao de novas tarefas 
          <div id="form" className="form-task">
            <form className="form-cadastro" onSubmit={this._criarTask.bind(this)}>
              <label htmlFor="nomeSquad"> Nome do Squad: </label>
              <input name="nomeSquad" type="text" placeholder="Digite o nome" onChange={this._handleNameSquad.bind(this)}/>
              <label htmlFor="sprint"> Número da Sprint: </label>
              <input name="sprint" type="number" min="0" placeholder='1' onChange={this._handleSprint.bind(this)}/>
              <label htmlFor="porcent"> Porcenta finalizada: <span id="span-porcent">50</span></label>
              <input type="range" id="input-porcent" name="points" min="0" max="100" onChange={this._handlePorcent.bind(this)}/>
              <label htmlFor="dateBegin"> Data Inicio: </label>
              <input name="dateBegin" type="date" onChange={this._handleDateBegin.bind(this)}/>
              <label htmlFor="dateFinal"> Data Final: </label>
              <input name="dateFinal" type="date" onChange={this._handleDateFinal.bind(this)}/>
              <button className="form-cadastro_submit">
                Criar Task
              </button>
            </form> 
          </div>        
        );
    }
}
export default Form
