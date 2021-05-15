import React, { Suspense, lazy, useEffect, useState } from 'react';
import { url } from '../BaseUrl';
import './Form.css';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import './dashboard/TableStyle.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCompanyForm from 'components/forms/EditCompanyForm/EditCompanyForm';
const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes(props) {
    let history = useHistory();
   const [posts, setPosts] = useState([]); 
    const [id, setId] = useState('');
    const [state, setState] = useState({});
    const [nom, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [about, setAbout] = useState('');
    const [website, setWebsite] = useState('');
    const [type, setType] = useState('');
    const [founded, setFounded] = useState('');
    const [specialities, setSpecialities] = useState('');
    const [size, setSize] = useState('');
    const [adress, setAdress] = useState('');
    // state id to select
    const [selectId, setSelectId] = useState();
    // Id to select

    const handleSelectId = (id) => {
        setSelectId(id);
    };
    let idF;
    const {
        register,
        handleSubmit,

        formState: { errors }
    } = useForm();

   
   
    const onSubmit = (data) => {
        const hamma = {
            ...data,

            nom: data.name,
            adresse: data.adress,
            industry: data.industry,
            about: data.about,
            website: data.website,
            size: data.size,
            type: data.type,
            founded: data.founded,
            specialities: data.specialities
        };
        axios.post(`${url}entreprise/newEntreprise`, hamma).then(
            (response) => {
                history.push('/company');
            },
            (error) => {
               // console.log(error);
            }
        );
    };

    useEffect(() => {
        axios.get(`${url}entreprise`).then((res) => {
       
            setPosts(res.data);
            setState(res.data);
        });
    }, []);
    const deleteCmp = (id) => {
        if (window.confirm('Are you sure?')) {
           
            return axios.delete(`${url}entreprise/delete/` + id.id);
        }
    };
    function updateCmp(
        id,
        nom,
        about,
        industry,
        website,
        type,
        founded,
        specialities,
        size,
        adress
    ) {
        setId(id);
        setAbout(about);
        setFounded(founded);
        setIndustry(industry);
        setName(nom);
        setSize(size);
        setSpecialities(specialities);
        setType(type);
        setWebsite(website);
        setAdress(adress);
       
        history.push({
            pathname: '/update',
            search: 'industry' +'!'+ id+'=' + nom
        });
    }
    useEffect(() => {
        axios.get(`${url}entreprise`).then((res) => {
        
            setPosts(res.data);
        });
    }, []);
  
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route
                    exact
                    path={SLUGS.companyAdd}
                    render={() => (
                        <div className='form'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <label for='name'>Name</label>
                                <input
                                    placeholder='name'
                                    type='text'
                                    {...register('name', {
                                        validate: (value) => value.length !== 0
                                    })}
                                />
                                {errors.specialities && (
                                    <p className='error'>* Please fill out this field</p>
                                )}
  <label for='adress'>Adress</label>
                                <input
                                    placeholder='adress'
                                    type='text'
                                    {...register('adress', {
                                        validate: (value) => value.length !== 0
                                    })}
                                />
                                {errors.specialities && (
                                    <p className='error'>* Please fill out this field</p>
                                )}
<br></br>  
<label for="img">Company's Logo </label>
<br></br>  <br></br>  
                                <input type="file" id="img" name="img" accept="image/*"></input>
<br></br>  <br></br>                              
                                <label for='type'>Type</label>
                             
                                <select
                                    placeholder='Choose one...'
                                    type='text'
                                    {...register('type', {
                                        validate: (value) => value !== 'Choose one..'
                                    })}
                                >
                                    <option>Choose one..</option>
                                    <option value='Private'>Private </option>
                                    <option value='Public'>Public </option>
                                    <option value='Private  Limited'>Private Limited</option>
                                </select>
                                {errors.type && (
                                    <p className='error'>* Please select an item in the list.</p>
                                )}
                                <label for='indtustry'>Industry</label>
                                <select
                                    placeholder='Choose one...'
                                    type='text'
                                    {...register('industry', {
                                        validate: (value) => value !== 'Choose one..'
                                    })}
                                >
                                    <option>Choose one..</option>
                                    <option value='IT'>IT</option>
                                    <option value='Education '>Education </option>
                                    <option value='Food '>Food </option>
                                    <option value='Health'>Health</option>
                                    <option value='Aerospace  '>Aerospace </option>
                                    <option value='Transport '>Transport </option>
                                    <option value='Telecommunication  '>Telecommunication </option>
                                    <option value='Agriculture '>Agriculture </option>
                                    <option value='Construction  '>Construction </option>
                                    <option value='Pharmaceutical '>Pharmaceutical </option>
                                    <option value='Entertainment  '>Entertainment </option>
                                    <option value='Media'>Media</option>
                                    <option value='Energy  '>Energy </option>
                                    <option value='Manufacturing '>Manufacturing </option>
                                    <option value='Music  '>Music </option>
                                    <option value='Mining  '>Mining </option>
                                    <option value='Electronics  '>Electronics </option>
                                </select>
                                {errors.industry && (
                                    <p className='error'>* Please select an item in the list.</p>
                                )}

                                <label for='about'>About</label>
                                <input
                                    placeholder='about'
                                    type='text'
                                    {...register('about', {
                                        validate: (value) => value.length !== 0
                                    })}
                                />
                                {errors.about && (
                                    <p className='error'>* Please fill out this field</p>
                                )}
                                <label for='website'>website</label>
                                <input
                                    placeholder='https://'
                                    type='text'
                                    {...register('website', {
                                        validate: (value) => value.length !== 0
                                    })}
                                />
                                {errors.website && (
                                    <p className='error'> *Please fill out this field</p>
                                )}

                                <label for='founded'>year of foundation</label>
                                <input
                                    placeholder='2021'
                                    type='text'
                                    {...register('founded', {
                                        validate: (value) => value.length === 4
                                    })}
                                />
                                {errors.founded && <p className='error'>* must be a year</p>}

                                <label for='size'>Size</label>
                                <select
                                    placeholder='Choose one...'
                                    type='text'
                                    {...register('size', {
                                        validate: (value) => value !== 'Choose one..'
                                    })}
                                >
                                    <option>Choose one..</option>
                                    <option value='1- 5 employees'>1- 10 employees</option>
                                    <option value='10-50 employees'>10-50 employees</option>
                                    <option value='50-100 employees'>50-100 employees</option>
                                    <option value='more than 100 employees'>
                                        more than 100 employees
                                    </option>
                                </select>
                                {errors.size && (
                                    <p className='error'>* Please select an item in the list.</p>
                                )}

                                <label for='specialities'>Specialities</label>
                                <input
                                    placeholder='specialities'
                                    type='text'
                                    {...register('specialities', {
                                        validate: (value) => value.length !== 0
                                    })}
                                />
                                {errors.specialities && (
                                    <p className='error'>* Please fill out this field</p>
                                )}

                                <button
                                    type='submit'
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        padding: '14px 20px',
                                        margin: '8px 0',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add Company
                                </button>
                            </form>
                        </div>
                    )}
                />
                <Route
                    exact
                    path={SLUGS.overviewThree}
                    render={() => (
                        <EditCompanyForm
                            defaultValue={state}
                          
                        />
                    )}
                />
                <Route
                    exact
                    path={SLUGS.company}
                    render={() => (
                        <div>
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
                                    ({
                                        id,
                                        nom,
                                        industry,
                                        type,
                                        adresse,
                                        specialities,
                                        website,
                                        size,
                                        about,
                                        founded
                                    }) => {
                                        return (
                                            <tr>
                                                <td>{nom}</td>
                                                <td>{industry}</td>
                                                <td>{type}</td>
                                                <td>{adresse}</td>
                                                <td>{specialities}</td>
                                                <td>
                                                    <a
                                                        style={{ color: 'blue', fontSize: '13px' }}
                                                        href={`${website}`}
                                                    >
                                                        {website}
                                                    </a>
                                                </td>
                                                <td>
                                                    <button
                                                        class='btn'
                                                        onClick={() => deleteCmp({ id })}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        class='btn'
                                                        onClick={() => {
                                                            updateCmp(
                                                                id,
                                                                nom,
                                                                industry,
                                                                type,
                                                                specialities,
                                                                website,
                                                                size,
                                                                about,
                                                                founded
                                                                
                                                            );
                                                            setSelectId(id);
                                                        }}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </table>
                        </div>
                    )}
                />
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
