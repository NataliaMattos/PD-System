import React, {Component} from 'react'
import {Box, Grid, Container, LinearProgress} from '@material-ui/core';
import {IoAdd} from 'react-icons/io5'
import {IoIosRocket} from 'react-icons/io'
import {FiCalendar} from 'react-icons/fi'
import {AiOutlineClockCircle} from 'react-icons/ai'
import './dashboard.css'

class Dashboard extends Component{

    // funcao recebe o parametro para a abertura do modal
    handleOpenForm(){
        this.props.handlerOpenForm(true);
    }

    render(){
        return(
            <section>
                {/* sessao da pagina contendo o subtitulo */}
                <div className="subtitle">
                    <Container> Squads</Container>
                </div>
                {/* sessao da pagina contendo os cards */}
                <Container>
                    <Box m={5}>
                        <Grid container spacing={5}>
                            {/* Card para adição de novas tasks */}
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <div className="card-add card"  onClick={this.handleOpenForm.bind(this)}>
                                    <IoAdd size="5em"/>
                                </div>
                            </Grid>
                            {/* Card de tasks alimentada pelo array de dados salvos no arquivo .json */}
                            {this.props.tasks.map((task, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <div className="card-task card">
                                            <Container>
                                                <h3 className="card-title">
                                                    {task.nameSquad}
                                                </h3>
                                                <h4 className="card-subtitle">
                                                    <IoIosRocket id="subtitle-icon"/> Sprint {' ' + task.sprint}
                                                </h4>
                                                <Grid className="card-progressbar">
                                                    <LinearProgress className="progressbar-content" variant="determinate" value={parseInt(task.porcent)}/>   
                                                    <div className="progressbar-text"><AiOutlineClockCircle id="progressbar-icon"/>
                                                        {task.days}
                                                    </div>
                                                </Grid>
                                                <Grid className="card-date" >
                                                    <FiCalendar id="date-icon"/>Início: <div  className="date-text">{task.dateBegin}</div>
                                                </Grid>
                                                <Grid className="card-date" >
                                                    <FiCalendar id="date-icon"/>Fim: <div  className="date-text">{task.dateFinal}</div>
                                                </Grid>
                                            </Container>
                                        </div>
                                    </Grid>
                                )
                            })}   
                        </Grid>
                    </Box>
                </Container>
            </section>
        );
    }
}
export default Dashboard


