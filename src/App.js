import logo from './logo.png';
import {List,Form} from 'semantic-ui-react';
import Pagination from './Pagination'
import './App.css';
import React, {useState} from 'react';

function App() {
  const [repos, setrepos] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [reposPerPage] = useState(10);
  const [userInput, setuserInput] = useState("");
  const [error, seterror] = useState(null);

  const handleSearch = (e)=>
  {
     setuserInput(e.target.value);
  }

  const Paginate = (PageNumber) => setcurrentPage(PageNumber)
  const loadrepos = (repo) =>
  {
   return (
   <List divided relaxed  key={repo.id}>
    <List.Item>
    <List.Icon name='github' size='large' verticalAlign='middle' />
    <List.Content>
    <List.Header as='a'>{repo.name}</List.Header>
    <List.Description as='a'>{repo.description}</List.Description>
    </List.Content>
    </List.Item>
    <List.Item></List.Item>
  </List>)
  } 

   const displayRepos = () => {
    fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(res => res.json())
    .then(data => {
      if(data.message)
      {
        seterror(data.message)
      }
      else
      {
      setrepos(data);
      seterror(null);
      }
    })   
  }

  const indexOfLastRepos = currentPage * reposPerPage;
  const indexOfFirstRepos = indexOfLastRepos - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepos, indexOfLastRepos);
  return ( 
    <div>
    <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src={logo} width="30" height="30" class="d-inline-block align-top" alt=""/>
    Github Repos
  </a>
  </nav> 
  <div className="first"> 
  <Form onSubmit={displayRepos} className="first">
          <Form.Group>
            <Form.Input
              placeholder='Search Github repos'
              name='githubrepo'
              onChange={handleSearch}
            />
            <Form.Button content='Search' />
          </Form.Group>
  </Form>
  </div>
  {error ? (<h1>User {error}</h1>): (
    <div className='container mt-5'>
      
     {currentRepos.map(loadrepos)}  
     <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} Paginate={Paginate} /> 
    </div>
  )}
  </div>
  );
}

export default App;
