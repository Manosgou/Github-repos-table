import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends React.Component {



  state = {
    data: [],
    isLoading: true,
    error: null,
    username: 'USERNAME'
  };

  componentDidMount() {

    fetch("https://api.github.com/users/" + this.state.username + "/repos")

      .then(response => response.json())

      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {
    let counter = 1;
    return (
      <>
      <Row id="title-container" className="border-bottom justify-content-center p-2">
      <h1>Github Repos</h1>
      </Row>
      <Table responsive striped bordered hover variant="light">
        <thead >
          <tr>
            <th>#</th>
            <th>RepoName</th>
            <th>Language</th>
            <th>Created at</th>
            <th>Size(Kb)</th>
          </tr>
        </thead>
        <tbody>
          {!this.state.isLoading ?
            this.state.data.map((repo) => {
              let created=repo.created_at;
              let i =created.indexOf('T');

              return <tr key={repo.id}>
                <td>{counter++}</td>
                <td><a href={repo.html_url}>{repo.name}</a></td>
                <td>{repo.language}</td>
                <td>{created.substring(0, i != -1 ? i : created.length)}</td>
                <td>{repo.size}</td>
                
              </tr>

            }) : (<h1>Loading...</h1>)
          }


        </tbody>
      </Table>
      </>

    );
  }
}



export default App;
