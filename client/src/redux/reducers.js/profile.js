const initState = {
    profile : null,
    profileById: null, 
    profiles: [],
    loading: true,
    error: {}
};
export default function(state = initState, action){
    const { type, payload } = action;
    switch(type){
        case 'ADD_COMPANY':
            return {
             ...state,
             profile:payload,
             loading: false
            }
            case 'GET_PROFILE_BY_USER_ID': 
                return {
                    ...state,
                    profileById: payload,
                    loading: false,
                 }
                case 'GET_CURRENT_PROFILE':
                return {
                    ...state,
                    profile: payload,
                    loading: false
                }
                case 'ADD_COMMENT': 
                return {
                    ...state,
                    profileById: {...state.profileById, comments: payload},
                    loading: false
                }  
                case 'UPDATE_LIKES':
                    return {
                        ...state,
                        profileById:{...state.profileById, likes: payload.likes } ,
                        loading: false 
                         }                  
               case 'CLEAR_PROFILE':
                return {
                    ...state,
                    profile: null,
                    loading: false
                  };
            case 'GET_PROFILES':
                return{
                    ...state,
                    profiles: payload,
                    loading: false
                }    
     default:
         return state;
    }
}