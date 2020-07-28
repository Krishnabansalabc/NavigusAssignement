import React, { Component, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'username', label: 'UserName', minWidth: 170 },
    {
        id: 'lastVisited',
        label: 'Last Visited',
        minWidth: 170,
        align: 'right',
    },
];

class VisitedViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: [],
            name: ''
        }
    }

    componentDidMount() {
        if (localStorage.length > 0) {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)

            axios.get('http://localhost:5000/viewers')
                .then(res => {
                    this.setState({ rows: res.data, name: decoded.name })
                })

                .catch((error) => {
                    console.log(error)
                })
        } else {
            alert("Only Authenticated Users are allowed");
            this.props.history.push('/');
        }
    }





    render() {
        const { rows } = this.state;

        return (
            localStorage.length > 0 ?
                <div>
                    <Paper style={{ width: '85%', marginLeft: '100px', marginRight: '100px', marginTop: '50px' }}>
                        <TableContainer style={{ maxHeight: 440, }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                </div> : <div> Data Only Avaliable for registered user. </div>
        );
    }
}

export default VisitedViewer;