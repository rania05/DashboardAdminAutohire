import React, { Suspense, lazy , useEffect,useState} from 'react';
import { url } from '../BaseUrl'
import './Form.css'

import axios from 'axios';
import { useHistory } from 'react-router';

import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import './dashboard/TableStyle.css';
import {FaEdit, FaTrash} from "react-icons/fa"
const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes(props) {
  let history = useHistory();
    const [posts, setPosts] = useState([])

    const [nom, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [about, setAbout] = useState('');
    const [website, setWebsite] = useState('');
    const [type, setType] = useState('');
    const [founded, setFounded] = useState('');
    const [specialities, setSpecialities] = useState('');
    const [size, setSize] = useState('');


    const addCmp = (e) => {
      e.preventDefault();
      axios.post(`${url}entreprise/newEntreprise`, {
          nom: nom,
          industry: industry,
          about:about,
          website:website,
          size:size,
          type:type,
          founded:founded,
          specialities:specialities

        })
        .then((response) => {
         setAbout("");
         setFounded("");
         setName("");
         setIndustry("");
         setWebsite("");
         setSize("");
         setType("");
         setSpecialities("");
      }, (error) => {
          console.log(error);
      });
}
    useEffect(() => {
        axios.get(`${url}entreprise`).then(res => {
          console.log(res.data.nom)
          setPosts(res.data)
        })
      }

    
    
        , [])
        const  deleteCmp=(id)=>
        {
          if(window.confirm('Are you sure?'))
          {
            console.log(id)
           return axios.delete(`${url}entreprise/delete/`+id.id)

            
           
          }
        }
        function updateCmp(id)
        {
          console.log(id)
          history.push({
            pathname: '/update',
          });
       
    
          
        }
        useEffect(() => {
          axios.get(`${url}entreprise`).then(res => {
            console.log(res.data.nom)
            setPosts(res.data)
          })
        })
    
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.companyAdd} render={() =>  <div className="divForm" >
            
            <form >
                <input value={nom} onChange={e => setName(e.target.value)} placeholder="Name" type="text"/>
                <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="industry" type="text"/>
                <input value={about} onChange={e => setAbout(e.target.value)} placeholder="about" type="text"/>
                <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="website" type="text"/>
                <input value={size} onChange={e => setSize(e.target.value)} placeholder="size" type="text"/>
                <input value={type} onChange={e => setType(e.target.value)} placeholder="type" type="text"/>
                <input value={founded} onChange={e => setFounded(e.target.value)} placeholder="founded" type="text"/>
                <input value={specialities} onChange={e => setSpecialities(e.target.value)} placeholder="specialities" type="text"/>
                <button type="submit" style={{width:'100%',backgroundColor:'black',color:'white',padding:'14px 20px'
  ,
  margin: '8px 0',
  border: 'none',
  cursor: 'pointer'}} onClick={addCmp}>Add Company</button>
            </form>
           
        </div> } />
                <Route exact path={SLUGS.overviewThree} render={() => <div>overviewThree</div>} />
                <Route exact path={SLUGS.company} render={() => <div> 
                    <table>
  <tr>
  <th> Name</th>
  <th>Industry</th>
  <th>Type</th>
  
  <th>Adress</th>
  <th>Specialities</th>
  <th>Website</th>
  <th></th>
  </tr> 
                    {posts.map(
                    ({id, nom, industry, type, adresse,specialities,website }) => {
                      return (

                        <tr>
                        <td>{nom}</td>
                        <td>{industry}</td>
                        <td>{type}</td>
                        <td>{adresse}</td>
                        <td>{specialities}</td>
                        <td><a style={{ color : 'blue' , fontSize:'13px' }} href={`${website}`}>{website}</a></td>
                       <td><button class="btn" onClick={()=>deleteCmp({id})}><FaTrash/></button></td> 
                       <td><button class="btn"   onClick={()=>updateCmp({id})}><FaEdit/></button></td> 
                        </tr>
 
                        
                      );

                    })}</table></div>} />
                <Route exact path={SLUGS.ideasTwo} render={() => <div>ideasTwo</div>} />
                <Route exact path={SLUGS.ideasThree} render={() => <div>ideasThree</div>} />
                <Route exact path={SLUGS.ideas} render={() => <div>ideas</div>} />
                <Route exact path={SLUGS.contacts} render={() => <div>contacts</div>} />
               
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
               
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
