import './Assets/App.css';
import  Dashboard from './Components/dashboard'
import  Form from './Components/form'
import  NavBar from './Components/navbar'
import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      tasks:[]
    };
    this.getData();
    this.modal = false;
  }

  // manda para o array todos os dados armazenados no arquivo .json
  getData(){
    axios.get('http://localhost:800/tasks').then(resp => {
      resp.data.map((task, index) => {
        const newtask = [task]
        const newArrayTasks = [...this.state.tasks, ...newtask]
        const newState = {
          tasks:newArrayTasks
        }
        return this.setState(newState) 
      });
    });
  }

  // recebe os dados do formulario e armazena no arquyivo .json
  criarTask(nameSquad, sprint, porcent, days, dateBegin, dateFinal){
    let task = {
      nameSquad: nameSquad,
      sprint: sprint,
      porcent: porcent,
      days: days,
      dateBegin: dateBegin,
      dateFinal: dateFinal
    };
    axios.post('http://localhost:800/tasks', task);
    const newtask = [task]
    const newArrayTasks = [...this.state.tasks, ...newtask]
    const newState = {
      tasks:newArrayTasks
    }
    this.setState(newState)
  }

  // funcao recebe o parametro verdadeiro para a abertura do formulario
  handlerOpenForm(bool){
    this.setState((state) => {
      return this.modal = bool
    });
     
  }
  
  render(){
    return (
      <section>
        {/* retorna os componentes navbar, modal e dashboard */}
        <NavBar/>
        {this.modal ? <Form modal={this.modal} criarTask={this.criarTask.bind(this)}/> : null}
        {this.modal = false}
        <Dashboard handlerOpenForm={this.handlerOpenForm.bind(this)} tasks={this.state.tasks}/>
      </section>
    );
  }
}

export default App;
