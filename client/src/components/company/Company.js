import React,{ useEffect} from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile'
import Spinner from '../../utils/Spinner';
import CompanyItem from './CompanyItem';
const Company = ({ getCurrentProfile, company: { profile, loading} }) => {
    useEffect(()=>{
        getCurrentProfile()
    }, [getCurrentProfile]);
    return !loading && profile !== null ?  (
        <CompanyItem profile={profile}/>
        ):(
       <Spinner/>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    products: state.produit,
    company: state.company
})
export default connect(mapStateToProps, { getCurrentProfile })(Company)
