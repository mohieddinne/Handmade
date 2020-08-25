import React ,{ useState  , useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './home.css'
import Spinner from '../utils/Spinner'
import ProfilesItem from './profilesItem'
import { getProfiles, getCurrentProfile } from '../redux/actions/profile'
import { getProducts } from '../redux/actions/product'

const Home = ({auth: { isAuthenticated },getCurrentProfile,  getProfiles, getProducts, company: { profile, profiles, loading }}) => {
    useEffect(()=>{
        getProfiles()
        getProducts()
        getCurrentProfile()
    },[]);
    const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");

    useEffect(()=>{
            const fetchData = async ()=> {
                    try{
       const res = await axios.get('/profile/all');
                        setData(res.data);
                        setFilterd(res.data);
                    }catch(err){
                        throw new Error(err);
                    }
                     };
                  fetchData(); 
        },[]);

        useEffect(()=> {
            const results = filtered.filter(res=> res.name.toLowerCase().includes(result)

            ); 
            setData(results)
        } ,[result])
        //console.log(data)

      const onChange =(e)=> {
            setResult(e.target.value);
        }

    
    return  profiles === null || loading ? ( <Spinner/> ):(
        <div className="homepage" >
 
            <br />
            <br />
            <div>
        <input 
            type="text"
            placeholder="search shop .."
            value={result}
            onChange={onChange}
        />
           <div className="well">
            <h4>Brand</h4>
            <div className="list-group">
            <ul>
           <li>Produit_alimentaire</li>
            <li>artisanat</li>
            <li>vetement</li>
        </ul>
            </div>
        </div>
     
    
    </div>
        {
            data
            .map(profile => 
                <div key ={profile._id} >
            <ProfilesItem  profile={profile}/>
            </div>
            )
        }
        </div>
    )
}
const mapStateToProps = state => ({
    products: state.produit,
    auth: state.auth,
    company: state.company
})
export default connect(mapStateToProps, { getCurrentProfile, getProfiles, getProducts })(Home);
